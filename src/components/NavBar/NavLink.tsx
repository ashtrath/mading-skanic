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
      className={`flex items-center gap-2 px-4 py-2 group ${gray ? "bg-mono-black text-mono-white" : "text-mono-black"} ${className}`}
    >
      <MaterialSymbol
        icon={icon}
        fill={false}
        weight={200}
        grade={0}
        size={24}
      />
      <span className="font-mono transition-all duration-75 ease-out no-underline underline-offset-0 group-hover:underline group-hover:underline-offset-8">{children}</span>
    </Link>
  );
};

export default NavLink;
