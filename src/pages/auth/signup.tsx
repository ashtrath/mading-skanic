import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { MaterialSymbol } from "react-material-symbols";

import { RegisterForm } from "~/components/Form/RegisterForm";
import MetaTags from "~/components/Meta/MetaTags";
import { getServerAuthSession } from "~/server/auth";

const Register: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <MetaTags title="Sign Up" />
      <section className="flex h-screen items-center justify-center">
        <button
          onClick={() => router.back()}
          className="absolute left-5 top-4 grid place-items-center border border-mono-black bg-mono-white p-1"
        >
          <MaterialSymbol
            icon="arrow_back"
            fill={false}
            weight={200}
            grade={0}
            size={24}
          />
        </button>
        <div className="w-fit border border-mono-black px-8 py-4 text-mono-black shadow-mono">
          <h2 className="font-mono text-lg font-semibold">Daftar</h2>
          <p className="mb-4 text-sm">
            Silahkan daftar untuk mengakses fitur lainnya!
          </p>
          <RegisterForm />
        </div>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession({
    req: ctx.req,
    res: ctx.res,
  });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default Register;
