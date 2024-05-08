import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const User: NextPage = () => {
  const router = useRouter();
  const {data: session} = useSession();

  return (
    <>
      <p>User ID: {router.query.id}</p>
      <p>Username: {session?.user.name}</p>
      <p>Email: {session?.user.email}</p>
      <p>Role: {session?.user.role}</p>
    </>
  );
};

export default User;
