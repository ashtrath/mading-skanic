import { createTRPCRouter, publicProcedure } from "../trpc";

export const categoryRouter = createTRPCRouter({
  getAllCategory: publicProcedure.query(async ({ ctx }) => {
    const category = await ctx.db.categories.findMany();
    return category;
  }),
});
