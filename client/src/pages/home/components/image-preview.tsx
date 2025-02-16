import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React from "react";

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
  const prevUrlsRef = React.useRef<string[]>([]);

  React.useEffect(() => {
    const newUrls = file.map((f) => URL.createObjectURL(f));

    prevUrlsRef.current = urls;

    setUrls(newUrls);

    return () => {
      prevUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [file]);

  const handleRemove = (indexToRemove: number) => {
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
    <div className="grid place-items-center">
      {urls.map((url, index) => (
        <div key={url} className="group relative">
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-2 top-2 rounded-full [&_svg]:size-5"
            onClick={() => {
              handleRemove(index);
            }}
          >
            <X />
          </Button>
          <img
            src={url}
            alt={`Preview ${index + 1}`}
            className={cn("size-auto w-full rounded-lg object-cover")}
          />
          {/* <div className="mt-2 truncate text-sm text-gray-600">
            {file[index].name}
          </div>
          <div className="text-xs text-gray-400">
            {(file[index].size / 1024 / 1024).toFixed(2)}MB
          </div> */}
        </div>
      ))}
    </div>
  );
}
