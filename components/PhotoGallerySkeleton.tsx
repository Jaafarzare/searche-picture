import { Skeleton } from "@/components/ui/skeleton";

export function PhotoGallerySkeleton() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {Array.from({ length: 1 }).map((_, i) => (
          <div key={i} className="w-full">
            <Skeleton
              className="block !w-full h-48 rounded-lg"
              style={{ width: "100%" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
