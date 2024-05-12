import { Priorities } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import slugify from "slugify";
import { createTRPCRouter, protectedProcedure } from "../trpc";

import { slugSettings } from "~/utils/constant";
import { madingSchema } from "~/utils/validation/mading";

export const madingRouter = createTRPCRouter({
  createMading: protectedProcedure
    .input(madingSchema)
    .mutation(async ({ ctx, input }) => {
      const slug = slugify(input.title, slugSettings);

      const priority = input.priority
        ? Priorities.Important
        : Priorities.Normal;

      const transactionResult = await ctx.db.$transaction(async () => {
        const newMading = await ctx.db.madings.create({
          data: {
            authorId: ctx.session.user.id,
            title: input.title,
            slug: slug,
            description: input.description,
            thumbnail: input.thumbnail,
            article: input.article,
            priority: priority,
            categoryId: input.categoryId,
          },
        });

        return { newMading };
      });

      if (!transactionResult) {
        throw new TRPCError({ code: "NOT_IMPLEMENTED" });
      }

      return {
        createMading: transactionResult.newMading,
        success: true,
      };
    }),
});
