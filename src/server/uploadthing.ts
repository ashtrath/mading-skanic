import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  madingThumbnail: f({
    image: { maxFileSize: "8MB", maxFileCount: 1 },
  }).onUploadComplete(() => {
    console.log("Upload Complete!");
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
