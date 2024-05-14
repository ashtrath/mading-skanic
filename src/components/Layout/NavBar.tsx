import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { MaterialSymbol } from "react-material-symbols";
import { Dropdown, DropdownItem } from "../ui/Dropdown";
import NavLink from "./NavLink";

type NavBarProps = {
  isLandingPage?: boolean;
};

const NavBar = ({ isLandingPage }: NavBarProps) => {
  const { data: session } = useSession();

  return (
    <nav
      className={`${isLandingPage ? "fixed" : "sticky"} top-0 z-50 flex w-full items-center justify-between border-b border-b-mono-black bg-mono-white px-20 py-6`}
    >
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
              <li className="mr-2">
                <NavLink href={"/bookmarks"} icon="bookmark">
                  Bookmarks
                </NavLink>
              </li>
              <li>
                <Dropdown title={session.user.name}>
                  <DropdownItem>
                    <Link
                      href={`/user/${encodeURIComponent(session.user.id)}`}
                      className="flex items-center gap-1 font-mono"
                    >
                      <MaterialSymbol
                        icon={"account_circle"}
                        fill={false}
                        weight={200}
                        grade={0}
                        size={24}
                      />
                      Profile
                    </Link>
                  </DropdownItem>
                  {session.user.role !== "Siswa" && (
                    <DropdownItem>
                      <Link
                        href={`/dashboard`}
                        className="flex items-center gap-1 font-mono"
                      >
                        <MaterialSymbol
                          icon={"space_dashboard"}
                          fill={false}
                          weight={200}
                          grade={0}
                          size={24}
                        />
                        Dashboard
                      </Link>
                    </DropdownItem>
                  )}
                  <DropdownItem>
                    <button
                      onClick={() => signOut()}
                      className="flex items-center gap-1 font-mono text-mono-danger"
                    >
                      <MaterialSymbol
                        icon={"logout"}
                        fill={false}
                        weight={200}
                        grade={0}
                        size={24}
                      />
                      Sign Out
                    </button>
                  </DropdownItem>
                </Dropdown>
              </li>
            </>
          ) : (
            <>
              <li className="mx-2 h-8 w-px bg-mono-black"></li>
              <li className="mr-2">
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
