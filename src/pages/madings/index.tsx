import { type NextPage } from "next";

import Footer from "~/components/Layout/Footer";
import NavBar from "~/components/Layout/NavBar";
import ListMading from "~/components/ListMading";
import Heading from "~/components/ListMading/Heading";

const MadingPage: NextPage = () => {
  return (
    <>
      <NavBar />
      <main className="my-16 flex min-h-screen flex-col gap-16 overflow-x-hidden px-20">
        <Heading />
        <ListMading />
      </main>
      <Footer />
    </>
  );
};

export default MadingPage;
