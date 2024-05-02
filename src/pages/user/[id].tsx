import { NextPage } from "next";
import { useRouter } from "next/router";

const User: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <p>User ID: {router.query.id}</p>
    </>
  );
};

export default User;
