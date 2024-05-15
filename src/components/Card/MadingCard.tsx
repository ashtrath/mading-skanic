import { type $Enums } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { MaterialSymbol } from "react-material-symbols";
import { formatTimeAgo, truncateText } from "~/utils";
import ProfileImage from "../ui/ProfileImage";

type MadingCardProps = {
  mading: {
    id: string;
    title: string;
    slug: string;
    description: string;
    thumbnail: string | null;
    priority: $Enums.Priorities;
    createdAt: Date;
    category: {
      id: string;
      name: string;
      createdAt: Date;
    };
    author: {
      id: string;
      namaSiswa: string;
      username: string;
      email: string;
      password: string;
      nisn: string;
      profileImage: string | null;
      role: $Enums.Roles;
      emailVerifiedAt: Date | null;
      createdAt: Date;
    };
  };
};

const MadingCard = ({ mading }: MadingCardProps) => {
  return (
    <article className="w-fit max-w-[343px] border border-mono-black shadow-mono">
      <Link
        href={{
          pathname: `/madings/${mading.id}`,
        }}
        as={`/madings/${mading.slug}`}
        className="relative overflow-hidden block"
      >
        {mading.priority === "Important" && (
          <div className="absolute left-2 top-2 z-10 flex w-fit items-center gap-1 rounded-full bg-mono-black px-4 py-1 text-mono-white">
            <MaterialSymbol
              icon="notifications_active"
              fill={false}
              weight={200}
              grade={0}
              size={18}
            />
            <span className="text-xs uppercase">Penting</span>
          </div>
        )}
        <Image
          loading="lazy"
          src={mading.thumbnail!}
          width={343}
          height={343}
          alt={`${mading?.title}'s Image`}
          className="h-[220px] w-full border-b border-b-mono-black object-contain"
        />
      </Link>
      <section className="p-4">
        <header className="mb-2 flex items-center justify-between">
          <Link
            href={`/u/${mading.author.username}`}
            className="group flex items-center gap-1"
          >
            <ProfileImage src={null} />
            <span className="font-mono text-sm font-medium text-mono-black underline-offset-4 group-hover:underline">
              @{mading.author.username}
            </span>
          </Link>
          <p className="w-fit rounded-full border border-mono-black bg-mono-white px-4 py-1 font-mono text-xs font-medium uppercase text-mono-black">
            {mading.category.name}
          </p>
        </header>
        <section className="flex flex-col gap-1 text-mono-black">
          <Link
            href={{
              pathname: `/madings/${mading.id}`,
            }}
            as={`/madings/${mading.slug}`}
          >
            <h3 className="line-clamp-2 font-mono text-lg font-bold hover:underline">
              {mading.title}
            </h3>
          </Link>
          <p className="line-clamp-3">
            {truncateText(mading.description, 115)}
          </p>
        </section>
        <footer className="mt-4 flex items-center justify-between text-sm text-mono-black">
          <span className="flex items-center gap-1">
            <MaterialSymbol
              icon="schedule"
              fill={false}
              weight={200}
              grade={0}
              size={24}
            />
            {formatTimeAgo(mading.createdAt)}
          </span>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              0
              <MaterialSymbol
                icon="bookmark"
                fill={false}
                weight={200}
                grade={0}
                size={24}
              />
            </span>
            <span className="flex items-center gap-1">
              0
              <MaterialSymbol
                icon="comment"
                fill={false}
                weight={200}
                grade={0}
                size={24}
              />
            </span>
          </div>
        </footer>
      </section>
    </article>
  );
};

export default MadingCard;
