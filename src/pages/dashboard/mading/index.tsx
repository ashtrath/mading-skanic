import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import SideBySideLayout from "~/components/Layout/SideBySide";
import MetaTags from "~/components/Meta/MetaTags";
import { buttonVariants } from "~/components/ui/Button";
import { formatTimeAgo } from "~/utils";
import { api } from "~/utils/api";

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

  const isAdmin = session.data?.user.role === "Admin";

  const { data: madingData } = api.mading.getAllMading.useQuery(
    {
      ...(isAdmin && {
        authorId: session.data?.user.id,
      }),
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  return (
    <>
      <MetaTags title="Dashboard" />
      <SideBySideLayout user={user} items={items}>
        <h1 className="font-mono text-lg font-semibold text-mono-black">
          Mading
        </h1>
        <table className="table-fixed border-collapse border border-mono-black">
          <thead>
            <tr>
              <th className="w-12 border border-mono-black bg-mono-black p-2 text-mono-white">
                No.
              </th>
              <th className="border border-mono-black bg-mono-black p-2 text-mono-white">
                Thumbnail
              </th>
              <th className="border border-mono-black bg-mono-black p-2 text-mono-white">
                Nama Mading
              </th>
              <th className="border border-mono-black bg-mono-black p-2 text-mono-white">
                Penulis
              </th>
              <th className="border border-mono-black bg-mono-black p-2 text-mono-white">
                Kategori
              </th>
              <th className="border border-mono-black bg-mono-black p-2 text-mono-white">
                Dibuat Pada
              </th>
            </tr>
          </thead>
          <tbody>
            {madingData?.mading.map((mading, index) => (
              <tr key={index} className="relative">
                <td className="border border-mono-black p-2">{index + 1}</td>
                <td className="border border-mono-black p-2 text-left">
                  <Image
                    src={mading.thumbnail}
                    alt=""
                    width={150}
                    height={150}
                  />
                </td>
                <td className="border border-mono-black p-2 text-left">
                  {mading.title}
                </td>
                <td className="border border-mono-black p-2 text-center">
                  {mading.author.username}
                </td>
                <td className="border border-mono-black p-2 text-center">
                  {mading.category.name}
                </td>
                <td className="border border-mono-black p-2 text-center">
                  {formatTimeAgo(mading.createdAt, { smart: true })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link
          href={"/dashboard/mading/create"}
          className={`self-end ${buttonVariants({ intent: "primary", size: "small" })}`}
        >
          Buat Mading
        </Link>
      </SideBySideLayout>
    </>
  );
};

export default DashboardMadingPage;
