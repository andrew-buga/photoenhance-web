import { NextRequest, NextResponse } from "next/server";

const MAX_SIZE_MB = 12;

const replicateVersion =
  process.env.REPLICATE_MODEL_VERSION ||
  "42fed1c4977e4f3f95fcb35a3f2f0f4f6dcecf3f4ef3f17db6df95bb8f4e8100";

async function upscaleWithReplicate(
  imageBase64: string,
  scale: number,
  mimeType: string
): Promise<string | null> {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    if (process.env.NODE_ENV === 'development') {
      console.error("[Upscale] No REPLICATE_API_TOKEN found in environment");
    }
    return null;
  }

  const input = {
    image: `data:${mimeType};base64,${imageBase64}`,
    scale,
    face_enhance: false,
  };

  try {
    if (process.env.NODE_ENV === 'development') {
      console.log("[Upscale] Starting Replicate API call...");
    }
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ version: replicateVersion, input }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (process.env.NODE_ENV === 'development') {
        console.error(`[Upscale] API returned ${response.status}:`, errorText);
      }
      return null;
    }

    const prediction = (await response.json()) as {
      id: string;
      status: string;
      output?: string | string[];
      urls?: { get?: string };
    };

    if (process.env.NODE_ENV === 'development') {
      console.log("[Upscale] Prediction created:", prediction.id);
    }

    const statusUrl = prediction.urls?.get;
    if (!statusUrl) {
      if (process.env.NODE_ENV === 'development') {
        console.error("[Upscale] No status URL in response");
      }
      return null;
    }

    for (let i = 0; i < 30; i += 1) {
      const statusResponse = await fetch(statusUrl, {
        headers: {
          Authorization: `Token ${token}`,
        },
        cache: "no-store",
      });

      if (!statusResponse.ok) {
        if (process.env.NODE_ENV === 'development') {
          console.error(`[Upscale] Status check failed: ${statusResponse.status}`);
        }
        break;
      }

      const statusData = (await statusResponse.json()) as {
        status: string;
        output?: string | string[];
      };

      if (process.env.NODE_ENV === 'development') {
        console.log(`[Upscale] Status check ${i + 1}/30: ${statusData.status}`);
      }

      if (statusData.status === "succeeded") {
        if (process.env.NODE_ENV === 'development') {
          console.log("[Upscale] Success! Returning output...");
        }
        if (typeof statusData.output === "string") return statusData.output;
        if (Array.isArray(statusData.output) && statusData.output[0]) {
          return statusData.output[0];
        }
        break;
      }

      if (statusData.status === "failed" || statusData.status === "canceled") {
        if (process.env.NODE_ENV === 'development') {
          console.error("[Upscale] Processing failed:", statusData.status);
        }
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 700));
    }

    if (process.env.NODE_ENV === 'development') {
      console.warn("[Upscale] Timeout: Did not get result after 30 checks");
    }
    return null;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error("[Upscale] Exception:", error);
    }
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const scaleValue = Number(formData.get("scale") || 4);

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are supported" }, { status: 400 });
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return NextResponse.json(
        { error: `File size exceeds ${MAX_SIZE_MB}MB limit` },
        { status: 400 }
      );
    }

    const scale = [2, 4, 6].includes(scaleValue) ? scaleValue : 4;

    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Upscale] Received file: ${file.name} (${file.size} bytes), scale: x${scale}`);
    }

    const replicateUrl = await upscaleWithReplicate(base64, scale, file.type);

    if (replicateUrl) {
      if (process.env.NODE_ENV === 'development') {
        console.log("[Upscale] Returning Replicate result");
      }
      return NextResponse.json({ outputUrl: replicateUrl, provider: "replicate" });
    }

    // No Replicate result - let client handle upscaling
    if (process.env.NODE_ENV === 'development') {
      console.warn("[Upscale] Replicate failed, delegating to client-side upscaling");
    }
    return NextResponse.json({ error: "Replicate upscaling failed" }, { status: 503 });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error("[Upscale] Exception in POST handler:", error);
    }
    return NextResponse.json({ error: "Upscale failed: " + String(error) }, { status: 500 });
  }
}
