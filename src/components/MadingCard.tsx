import Image from "next/image";
import Link from "next/link";
import { MaterialSymbol } from "react-material-symbols";
import image from "~/assets/images/asd.jpg";
import ProfileImage from "./ProfileImage";
import { truncateText } from "~/utils";

const MadingCard = () => {
  return (
    <article className="w-fit max-w-[343px] border border-mono-black shadow-[0_4px_8px_0_rgb(0,0,0,0.25)]">
      <Link href={"/"} className="relative w-fit overflow-hidden">
        <Image
          loading="lazy"
          src={image}
          width={343}
          height={343}
          alt="Mading Title's Image"
          className="max-h-[200px] w-fit border-b border-b-mono-black object-contain"
        />
      </Link>
      <section className="p-4">
        <header className="mb-2 flex items-center justify-between">
          <Link href={"/user/id"} className="group flex items-center gap-1">
            <ProfileImage src={null} />
            <span className="font-mono text-sm font-medium text-mono-black underline-offset-4 group-hover:underline">
              @ashtrath
            </span>
          </Link>
          <p className="rounded-full border border-mono-black bg-mono-white px-4 py-1 font-mono text-xs font-medium uppercase text-mono-black">
            Jurusan
          </p>
        </header>
        <section className="flex flex-col gap-1 text-mono-black">
          <Link href={"/"}>
            <h3 className="font-mono text-lg font-bold hover:underline">
              Judul Mading
            </h3>
          </Link>
          <p className="line-clamp-3">
            {truncateText(
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius fugiat aliquam reiciendis voluptate, ex libero, cupiditate qui labore repellendus itaque harum laudantium nisi cum molestias ratione inventore reprehenderit eos natus!",
              115,
            )}
          </p>
        </section>
        <footer className="mt-4 flex items-center justify-between text-sm text-mono-black">
          <div className="flex items-center gap-1">
            <MaterialSymbol
              icon="schedule"
              fill={false}
              weight={200}
              grade={0}
              size={24}
            />
            18h ago
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              91
              <MaterialSymbol
                icon="bookmark"
                fill={false}
                weight={200}
                grade={0}
                size={24}
              />
            </div>
            <div className="flex items-center gap-1">
              87
              <MaterialSymbol
                icon="comment"
                fill={false}
                weight={200}
                grade={0}
                size={24}
              />
            </div>
          </div>
        </footer>
      </section>
    </article>
  );
};

export default MadingCard;
