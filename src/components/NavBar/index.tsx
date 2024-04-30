import Link from "next/link";
import NavLink from "./NavLink";
import { MdHome } from "react-icons/md";

const NavBar = () => {
  return (
    <nav className="border-b-mono-black flex items-center justify-between border-b-2 px-20 py-6">
      <h2 className="text-mono-black font-mono text-lg font-semibold">
        <Link href={"/"}>
          <span className="font-sans">Mading</span> Skanic
        </Link>
      </h2>

      <ul className="flex items-center gap-2">
        <li>
          <NavLink href="/" icon={<MdHome />}>
            Home
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
