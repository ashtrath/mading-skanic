import type { GetServerSideProps, NextPage } from "next";
import { getServerAuthSession } from "~/server/auth";

import CreateMadingForm from "~/components/Form/CreateMadingForm";

const Dashboard: NextPage = () => {
  return (
    <>
      <CreateMadingForm />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession({
    req: ctx.req,
    res: ctx.res,
  });

  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const userRole = session.user.role;
  if (!["Penulis", "Admin"].includes(userRole)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default Dashboard;
