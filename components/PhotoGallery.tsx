/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import { PhotoGallerySkeleton } from "./PhotoGallerySkeleton";

interface PhotoGalleryProps {
  photos: any[];
  hasSearched: boolean;
  loading: boolean;
}

export default function PhotoGallery({
  photos,
  hasSearched,
  loading,
}: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // اسکرول به انتهای container زمانی که تصاویر تغییر می‌کنند و بارگذاری به پایان رسیده است
  useEffect(() => {
    if (!loading && containerRef.current && photos.length > 0) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [photos, loading]);

  if (!hasSearched) return null;

  return (
    <>
      <div
        ref={containerRef}
        className="overflow-y-auto max-h-[calc(100vh-350px)]"
      >
        {photos.length === 0 && loading ? (
          // زمانی که هنوز هیچ تصویری لود نشده (اولین بار جستجو)
          <PhotoGallerySkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <img
                  onClick={() => setSelectedPhoto(photo)}
                  src={photo.src?.medium || photo.src}
                  alt={photo.photographer || "تصویر"}
                  className="w-full h-48 object-cover rounded-lg shadow-md hover:cursor-pointer dark:shadow-gray-700 hover:shadow-xl dark:hover:shadow-gray-800 transition-shadow duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-70 transition-opacity flex flex-col justify-end p-3 text-white pointer-events-none">
                  <p className="text-sm">{photo.photographer}</p>
                  <a
                    href={photo.src.original}
                    target="_blank"
                    className="text-xs underline pointer-events-auto"
                  >
                    دانلود عکس
                  </a>
                </div>
              </div>
            ))}
            {/* اگر درخواست بارگذاری بیشتر در حال انجام باشد و تصاویر قبلی وجود داشته باشند */}
            {loading && photos.length > 0 && <PhotoGallerySkeleton />}
          </div>
        )}
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 opacity-100"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-0 right-0 m-2 text-white bg-gray-500 hover:bg-gray-600 transition-colors rounded-full p-3 hover:cursor-pointer"
            >
              X
            </button>
            <img
              src={selectedPhoto.src.original}
              alt={selectedPhoto.photographer || "تصویر"}
              className="max-w-full max-h-screen rounded"
            />
          </div>
        </div>
      )}
    </>
  );
}
