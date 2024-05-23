import { type ReactNode } from "react";
import { type SymbolCodepoints } from "react-material-symbols";

import { type $Enums } from "@prisma/client";
import MetaTags from "../Meta/MetaTags";
import NavBar from "./NavBar";
import Sidebar, { type SidebarItem, type SidebarProps } from "./Sidebar";

type LayoutProps = Omit<SidebarProps, "items"> & {
  children: ReactNode;
  user?: {
    id: string;
    username: string;
    namaSiswa: string;
    role: $Enums.Roles;
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
      condition: () => user?.role === "Penulis",
    },
    {
      label: "Settings",
      href: `/u/${user?.username}/settings`,
      icon: "settings" as SymbolCodepoints,
      condition: () => currentUser.id === user?.id,
    },
  ];

  return (
    <>
      <MetaTags title={`${user?.namaSiswa} (@${user?.username})`} />
      <NavBar isLandingPage={true} />
      <main className="flex min-h-screen gap-8 px-20 pt-36">
        <Sidebar
          currentUser={currentUser}
          items={sidebarItems}
          className="sticky left-0 top-36"
        />
        {children}
      </main>
    </>
  );
};

export default ProfileLayout;
