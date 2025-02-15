import { generateUploadButton } from "@uploadthing/react";

export const UploadButton = generateUploadButton({
  url: "http://localhost:8080/api/v1/uploadthing",
});
