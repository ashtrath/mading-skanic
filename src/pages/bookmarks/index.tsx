import { type NextPage } from "next";

import Footer from "~/components/Layout/Footer";
import NavBar from "~/components/Layout/NavBar";
import ListMading from "~/components/ListMading";
import Heading from "~/components/ListMading/Heading";
import MetaTags from "~/components/Meta/MetaTags";

const BookmarksPage: NextPage = () => {
  return (
    <>
      <MetaTags title="Bookmarks" />
      <NavBar />
      <main className="my-16 flex min-h-screen flex-col gap-16 overflow-x-hidden px-20">
        <Heading title="Bookmark" />
        <ListMading onlyBookmarked={true} />
      </main>
      <Footer />
    </>
  );
};

export default BookmarksPage;
