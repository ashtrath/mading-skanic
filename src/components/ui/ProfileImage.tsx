import Image from "next/image";
import { MaterialSymbol } from "react-material-symbols";

type ProfileImageProps = {
  src?: string | null;
  className?: string;
};

const ProfileImage = ({ src, className = "" }: ProfileImageProps) => {
  return (
    <div
      className={`relative size-6 overflow-hidden rounded-full text-mono-black ${className}`}
    >
      {src == null ? (
        <MaterialSymbol
          icon={"account_circle"}
          fill={false}
          weight={200}
          grade={0}
          size={24}
        />
      ) : (
        <Image src={src} alt="Profile Image" quality={100} fill />
      )}
    </div>
  );
};

export default ProfileImage;
