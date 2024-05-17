import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { MaterialSymbol } from "react-material-symbols";
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

  const { data: categoryData, refetch } =
    api.category.getAllCategory.useQuery();

  const deleteCategory = api.category.deleteCategory.useMutation({
    onSuccess: () => refetch(),
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory.mutateAsync({ id });
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  return (
    <>
      <MetaTags title="Dashboard" />
      <SideBySideLayout user={user} items={items}>
        <h1 className="font-mono text-lg font-semibold text-mono-black">
          Kategori
        </h1>
        <table className="table-fixed border-collapse border border-mono-black">
          <thead>
            <tr>
              <th className="w-12 border border-mono-black bg-mono-black p-2 text-mono-white">
                No.
              </th>
              <th className="border border-mono-black bg-mono-black p-2 text-mono-white">
                Nama Kategori
              </th>
              <th className="border border-mono-black bg-mono-black p-2 text-mono-white">
                Dibuat Pada
              </th>
            </tr>
          </thead>
          <tbody>
            {categoryData?.map(({ id, name, createdAt }, index) => (
              <tr key={index} className="relative">
                <td className="border border-mono-black p-2">{index + 1}</td>
                <td className="border border-mono-black p-2 text-center">{name}</td>
                <td className="border border-mono-black p-2 text-center">
                  {formatTimeAgo(createdAt, { smart: true })}
                </td>
                <button
                  onClick={() => handleDelete(id)}
                  className="absolute right-2 top-1/2 grid w-fit -translate-y-1/2 rounded bg-mono-danger p-1.5 text-mono-white"
                >
                  <MaterialSymbol
                    icon="delete"
                    fill={false}
                    weight={200}
                    grade={0}
                    size={18}
                  />
                </button>
              </tr>
            ))}
          </tbody>
        </table>
        <Link
          href={"/dashboard/categories/add"}
          className={`self-end ${buttonVariants({ intent: "primary", size: "small" })}`}
        >
          Tambah Data
        </Link>
      </SideBySideLayout>
    </>
  );
};

export default DashboardMadingPage;
