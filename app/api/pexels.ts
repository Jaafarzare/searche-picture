import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, page } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&per_page=10&page=${
        page || 1
      }`,
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY!,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch photos from Pexels.");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: `"Internal Server Error" ${error}` });
  }
}
