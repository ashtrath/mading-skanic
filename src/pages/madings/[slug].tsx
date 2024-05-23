import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MaterialSymbol } from "react-material-symbols";
import { generateSSGHelper } from "~/server/api/ssgHelper";
import { formatTimeAgo } from "~/utils";
import { api } from "~/utils/api";

import { useSession } from "next-auth/react";
import Footer from "~/components/Layout/Footer";
import NavBar from "~/components/Layout/NavBar";
import BookmarkButton from "~/components/ListMading/BookmarkButton";
import CommentButton from "~/components/ListMading/CommentButton";
import MetaTags from "~/components/Meta/MetaTags";
import Button from "~/components/ui/Button";
import ProfileImage from "~/components/ui/ProfileImage";

const ArticlePage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const session = useSession();
  const router = useRouter();
  const { slug } = props;

  const { data: mading } = api.mading.getMadingBySlug.useQuery(
    { slug },
    {
      refetchOnWindowFocus: false,
    },
  );

  return (
    <>
      <MetaTags title={mading?.title} description={mading?.description} />
      <NavBar />
      <main className="mx-20 my-8 min-h-screen">
        <div className="flex items-center justify-between">
          <Button
            intent="secondary"
            size="small"
            onClick={router.back}
            className="group flex items-center gap-2 hover:no-underline"
          >
            <MaterialSymbol
              icon="arrow_left_alt"
              fill={false}
              weight={200}
              grade={0}
              size={24}
            />
            <span className="group-hover:underline">Kembali</span>
          </Button>
          <div className="flex items-center gap-4 text-mono-black">
            <CommentButton />
            {session.status === "authenticated" && (
              <BookmarkButton
                madingId={mading?.id}
                bookmarkedByMe={mading?.bookmarkedByMe}
              />
            )}
          </div>
        </div>

        <header className="mb-[70px] mt-8 flex items-center justify-between">
          <div className="max-w-[520px]">
            {mading?.priority === "Important" && (
              <div className="mb-2 flex w-fit items-center gap-1 rounded-full bg-mono-black px-4 py-1 text-mono-white">
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
            <h1 className="font-mono text-xl font-bold text-mono-black">
              {mading?.title}
            </h1>
          </div>
          <p className="max-w-[540px] text-justify text-mono-black">
            {mading?.description}
          </p>
        </header>

        <section className="w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link
                href={`/u/${mading?.author?.username}`}
                className="group flex items-center gap-1"
              >
                <ProfileImage src={mading?.author?.profileImage} />
                <span className="font-mono text-sm text-mono-black underline-offset-4 group-hover:underline">
                  @{mading?.author?.username}
                </span>
              </Link>
              <span className="flex items-center gap-1 font-mono text-sm text-mono-black">
                <MaterialSymbol
                  icon="calendar_today"
                  fill={false}
                  weight={200}
                  grade={0}
                  size={24}
                />
                {formatTimeAgo(mading?.createdAt, { smart: true })}
              </span>
            </div>
            <p className="w-fit rounded-full border border-mono-black bg-mono-white px-4 py-1 font-mono text-xs font-medium uppercase text-mono-black">
              {mading?.category?.name}
            </p>
          </div>
          <div className="relative mt-4 overflow-hidden">
            <Image
              src={mading?.thumbnail}
              alt={`${mading?.title}'s Image`}
              width={1200}
              height={620}
              className="max-h-[566px] w-full border border-mono-black object-contain"
            />
          </div>
        </section>

        {mading?.article && (
          <section className="relative mt-8 flex h-fit w-full items-center justify-between">
            <aside className="sticky top-28 flex w-fit max-w-[430px] flex-col gap-4 self-start border border-mono-black bg-mono-white px-8 py-4">
              <div className="space-y-1">
                <h2 className="line-clamp-2 font-mono text-lg font-semibold text-mono-black">
                  {mading.title}
                </h2>
                <Link
                  href={`/users/${mading.authorId}`}
                  className="group flex items-center gap-1"
                >
                  <ProfileImage src={mading.author?.profileImage} />
                  <span className="font-mono text-sm text-mono-black underline-offset-4 group-hover:underline">
                    @{mading.author?.username}
                  </span>
                </Link>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <h3 className="font-mono font-bold text-mono-black">
                    Publikasi:
                  </h3>
                  <p className="text-mono-black">
                    {formatTimeAgo(mading.createdAt, { smart: true })}
                  </p>
                </li>
                {mading.updatedAt && (
                  <li className="flex items-center justify-between">
                    <h3 className="font-mono font-bold text-mono-black">
                      Terakhir di Edit:
                    </h3>
                    <p className="text-mono-black">
                      {formatTimeAgo(mading.updatedAt, { smart: true })}
                    </p>
                  </li>
                )}
                <li className="flex items-center justify-between">
                  <h3 className="font-mono font-bold text-mono-black">
                    Kategori:
                  </h3>
                  <p className="text-mono-black">{mading.category?.name}</p>
                </li>
              </ul>
            </aside>
            <article
              className="prose"
              dangerouslySetInnerHTML={{ __html: mading.article }}
            ></article>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ArticlePage;

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext<{ slug: string }>,
) => {
  const { req, res } = ctx;

  const ssg = await generateSSGHelper({ req, res });
  // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
  const slug = ctx.params?.slug as string;

  await ssg.mading.getMadingBySlug.prefetch({
    slug,
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
    },
  };
};
