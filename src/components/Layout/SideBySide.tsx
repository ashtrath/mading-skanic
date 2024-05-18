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
      <div className="flex min-h-screen gap-8 overflow-hidden px-20 py-16">
        <Sidebar items={items} />
        <main className="flex h-fit w-full flex-col gap-8 overflow-y-auto border border-mono-black px-8 py-4">
          {children}
        </main>
      </div>
    </UserProvider>
  );
};

export default SideBySideLayout;
