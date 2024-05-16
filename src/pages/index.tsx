import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { MaterialSymbol } from "react-material-symbols";

import illustrasiPapan from "~/assets/images/illustrasiPapan.webp";
import MadingCard from "~/components/Card/MadingCard";
import Footer from "~/components/Layout/Footer";
import NavBar from "~/components/Layout/NavBar";
import MetaTags from "~/components/Meta/MetaTags";
import { buttonVariants } from "~/components/ui/Button";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: getAllMading } = api.mading.getAllMading.useQuery(
    { limit: 3, filter: "newest" },
    { refetchOnWindowFocus: false },
  );

  const normalMadingToShow = getAllMading?.mading;

  const { data: getImportantMading } = api.mading.getAllMading.useQuery(
    { limit: 3, priority: "Important" },
    { refetchOnWindowFocus: false },
  );

  const importantMadingToShow = getImportantMading?.mading;

  return (
    <>
      <MetaTags />
      <NavBar isLandingPage={true} />
      <main className="min-h-screen">
        <section
          id="home"
          className="relative flex min-h-screen items-center overflow-x-hidden px-20"
        >
          <div className="w-2/3">
            <h1 className="mb-4 text-2xl font-bold text-mono-black">
              Selamat datang di Mading Skanic!
            </h1>
            <p className="mb-6 w-3/4 text-balance text-mono-black">
              Selamat datang di platform mading digital sekolah kami, Mading
              Skanic! Di sini Anda akan menemukan informasi dan pengumuman
              terkini seputar kegiatan dan perkembangan di SMKN 1 Ciomas.
            </p>
            <Link
              href={"/madings"}
              className={`${buttonVariants({ intent: "primary" })} no-underline underline-offset-4 hover:underline`}
            >
              Baca Mading
            </Link>
          </div>
          <Image
            src={illustrasiPapan}
            width={617}
            height={420}
            alt="Gambar dekoratif papan majalah dinding."
            className="absolute bottom-0 right-0 z-0"
          />
        </section>
        <section id="madingPenting" className="px-20 pt-16">
          <header className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-3 font-mono text-lg font-bold text-mono-black">
              <MaterialSymbol
                icon="notification_important"
                size={32}
                fill={false}
                weight={400}
                grade={0}
              />
              Mading Penting
            </h2>
            <Link
              href={"/madings"}
              className="group flex items-center gap-2 font-mono text-mono-black"
            >
              <span className="transition-transform duration-150 ease-out-expo group-hover:-translate-x-2 group-hover:underline">
                Lihat Selengkapnya
              </span>
              <MaterialSymbol
                icon="arrow_forward"
                fill={false}
                weight={200}
                grade={0}
                size={24}
              />
            </Link>
          </header>

          {importantMadingToShow && importantMadingToShow.length > 0 ? (
            <article className="grid grid-cols-1 justify-items-center gap-5 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
              {importantMadingToShow?.map((mading) => (
                <MadingCard key={mading.id} {...mading} />
              ))}
            </article>
          ) : (
            <p className="text-center font-mono text-lg font-bold text-mono-black/75">
              Tidak ada Mading Tersedia
            </p>
          )}
        </section>
        <section id="madingTerbaru" className="px-20 py-16">
          <header className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-3 font-mono text-lg font-bold text-mono-black">
              <MaterialSymbol
                icon="notifications_active"
                size={32}
                fill={false}
                weight={400}
                grade={0}
              />
              Mading Terbaru
            </h2>
            <Link
              href={"/madings"}
              className="group flex items-center gap-2 font-mono text-mono-black"
            >
              <span className="transition-transform duration-150 ease-out-expo group-hover:-translate-x-2 group-hover:underline">
                Lihat Selengkapnya
              </span>
              <MaterialSymbol
                icon="arrow_forward"
                fill={false}
                weight={200}
                grade={0}
                size={24}
              />
            </Link>
          </header>
          {normalMadingToShow && normalMadingToShow.length > 0 ? (
            <article className="grid grid-cols-1 justify-items-center gap-5 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
              {normalMadingToShow?.map((mading) => (
                <MadingCard key={mading.id} {...mading} />
              ))}
            </article>
          ) : (
            <p className="text-center font-mono text-lg font-bold text-mono-black/75">
              Tidak ada Mading Tersedia
            </p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
