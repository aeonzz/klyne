import { Image } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

interface FileUploaderProps {
  value?: File[];
  // handleUpload?: (files: File[]) => Promise<void>;
  disabled?: boolean;
  onValueChange?: React.Dispatch<React.SetStateAction<File[]>>;
  isUploading?: boolean;
  maxFiles?: number;
  fileInputRef: React.RefObject<HTMLInputElement | null> ;
}

export default function FileUploader({
  value,
  // handleUpload,
  disabled = false,
  onValueChange,
  isUploading = false,
  maxFiles = 1,
  fileInputRef,
}: FileUploaderProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);

      onValueChange?.((prev) => {
        const combinedFiles = [...prev, ...newFiles];
        return combinedFiles.slice(0, maxFiles);
      });
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Button
      className="rounded-full hover:bg-primary/20 [&_svg]:size-5"
      variant="ghost"
      size="icon"
      onClick={handleClick}
      disabled={disabled || isUploading || value?.length === maxFiles}
    >
      <input
        ref={fileInputRef}
        id="file-input"
        type="file"
        className="hidden"
        multiple
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/jpg"
        disabled={disabled || isUploading || value?.length === maxFiles}
      />
      <Image className="size-5 text-primary" />
    </Button>
  );
}

{
  /* {value.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium text-sm">Selected files:</h3>
          <ul className="divide-y divide-gray-200">
            {value.map((file, index) => (
              <li
                key={index}
                className="py-2 flex items-center justify-between text-sm"
              >
                <span className="truncate">{file.name}</span>
                <span className="text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)}MB
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {value.length > 0 && (
        <button
          onClick={() => handleUpload(value)}
          disabled={disabled}
          className={`w-full py-2 px-4 bg-green-600 text-white rounded-md transition-colors ${
            disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
          }`}
        >
          {isUploading ? "Uploading..." : "Upload Files"}
        </button>
      )} */
}
