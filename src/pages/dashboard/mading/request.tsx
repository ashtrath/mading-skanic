import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import SideBySideLayout from "~/components/Layout/SideBySide";
import MetaTags from "~/components/Meta/MetaTags";

const DashboardMadingPage: NextPage = () => {
  const session = useSession();
  const user = session.data?.user;

  const items = [
    { href: "/dashboard", icon: "analytics", label: "Dashboard" },
    { href: "/dashboard/mading", icon: "article", label: "Mading" },
    {
      href: "/dashboard/mading/request",
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
      <SideBySideLayout user={user} items={items}>
        <h1 className="font-mono text-lg font-semibold text-mono-black">
          Permintaan
        </h1>
      </SideBySideLayout>
      )
    </>
  );
};

export default DashboardMadingPage;
