import { generateUploadButton } from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react";

export const UploadButton = generateUploadButton({
  url: "http://localhost:8080/api/v1/uploadthing",
});

export const { useUploadThing, uploadFiles } = generateReactHelpers({
  url: "http://localhost:8080/api/v1/uploadthing",
});
