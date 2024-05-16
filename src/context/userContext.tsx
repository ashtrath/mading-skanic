import { type Roles } from "@prisma/client";
import { createContext, useContext, type ReactNode } from "react";

type User = {
  role: Roles;
  [key: string]: any;
};

type UserContextProps = {
  user: User | null;
};

const UserContext = createContext<UserContextProps>({ user: null });

type UserProviderProps = {
  user: User;
  children: ReactNode;
};

export const UserProvider = ({ user, children }: UserProviderProps) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
