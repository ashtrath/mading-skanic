import { type Session } from "next-auth";
import NavLink, { type NavLinkProps } from "./NavLink";

type CurrentUser = Session["user"] & {
  isAuthenticated: boolean;
};

export type SidebarItem = Omit<NavLinkProps, "children"> & {
  label: string;
  condition?: (user: CurrentUser) => boolean;
};

export type SidebarProps = {
  currentUser: CurrentUser;
  items: SidebarItem[];
};

const Sidebar = ({ currentUser, items }: SidebarProps) => {
  return (
    <aside className="flex h-full w-64 flex-col gap-4 self-start border border-mono-black bg-mono-white px-8 py-4">
      {items
        .filter((item) => (item.condition ? item.condition(currentUser) : true))
        .map((item) => (
          <NavLink
            key={item.href}
            icon={item.icon}
            href={item.href}
            className="!p-0"
          >
            {item.label}
          </NavLink>
        ))}
    </aside>
  );
};

export default Sidebar;
