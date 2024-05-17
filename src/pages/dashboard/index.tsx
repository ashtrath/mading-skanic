import type { GetServerSideProps, NextPage } from "next";
import { getServerAuthSession } from "~/server/auth";

import { useSession } from "next-auth/react";
import AnalyticsCard from "~/components/Card/AnalyticsCard";
import SideBySideLayout from "~/components/Layout/SideBySide";
import MetaTags from "~/components/Meta/MetaTags";
import { api } from "~/utils/api";

const DashboardPage: NextPage = () => {
  const session = useSession();
  const user = session.data?.user;

  const items = [
    { href: "/dashboard", icon: "analytics", label: "Dashboard" },
    { href: "/dashboard/mading", icon: "article", label: "Mading" },
    {
      href: "/dashboard/madings/request",
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

  const { data: madingPublished } = api.mading.getAllMading.useQuery(
    { limit: 9 },
    { refetchOnWindowFocus: false },
  );

  return (
    <>
      <MetaTags title="Dashboard" />
      <SideBySideLayout user={user} items={items}>
        <h1 className="font-mono text-lg font-semibold text-mono-black">
          Dashboard
        </h1>
        <div className="flex items-center gap-8">
          <AnalyticsCard
            icon="article"
            counter={madingPublished?.mading.length}
            description="Mading yang diterbitkan"
          />
          <AnalyticsCard
            icon="visibility"
            counter={15}
            description="Total views mading"
            className="grow justify-center"
          />
          <AnalyticsCard
            icon="thumb_up"
            counter={115}
            description="Total engagement mading"
          />
        </div>
      </SideBySideLayout>
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
