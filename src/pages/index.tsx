import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { MaterialSymbol } from "react-material-symbols";

import illustrasiPapan from "~/assets/images/illustrasiPapan.webp";
import MadingCard from "~/components/Card/MadingCard";
import Footer from "~/components/Layout/Footer";
import NavBar from "~/components/Layout/NavBar";
import { buttonVariants } from "~/components/ui/Button";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
              href={"/madings/penting"}
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

          <article className="flex flex-wrap justify-between gap-y-8">
            <MadingCard />
            <MadingCard />
            <MadingCard />
          </article>
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
              href={"/madings/terbaru"}
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
          <article className="flex flex-wrap justify-between gap-y-8">
            <MadingCard />
            <MadingCard />
            <MadingCard />
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
