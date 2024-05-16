import type { GetServerSideProps, NextPage } from "next";
import { getServerAuthSession } from "~/server/auth";

import { useSession } from "next-auth/react";
import CreateMadingForm from "~/components/Form/CreateMadingForm";
import Footer from "~/components/Layout/Footer";
import SideBySideLayout from "~/components/Layout/SideBySide";
import MetaTags from "~/components/Meta/MetaTags";

const DashboardPage: NextPage = () => {
  const session = useSession();
  const userRole = session.data?.user;

  const items = [
    { href: "/dashboard", icon: "analytics", label: "Dashboard" },
    { href: "/dashboard/mading", icon: "article", label: "Mading" },
    {
      href: "/dashboard/madings-request",
      icon: "all_inbox",
      label: "Permintaan",
      roles: ["Admin"],
    },
    {
      href: "/dashboard/categories",
      icon: "label",
      label: "Kategori",
      roles: ["Admin"],
    },
    {
      href: "/dashboard/accounts",
      icon: "account_circle",
      label: "Pengguna",
      roles: ["Admin"],
    },
  ];

  return (
    <>
      <MetaTags title="Dashboard" />
      <SideBySideLayout user={userRole} items={items}>
        <h1 className="font-mono text-lg font-semibold text-mono-black">
          Dashboard
        </h1>
      </SideBySideLayout>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession({
    req: ctx.req,
    res: ctx.res,
  });

  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const userRole = session.user.role;
  if (!["Penulis", "Admin"].includes(userRole)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default DashboardPage;
