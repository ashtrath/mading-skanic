import { type ReactNode } from "react";
import { type SymbolCodepoints } from "react-material-symbols";

import { type User } from "next-auth";
import MetaTags from "../Meta/MetaTags";
import NavBar from "./NavBar";
import Sidebar, { type SidebarItem, type SidebarProps } from "./Sidebar";

type LayoutProps = Omit<SidebarProps, "items"> & {
  children: ReactNode;
  user?: {
    username: string;
    namaSiswa: string;
  };
};

const ProfileLayout = ({ children, currentUser, user }: LayoutProps) => {
  const sidebarItems: SidebarItem[] = [
    {
      label: "Profile",
      href: `/u/${user?.username}`,
      icon: "account_circle" as SymbolCodepoints,
    },
    {
      label: "Madings",
      href: `/u/${user?.username}/madings`,
      icon: "article" as SymbolCodepoints,
      condition: (user: User) => user.role === "Penulis",
    },
    {
      label: "Settings",
      href: `/u/${user?.username}/settings`,
      icon: "settings" as SymbolCodepoints,
      condition: (user: User) => currentUser.id === user.id,
    },
  ];

  return (
    <>
      <MetaTags title={`${user?.namaSiswa} (@${user?.username})`} />
      <NavBar />
      <main className="my-16 flex min-h-screen gap-8 px-20">
        <Sidebar currentUser={currentUser} items={sidebarItems} />
        {children}
      </main>
    </>
  );
};

export default ProfileLayout;
