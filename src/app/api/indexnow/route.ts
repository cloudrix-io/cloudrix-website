import { NextRequest, NextResponse } from "next/server";

const INDEXNOW_KEY = "cloudrix2026indexnow";
const SITE_URL = "https://www.cloudrix.io";

// POST /api/indexnow — notify search engines about new/updated URLs
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { urls } = body as { urls?: string[] };

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: "Missing or empty 'urls' array in request body" },
        { status: 400 }
      );
    }

    // Validate all URLs belong to our domain
    const validUrls = urls.filter((url) => url.startsWith(SITE_URL));
    if (validUrls.length === 0) {
      return NextResponse.json(
        { error: "No valid URLs provided. All URLs must start with " + SITE_URL },
        { status: 400 }
      );
    }

    // Submit to IndexNow (Bing endpoint, which shares with Yandex and others)
    const indexNowPayload = {
      host: "www.cloudrix.io",
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: validUrls,
    };

    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(indexNowPayload),
    });

    return NextResponse.json({
      success: true,
      submitted: validUrls.length,
      status: response.status,
      message: response.status === 200
        ? "URLs submitted successfully"
        : `IndexNow responded with status ${response.status}`,
    });
  } catch (error) {
    console.error("IndexNow submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit URLs to IndexNow" },
      { status: 500 }
    );
  }
}

// GET /api/indexnow — health check
export async function GET() {
  return NextResponse.json({
    service: "IndexNow",
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    status: "active",
  });
}
