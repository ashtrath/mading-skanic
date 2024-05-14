import { createServerSideHelpers } from "@trpc/react-query/server";
import { type IncomingMessage, type ServerResponse } from "http";
import { type NextApiRequest, type NextApiResponse } from "next";
import SuperJSON from "superjson";
import { appRouter } from "./root";
import { createTRPCContext } from "./trpc";

type RequestType = IncomingMessage & {
  cookies: Partial<Record<string, string>>;
};

type ResponseType = ServerResponse;

type Args = {
  req: RequestType;
  res: ResponseType;
  /** If true, will skip getting the server-side session. */
  skipSession?: boolean;
};

export const generateSSGHelper = async ({
  req,
  res,
  /** If true, will skip getting the server-side session. */
  skipSession = false,
}: Args) => {
  return createServerSideHelpers({
    router: appRouter,
    ctx: await createTRPCContext(
      {
        req: req as NextApiRequest,
        res: res as NextApiResponse,
      },
      skipSession,
    ),
    transformer: SuperJSON,
  });
};
