import Image from "next/image";
import { MaterialSymbol } from "react-material-symbols";

type ProfileImageProps = {
  src?: string | null;
  className?: string;
  size?: string;
  placeholderSize?: number;
};

const ProfileImage = ({
  src,
  className = "",
  size = "size-6",
  placeholderSize = 24,
}: ProfileImageProps) => {
  return (
    <div
      className={`relative overflow-hidden rounded-full text-mono-black ${size} ${className}`}
    >
      {src == null ? (
        <MaterialSymbol
          icon={"account_circle"}
          fill={false}
          weight={200}
          grade={0}
          size={placeholderSize}
        />
      ) : (
        <Image src={src} alt="Profile Image" quality={100} fill />
      )}
    </div>
  );
};

export default ProfileImage;
