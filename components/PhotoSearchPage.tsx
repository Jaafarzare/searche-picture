"use client";

import { useState } from "react";
import ButtonCustom from "@/components/ButtonCustom";
import PhotoGallery from "@/components/PhotoGallery";
import Search from "@/components/Search";

/**
 * PhotoSearchPage Component
 * Main container for the photo search functionality.
 * It handles state management for photos, pagination, loading status, and search queries.
 */
export default function PhotoSearchPage() {
  // Array of fetched photos
  const [photos, setPhotos] = useState<any[]>([]);
  // Flag indicating whether a search has been executed
  const [hasSearched, setHasSearched] = useState(false);
  // Current page number for pagination
  const [page, setPage] = useState(1);
  // Loading state for API requests
  const [loading, setLoading] = useState(false);
  // Indicates if more photos are available to load
  const [hasMore, setHasMore] = useState(true);
  // Current search query value
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * fetchPhotos - Fetches photos from the Pexels API.
   * @param query - The search term.
   * @param reset - If true, resets the current photos array and pagination.
   */
  const fetchPhotos = async (query: string, reset = false) => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const currentPage = reset ? 1 : page;
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${query}&per_page=10&page=${currentPage}`,
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY!,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Error fetching photos.");
      }

      const data = await res.json();
      // Mark that a search has been performed
      setHasSearched(true);

      // Update the photos state: reset or append new photos
      if (reset) {
        setPhotos(data.photos);
      } else {
        setPhotos((prev) => [...prev, ...data.photos]);
      }

      // If the number of returned photos is less than the expected per_page, then no more photos are available
      setHasMore(data.photos.length === 10);
      // Increment page for next fetch
      setPage(currentPage + 1);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * handleSearch - Initiates a new search.
   * Sets the search query and resets pagination.
   * @param query - The search term.
   */
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
    fetchPhotos(query, true);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Search component for input and search button */}
      <Search onSearch={handleSearch} />

      {/* PhotoGallery displays the photos fetched from API */}
      <PhotoGallery
        photos={photos}
        hasSearched={hasSearched}
        loading={loading}
      />

      {/* "Load More" button is shown if a search has been performed,
          there are photos available, and more photos can be loaded */}
      {hasSearched && photos.length > 0 && hasMore && (
        <div className="flex justify-center mt-4">
          <ButtonCustom
            variant="secondary"
            onClick={() => fetchPhotos(searchQuery)}
            disabled={loading}
            className="hover:cursor-pointer hover:bg-gray-200 transition-colors hover:text-black"
          >
            {loading ? "Loading..." : "موارد بیشتر"}
          </ButtonCustom>
        </div>
      )}
    </div>
  );
}
