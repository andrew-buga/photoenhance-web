import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const MAX_SIZE_MB = 12;

// CSRF Secret - use environment variable, generate random if not set (development only)
const CSRF_SECRET = (() => {
  const envSecret = process.env.CSRF_SECRET;
  if (envSecret) return envSecret;
  
  // Fallback for development - generate deterministic key based on server start time
  // This will be different on each server restart, which is acceptable for dev
  if (process.env.NODE_ENV === 'development') {
    return crypto.randomBytes(32).toString('hex');
  }
  
  // Production MUST have CSRF_SECRET set
  throw new Error(
    'CSRF_SECRET environment variable is required in production. ' +
    'Please set it in your Vercel project settings.'
  );
})();

const CSRF_TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

// Rate limiter (in-memory, resets on server restart)
const rateLimiter = new Map<string, { count: number; resetTime: number }>();

const replicateVersion =
  process.env.REPLICATE_MODEL_VERSION ||
  "42fed1c4977e4f3f95fcb35a3f2f0f4f6dcecf3f4ef3f17db6df95bb8f4e8100";

// Generate CSRF token
export function generateCSRFToken(): {
  token: string;
  signature: string;
  timestamp: number;
} {
  const timestamp = Date.now();
  const payload = `${timestamp}`;
  const hmac = crypto.createHmac("sha256", CSRF_SECRET);
  hmac.update(payload);
  const signature = hmac.digest("hex");
  const token = `${timestamp}.${signature}`;

  return { token, signature, timestamp };
}

// Validate CSRF token
function validateCSRFToken(token: string): boolean {
  try {
    const [timestampStr, signature] = token.split(".");
    if (!timestampStr || !signature) return false;

    const timestamp = parseInt(timestampStr, 10);
    if (isNaN(timestamp)) return false;

    // Check if token is not older than 24 hours
    if (Date.now() - timestamp > CSRF_TOKEN_EXPIRY) {
      return false;
    }

    // Verify signature
    const hmac = crypto.createHmac("sha256", CSRF_SECRET);
    hmac.update(timestampStr);
    const expectedSignature = hmac.digest("hex");

    return signature === expectedSignature;
  } catch {
    return false;
  }
}

// Rate limiting
function checkRateLimit(identifier: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const entry = rateLimiter.get(identifier);

  if (!entry || now > entry.resetTime) {
    rateLimiter.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count++;
  return true;
}

// Detect SVG/ZIP bombs by magic bytes
function isSuspiciousFile(buffer: Buffer): boolean {
  // SVG (text-based XML)
  const svgMagic = buffer.toString("utf-8", 0, 5);
  if (svgMagic.includes("<?xml") || svgMagic.includes("<svg")) {
    return true;
  }

  // ZIP magic bytes (PK..)
  if (buffer[0] === 0x50 && buffer[1] === 0x4b) {
    return true;
  }

  // RAR magic bytes (Rar!)
  if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x61 &&
    buffer[2] === 0x72 &&
    buffer[3] === 0x21
  ) {
    return true;
  }

  return false;
}

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
    // Get client IP for rate limiting
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Rate limiting: 5 requests per 60 seconds per IP
    if (!checkRateLimit(clientIp, 5, 60000)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait before trying again." },
        { status: 429 }
      );
    }

    // CSRF validation
    const csrfToken = request.headers.get("x-csrf-token");
    if (!csrfToken || !validateCSRFToken(csrfToken)) {
      return NextResponse.json(
        { error: "CSRF validation failed. Request not allowed." },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const scaleValue = Number(formData.get("scale") || 4);

    // File validation
    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    // MIME type validation (server-side)
    const validMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/bmp",
      "image/gif",
    ];
    if (!validMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only PNG, JPG, WebP, BMP are supported." },
        { status: 400 }
      );
    }

    // File size validation
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return NextResponse.json(
        {
          error: `File size exceeds ${MAX_SIZE_MB}MB limit. Current: ${(file.size / 1024 / 1024).toFixed(1)}MB`,
        },
        { status: 400 }
      );
    }

    // Magic byte validation (detect SVG/ZIP bombs)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (isSuspiciousFile(buffer)) {
      return NextResponse.json(
        { error: "File appears to be corrupted or not a valid image." },
        { status: 400 }
      );
    }

    const scale = [2, 4, 6].includes(scaleValue) ? scaleValue : 4;
    const base64 = buffer.toString("base64");

    if (process.env.NODE_ENV === "development") {
      console.log(
        `[Upscale] Request from ${clientIp}: ${file.name} (${file.size} bytes), scale: x${scale}`
      );
    }

    const replicateUrl = await upscaleWithReplicate(base64, scale, file.type);

    if (replicateUrl) {
      if (process.env.NODE_ENV === "development") {
        console.log("[Upscale] Returning Replicate result");
      }
      return NextResponse.json({ outputUrl: replicateUrl, provider: "replicate" });
    }

    // No Replicate result - let client handle upscaling
    if (process.env.NODE_ENV === "development") {
      console.warn("[Upscale] Replicate failed, delegating to client-side upscaling");
    }
    return NextResponse.json(
      { error: "Replicate upscaling failed" },
      { status: 503 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[Upscale] Exception in POST handler:", error);
    }
    return NextResponse.json(
      { error: "Upscale failed: " + String(error) },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve CSRF token
export async function GET() {
  try {
    const { token } = generateCSRFToken();
    return NextResponse.json({ csrfToken: token }, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[Upscale] Exception in GET handler:", error);
    }
    return NextResponse.json(
      { error: "Failed to generate CSRF token" },
      { status: 500 }
    );
  }
}
