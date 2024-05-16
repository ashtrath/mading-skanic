import { Priorities } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

import slugify from "slugify";
import { z } from "zod";

import { getFilterByInput } from "~/utils";
import { slugSettings } from "~/utils/constant";
import { madingSchema } from "~/utils/validation/mading";

export const madingRouter = createTRPCRouter({
  createMading: protectedProcedure
    .input(madingSchema)
    .mutation(async ({ ctx, input }) => {
      const { title, description, thumbnail, categoryId, priority, article } =
        input;
      const slug = slugify(title, slugSettings);

      const exist = await ctx.db.madings.findFirst({
        where: {
          OR: [{ title }, { slug }],
        },
      });

      if (exist) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Terdapat mading dengan judul yang serupa.",
        });
      }

      const enumPriority = priority ? Priorities.Important : Priorities.Normal;

      const transactionResult = await ctx.db.$transaction(async () => {
        const newMading = await ctx.db.madings.create({
          data: {
            authorId: ctx.session.user.id,
            title: title,
            slug: slug,
            description: description,
            thumbnail: thumbnail,
            article: article,
            priority: enumPriority,
            categoryId: categoryId,
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
        priority: z.nativeEnum(Priorities).optional(),
        filter: z.string().optional(),
        onlyBookmarked: z.boolean().optional(),
        authorId: z.string().optional(),
        categoryId: z.string().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { limit, skip, cursor, filter } = input;
      const currentUserId = ctx.session?.user.id;

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
        where: {
          ...(input.priority && {
            priority: input.priority,
          }),
          ...(input.authorId && {
            authorId: input.authorId,
          }),
          ...(input.categoryId && {
            categoryId: input.categoryId,
          }),
          ...(input.onlyBookmarked && {
            bookmarks: { some: { userId: currentUserId } },
          }),
        },
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

  getMadingBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const mading = await ctx.db.madings.findFirst({
        where: {
          slug: input.slug,
        },
        include: {
          author: true,
          category: true,
        },
      });

      if (!mading) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Mading not found" });
      }

      const bookmark = ctx.session?.user?.id
        ? await ctx.db.bookmarks.findUnique({
            where: {
              userId_madingId: {
                userId: ctx.session.user.id,
                madingId: mading.id,
              },
            },
          })
        : null;

      return {
        ...mading,
        bookmarkedByMe: !!bookmark,
      };
    }),

  toggleBookmark: protectedProcedure
    .input(
      z.object({
        madingId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input: { madingId } }) => {
      if (!madingId) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Mading not found" });
      }

      const data = {
        madingId,
        userId: ctx.session.user.id,
      };

      try {
        const exist = await ctx.db.bookmarks.findUnique({
          where: {
            userId_madingId: data,
          },
        });

        if (exist == null) {
          await ctx.db.bookmarks.create({ data });
          return { addedToBookmark: true };
        } else {
          await ctx.db.bookmarks.delete({ where: { userId_madingId: data } });
          return { addedToBookmark: false };
        }
      } catch (err) {
        console.error("Error toggling bookmark:", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to toggle bookmark",
        });
      }
    }),
});
