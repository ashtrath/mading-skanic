import { type Roles } from "@prisma/client";
import { MaterialSymbol, type SymbolCodepoints } from "react-material-symbols";
import { useUser } from "~/context/userContext";
import ProfileImage from "../ui/ProfileImage";
import NavLink from "./NavLink";
import { truncateText } from "~/utils";

type SidebarProps = {
  items: {
    href: string;
    label: string;
    icon: SymbolCodepoints;
    roles?: Roles[];
  }[];
  className?: string;
};

const Sidebar = ({ items, className }: SidebarProps) => {
  const { user } = useUser();

  return (
    <aside
      className={`flex min-h-full max-w-[220px] shrink-0 flex-col justify-between ${className}`}
    >
      <ul className="flex h-fit w-full flex-col gap-4 self-start border border-mono-black bg-mono-white px-6 py-4">
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
      <div className="flex w-full items-center gap-2 border border-mono-black bg-mono-white px-4 py-2">
        {/* <ProfileImage size="size-8" placeholderSize={32} /> */}
        <div>
          <h2 className="font-mono text-sm font-bold">{user?.name}</h2>
          <p className="text-xs">
            {truncateText("adminganteng@gmail.com", 15)}
          </p>
        </div>
        <MaterialSymbol
          icon="arrow_drop_up"
          fill={false}
          weight={200}
          grade={0}
          size={24}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
