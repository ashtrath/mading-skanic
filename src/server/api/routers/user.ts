import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUserByUsername: publicProcedure
    .input(
      z.object({
        username: z.string().trim(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.users.findFirst({
        where: {
          username: input.username,
        },
      });

      return user;
    }),
});
