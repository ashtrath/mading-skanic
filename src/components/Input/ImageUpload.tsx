import Image from "next/image";
import { MaterialSymbol } from "react-material-symbols";

type ImageUploadProps = {
  title?: string;
  description?: string;
  customTypes?: string;
  recommendedText?: string;
  minHeight?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  image?: string;
  showImage?: boolean;
  isUploading?: boolean;
};

const ImageUpload = ({
  title,
  description,
  customTypes,
  recommendedText,
  minHeight = "12rem",
  handleChange,
  image,
  showImage = false,
  isUploading = false,
}: ImageUploadProps) => {
  return (
    <>
      <input
        type="file"
        onChange={(e) => void handleChange(e)}
        accept={customTypes}
        id="image"
        hidden
      />

      <label htmlFor="image" className="cursor-pointer">
        {title && (
          <h1 className="mb-2 block text-base font-semibold text-mono-black">
            {title}
          </h1>
        )}

        {description && (
          <p className="mb-4 text-sm text-mono-black">{description}</p>
        )}

        <div
          style={{
            minHeight: minHeight,
          }}
          className={`relative flex w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-lg border-2 border-dashed border-mono-black bg-mono-white`}
        >
          {showImage && image && !isUploading ? (
            <Image
              width={1600}
              height={840}
              src={image} // it will convert base64 to url
              alt="preview"
              className={`${
                isUploading ? "loading" : ""
              } h-full w-full rounded-md border-mono-black bg-mono-white object-cover`}
            />
          ) : isUploading ? (
            <div className={`flex items-center justify-center gap-2`}>
              <MaterialSymbol
                icon="progress_activity"
                fill={false}
                weight={200}
                grade={0}
                size={24}
              />

              <span className="text-mono-black">Uploading</span>
            </div>
          ) : (
            <>
              <div className={`flex items-center justify-center gap-2`}>
                <MaterialSymbol
                  icon="cloud_upload"
                  fill={false}
                  weight={200}
                  grade={0}
                  size={24}
                />
                <span className="text-mono-black">Upload Image</span>
              </div>

              <p className="text-center text-mono-black">{recommendedText}</p>
            </>
          )}
        </div>
      </label>
    </>
  );
};

export default ImageUpload;
