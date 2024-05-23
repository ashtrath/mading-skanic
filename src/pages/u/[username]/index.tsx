import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import { MaterialSymbol } from "react-material-symbols";
import ProfileLayout from "~/components/Layout/ProfileLayout";
import ProfileImage from "~/components/ui/ProfileImage";
import { generateSSGHelper } from "~/server/api/ssgHelper";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";

const ProfilePage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { username, currentUser } = props;

  const { data: user } = api.user.getUserByUsername.useQuery(
    { username },
    {
      refetchOnWindowFocus: false,
    },
  );

  return (
    <ProfileLayout currentUser={currentUser} user={user}>
      <div className="flex h-fit w-full flex-col items-center justify-center gap-2 border border-mono-black px-8 py-4">
        <ProfileImage
          size="size-32"
          placeholderSize={128}
          className="border border-mono-black bg-white"
        />
        <h1 className="font-mono text-lg font-bold text-mono-black">
          {user?.namaSiswa}
        </h1>
        <div className="flex items-center gap-2 text-mono-black">
          <h2 className="text-sm">@{user?.username}</h2>
          <MaterialSymbol
            icon="circle"
            fill={true}
            weight={200}
            grade={0}
            size={8}
          />
          <p className="text-sm">
            {user?.role} {user?.nisn && `(${user.nisn})`}
          </p>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default ProfilePage;

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext<{ username: string }>,
) => {
  const { req, res } = ctx;
  const session = await getServerAuthSession({
    req,
    res,
  });

  const currentUser = {
    isAuthenticated: !!session,
    id: session?.user.id ?? "",
    role: session?.user.role ?? "Siswa",
  };

  const ssg = await generateSSGHelper({ req, res });
  // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
  const username = ctx.params?.username as string;

  await ssg.user.getUserByUsername.prefetch({
    username,
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      currentUser,
      username,
    },
  };
};
