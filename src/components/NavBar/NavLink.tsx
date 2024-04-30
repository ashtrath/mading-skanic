import Link from "next/link";
import { type ReactNode } from "react";
import { IconContext } from "react-icons";

type NavLinkProps = {
  icon: ReactNode;
  href: string;
  children: ReactNode;
  gray?: boolean;
  className?: string;
};

const NavLink = ({ icon, href, children, gray, className = "" }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-4 py-2 ${gray ? "bg-mono-black" : ""} ${className}`}
    >
      <IconContext.Provider
        value={{ className: "size-6 text-mono-black" }}
      >
        <div>
          {icon}
        </div>
      </IconContext.Provider>
      <span className="text-sm font-mono">{children}</span>
    </Link>
  );
};

export default NavLink;
