import Link from "next/link";
import NavLink from "./NavLink";
import { signOut, useSession } from "next-auth/react";
import { Dropdown, DropdownItem } from "../Dropdown";

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-b-mono-black bg-mono-white px-20 py-6">
      <h2 className="font-mono text-lg font-semibold text-mono-black">
        <Link href={"/"}>
          <span className="font-sans">Mading </span>Skanic
        </Link>
      </h2>

      <div className="flex items-center gap-2">
        <ul className="flex items-center">
          <li>
            <NavLink href={"/"} icon="home">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink href={"/madings"} icon="article">
              Mading
            </NavLink>
          </li>
          {session ? (
            <>
              <li>
                <NavLink href={"/auth/signup"} icon="bookmark">
                  Bookmarks
                </NavLink>
              </li>
              <li>
                <Dropdown title={session.user.name}>
                  <DropdownItem><button onClick={() => signOut()}>Sign Out</button></DropdownItem>
                </Dropdown>
              </li>
            </>
          ) : (
            <>
              <div className="mx-2 h-8 w-px bg-mono-black"></div>
              <li>
                <NavLink href={"/auth/signup"} icon="person_add">
                  Daftar
                </NavLink>
              </li>
              <li>
                <NavLink href={"/auth/login"} icon="login" gray={true}>
                  Log In
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
