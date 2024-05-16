import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { useSession } from "next-auth/react";
import { generateSSGHelper } from "~/server/api/ssgHelper";
import { api } from "~/utils/api";

import Link from "next/link";
import Input from "~/components/Input/Input";
import Footer from "~/components/Layout/Footer";
import NavBar from "~/components/Layout/NavBar";
import NavLink from "~/components/Layout/NavLink";
import MetaTags from "~/components/Meta/MetaTags";
import { buttonVariants } from "~/components/ui/Button";
import ProfileImage from "~/components/ui/ProfileImage";

const ProfilePage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const session = useSession();
  const { username } = props;

  const { data: user } = api.user.getUserByUsername.useQuery(
    { username },
    {
      refetchOnWindowFocus: false,
    },
  );

  return (
    <>
      <MetaTags title={`${user?.namaSiswa} (@${user?.username})`} />
      <NavBar />
      <main className="my-16 flex min-h-screen gap-8 overflow-x-hidden px-20">
        <aside className="flex h-fit flex-col gap-4 self-start border border-mono-black bg-mono-white px-8 py-4">
          <NavLink
            href={`/u/${username}`}
            icon="account_circle"
            className="!p-0"
          >
            Profile
          </NavLink>
          {user?.role === "Penulis" && (
            <NavLink
              href={`/u/${username}/madings`}
              icon="article"
              className="!p-0"
            >
              Madings
            </NavLink>
          )}
          {session.data?.user.id == user?.id && (
            <NavLink
              href={`/u/${username}/settings`}
              icon="settings"
              className="!p-0"
            >
              Settings
            </NavLink>
          )}
        </aside>
        <div className="flex h-fit w-full flex-col gap-8 overflow-hidden border border-mono-black px-8 py-4">
          <h1 className="font-mono text-lg font-semibold text-mono-black">
            {user?.username}
          </h1>
          <div className="size-fit self-center rounded-full border border-mono-black bg-white">
            <ProfileImage size="size-32" placeholderSize={128} />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col space-y-1">
              <Input
                label="Display Name"
                name="display_name"
                type="text"
                value={user.namaSiswa}
                disabled={true}
                onChange={() => console.log("asd")}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Input
                label="Username"
                name="username"
                type="text"
                value={user.username}
                disabled={true}
                onChange={() => console.log("asd")}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Input
                label="Email"
                name="email"
                type="text"
                value={user.email}
                disabled={true}
                onChange={() => console.log("asd")}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Input
                label="NISN"
                name="nisn"
                type="text"
                value={user.nisn}
                disabled={true}
                onChange={() => console.log("asd")}
              />
            </div>
            {session.data?.user.id == user?.id && (
              <Link
                href={`/u/${username}/edit`}
                className={`self-end ${buttonVariants({ intent: "primary", size: "normal" })}`}
              >
                Edit
              </Link>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext<{ username: string }>,
) => {
  const { req, res } = ctx;

  const ssg = await generateSSGHelper({ req, res });
  // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
  const username = ctx.params?.username as string;

  await ssg.user.getUserByUsername.prefetch({
    username,
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      username,
    },
  };
};
