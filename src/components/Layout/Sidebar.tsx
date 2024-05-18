import { type Roles } from "@prisma/client";
import { type SymbolCodepoints } from "react-material-symbols";
import { useUser } from "~/context/userContext";
import NavLink from "./NavLink";

type SidebarProps = {
  items: {
    href: string;
    label: string;
    icon: SymbolCodepoints;
    roles?: Roles[];
  }[];
};

const Sidebar = ({ items }: SidebarProps) => {
  const { user } = useUser();

  return (
    <aside className="sticky left-0 top-0 flex min-h-full min-w-[200px] max-w-[230px] shrink-0 flex-col justify-between">
      <ul className="flex h-fit w-full flex-col gap-4 self-start border border-mono-black bg-mono-white px-8 py-4">
        {items.map((item, index) => {
          if (!item.roles || (user && item.roles.includes(user.role))) {
            return (
              <NavLink
                key={index}
                href={item.href}
                icon={item.icon}
                className="!p-0"
              >
                {item.label}
              </NavLink>
            );
          }
          return null;
        })}
      </ul>
      {/* <div className="w-full border border-mono-black bg-mono-white px-8 py-4">
        <ProfileImage size="32" placeholderSize={32} />
      </div> */}
    </aside>
  );
};

export default Sidebar;
