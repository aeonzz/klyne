import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ImagePreviewProps {
  file: File[];
  onValueChange: React.Dispatch<React.SetStateAction<File[]>>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export default function ImagePreview({
  file,
  onValueChange,
  fileInputRef,
}: ImagePreviewProps) {
  const [urls, setUrls] = React.useState<string[]>([]);
  const urlsRef = React.useRef<string[]>([]);

  React.useEffect(() => {
    // Cleanup previous URLs before creating new ones
    urlsRef.current.forEach((url) => URL.revokeObjectURL(url));

    // Create new URLs
    const newUrls = file.map((f) => URL.createObjectURL(f));
    setUrls(newUrls);
    urlsRef.current = newUrls;

    // Cleanup on unmount or when files change
    return () => {
      newUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [file]);

  const handleRemove = (indexToRemove: number) => {
    URL.revokeObjectURL(urls[indexToRemove]);
    onValueChange((prev) => {
      const newFiles = prev.filter((_, index) => index !== indexToRemove);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return newFiles;
    });
  };

  if (file.length === 0) {
    return <div className="py-4 text-gray-500">No images selected</div>;
  }

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-1">
        {urls.map((url, index) => (
          <CarouselItem
            key={url}
            className={cn("pl-1", urls.length > 1 ? "basis-1/2" : "basis-full")}
          >
            <div className="p-1">
              <div
                className={cn(
                  "group relative w-full overflow-hidden rounded-lg",
                  urls.length === 1 ? "h-[512px]" : "h-64"
                )}
              >
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 top-2 z-10 size-8 rounded-full [&_svg]:size-4"
                  onClick={() => {
                    handleRemove(index);
                  }}
                >
                  <X />
                </Button>
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {urls.length > 1 && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
}
