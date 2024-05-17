import { type Roles } from "@prisma/client";
import React from "react";
import { type SymbolCodepoints } from "react-material-symbols";
import { UserProvider } from "~/context/userContext";
import Sidebar from "./Sidebar";

interface LayoutProps {
  items: {
    href: string;
    label: string;
    icon: SymbolCodepoints;
    roles?: Roles[];
  }[];
  children: React.ReactNode;
  user: { role: Roles; [key: string]: any };
}

const SideBySideLayout: React.FC<LayoutProps> = ({ items, children, user }) => {
  return (
    <UserProvider user={user}>
      <div className="flex h-screen flex-1 gap-8 overflow-hidden">
        <Sidebar items={items} className="py-16 ml-20" />
        <main className="flex w-full flex-col gap-8 overflow-y-auto py-16 pr-20">
          {children}
        </main>
      </div>
    </UserProvider>
  );
};

export default SideBySideLayout;
