import Link from "next/link";
import { type ReactNode } from "react";
import { MaterialSymbol, type SymbolCodepoints } from "react-material-symbols";

type NavLinkProps = {
  icon: SymbolCodepoints;
  href: string;
  children: ReactNode;
  gray?: boolean;
  className?: string;
};

const NavLink = ({
  icon,
  href,
  children,
  gray,
  className = "",
}: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={`group flex items-center gap-2 px-4 py-2 ${gray ? "bg-mono-black text-mono-white" : "text-mono-black"} ${className}`}
    >
      <MaterialSymbol
        icon={icon}
        fill={false}
        weight={200}
        grade={0}
        size={24}
      />
      <span className="font-mono no-underline underline-offset-4 group-hover:underline">
        {children}
      </span>
    </Link>
  );
};

export default NavLink;
