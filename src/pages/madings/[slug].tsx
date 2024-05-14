import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MaterialSymbol } from "react-material-symbols";

import Footer from "~/components/Layout/Footer";
import NavBar from "~/components/Layout/NavBar";
import Button from "~/components/ui/Button";
import ProfileImage from "~/components/ui/ProfileImage";
import { generateSSGHelper } from "~/server/api/ssgHelper";

const ArticlePage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const router = useRouter();
  const { id } = props;

  // TODO: Fetch the mading data from database based on the passed id

  return (
    <>
      <NavBar />
      <main className="mx-20 my-8 min-h-screen overflow-x-hidden">
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
            <button>
              <MaterialSymbol
                icon="comment"
                fill={false}
                weight={200}
                grade={0}
                size={32}
              />
            </button>
            <button>
              <MaterialSymbol
                icon="bookmark"
                fill={false}
                weight={200}
                grade={0}
                size={32}
              />
            </button>
          </div>
        </div>

        <header className="mb-[70px] mt-8 flex items-center justify-between">
          <div className="max-w-[520px]">
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
            <h1 className="font-mono text-xl font-bold text-mono-black">
              Kenali Tanda Bahaya Cyberbullying: Seminar Kesadaran Online Untuk
              Siswa dan Orang Tua.
            </h1>
          </div>
          <p className="max-w-[540px] text-justify text-mono-black">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per
            inceptos himenaeos. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet
            odio mattis. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos.
          </p>
        </header>

        <section className="w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link
                href={`/users/id`}
                className="group flex items-center gap-1"
              >
                <ProfileImage src={null} />
                <span className="font-mono text-sm text-mono-black underline-offset-4 group-hover:underline">
                  @OSISMPK
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
                04 Febuari 2023, 13:02
              </span>
            </div>
            <p className="w-fit rounded-full border border-mono-black bg-mono-white px-4 py-1 font-mono text-xs font-medium uppercase text-mono-black">
              Jurusan
            </p>
          </div>
          <div className="relative mt-4 overflow-hidden">
            <Image
              src={
                "https://utfs.io/f/5fe8feb1-2398-4f88-b2cf-9f61fe660ac9-ewb99d.jpeg"
              }
              alt=""
              width={1200}
              height={620}
              className="max-h-[566px] w-full border border-mono-black object-contain"
            />
          </div>
        </section>

        <section className="mt-8 flex w-full items-center justify-between">
          <aside className="flex w-fit max-w-[430px] flex-col gap-4 border border-mono-black bg-mono-white px-8 py-4">
            <div className="space-y-1">
              <h2 className="line-clamp-2 font-mono text-lg font-semibold text-mono-black">
                Kenali Tanda Bahaya Cyberbullying: Seminar Kesadaran Online
                Untuk Siswa dan Orang Tua
              </h2>
              <Link
                href={`/users/id`}
                className="group flex items-center gap-1"
              >
                <ProfileImage src={null} />
                <span className="font-mono text-sm text-mono-black underline-offset-4 group-hover:underline">
                  @OSISMPK
                </span>
              </Link>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <h3 className="font-mono font-bold text-mono-black">
                  Publikasi:
                </h3>
                <p className="text-mono-black">04 Febuari 2024, 13:02</p>
              </li>
              <li className="flex items-center justify-between">
                <h3 className="font-mono font-bold text-mono-black">
                  Terakhir di Edit:
                </h3>
                <p className="text-mono-black">04 Febuari 2024, 13:02</p>
              </li>
              <li className="flex items-center justify-between">
                <h3 className="font-mono font-bold text-mono-black">
                  Kategori:
                </h3>
                <p className="text-mono-black">Jurusan</p>
              </li>
            </ul>
          </aside>
          <article className="prose"></article>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ArticlePage;

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext<{ id: string }>,
) => {
  const { req, res } = ctx;

  const ssg = await generateSSGHelper({ req, res });
  const madingId = ctx.params?.id!;

  await ssg.mading.getSingleMading.prefetch({
    id: madingId,
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id: madingId,
    },
  };
};
