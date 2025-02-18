import * as React from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { type ClientUploadedFileData } from "uploadthing/types";

type UploadCallback = () => void;

export function useUploadFile(
  endpoint: "imageUploader",
  options?: {
    onSuccess?: UploadCallback;
    onError?: UploadCallback;
  }
) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadedFiles, setUploadedFiles] = React.useState<
    ClientUploadedFileData<unknown>[]
  >([]);

  const { startUpload } = useUploadThing(endpoint, {
    onClientUploadComplete: (file) => {
      setUploadedFiles(file);
      options?.onSuccess?.();
    },
    onUploadError: () => {
      options?.onError?.();
    },
    onUploadBegin: ({ file }) => {
      console.log("Upload has begun for", file);
    },
  });

  const handleUpload = async (files: File[]) => {
    if (files.length === 0) return [];
    setIsUploading(true);
    try {
      const result = await startUpload(files);
      return result || [];
    } finally {
      setIsUploading(false);
    }
  };

  return {
    handleUpload,
    isUploading,
    uploadedFiles,
  };
}
