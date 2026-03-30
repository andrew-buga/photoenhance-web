/**
 * Client-side CSRF token management
 * Handles token generation, caching, and validation
 */

const CSRF_TOKEN_KEY = "csrf_token";
const CSRF_TOKEN_TIMESTAMP_KEY = "csrf_token_timestamp";
const CSRF_TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Generate a random token string for initial CSRF setup
 * (Server will generate the actual validated token)
 */
function generateLocalToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Get or fetch CSRF token from server
 * Caches token in localStorage for 24 hours
 */
export async function getCSRFToken(): Promise<string> {
  try {
    // Check if we have a cached token
    const cachedToken = localStorage.getItem(CSRF_TOKEN_KEY);
    const cachedTimestamp = localStorage.getItem(CSRF_TOKEN_TIMESTAMP_KEY);

    const now = Date.now();
    const isExpired = !cachedTimestamp || now - parseInt(cachedTimestamp, 10) > CSRF_TOKEN_EXPIRY_MS;

    if (cachedToken && !isExpired) {
      if (process.env.NODE_ENV === "development") {
        console.log("[CSRF] Using cached token");
      }
      return cachedToken;
    }

    // Fetch new token from server
    if (process.env.NODE_ENV === "development") {
      console.log("[CSRF] Fetching new token from server");
    }

    const response = await fetch("/api/upscale", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get CSRF token: ${response.statusText}`);
    }

    const data = (await response.json()) as { csrfToken: string };
    const { csrfToken } = data;

    // Cache the token
    localStorage.setItem(CSRF_TOKEN_KEY, csrfToken);
    localStorage.setItem(CSRF_TOKEN_TIMESTAMP_KEY, now.toString());

    if (process.env.NODE_ENV === "development") {
      console.log("[CSRF] New token cached");
    }

    return csrfToken;
  } catch (error) {
    console.error("[CSRF] Error getting CSRF token:", error);
    // Fallback: generate a local token (server will reject if invalid, but this prevents complete failure)
    return generateLocalToken();
  }
}

/**
 * Clear cached CSRF token (useful after logout or security event)
 */
export function clearCSRFToken(): void {
  localStorage.removeItem(CSRF_TOKEN_KEY);
  localStorage.removeItem(CSRF_TOKEN_TIMESTAMP_KEY);
}
