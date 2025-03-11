import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const page = searchParams.get("page") || "1";

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  const API_URL = `https://api.pexels.com/v1/search?query=${query}&per_page=10&page=${page}`;
  const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

  if (!API_KEY) {
    console.error("❌ PEXELS API KEY is missing!");
    return NextResponse.json(
      { error: "PEXELS API KEY is missing" },
      { status: 500 }
    );
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // ⏳ 5 ثانیه تایم‌اوت

    const response = await fetch(API_URL, {
      headers: { Authorization: API_KEY },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Failed to fetch photos: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Error fetching from Pexels:", error);
    return NextResponse.json(
      { error: `"Internal Server Error" ${error}` },
      { status: 500 }
    );
  }
}
