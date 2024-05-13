import { Priorities } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import slugify from "slugify";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

import { z } from "zod";
import { getFilterByInput } from "~/utils";
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

  getAllMading: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(),
        skip: z.number().optional(),
        authorId: z.string().optional(),
        categoryId: z.string().optional(),
        filter: z.string().optional(),
        query: z.string().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { limit, skip, cursor, filter } = input;

      const madings = await ctx.db.madings.findMany({
        take: limit + 1,
        skip: skip,
        cursor: cursor ? { id: cursor } : undefined,
        ...(filter
          ? { orderBy: getFilterByInput(filter) }
          : {
              orderBy: {
                createdAt: "desc",
              },
            }),
        include: {
          author: true,
          category: true,
        },
        ...(input.authorId && {
          where: {
            authorId: input.authorId,
          },
        }),
        ...(input.categoryId && {
          where: {
            category: {
              id: input.categoryId,
            },
          },
        }),
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (madings.length > limit) {
        const nextItem = madings.pop();
        nextCursor = nextItem?.id;
      }

      return {
        madings,
        nextCursor,
      };
    }),
});
