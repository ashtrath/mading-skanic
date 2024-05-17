import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const categoryRouter = createTRPCRouter({
  getAllCategory: publicProcedure.query(async ({ ctx }) => {
    const category = await ctx.db.categories.findMany();
    return category;
  }),

  createCategory: protectedProcedure
    .input(
      z.object({
        name: z.string().max(30, "Nama kategori melebihi batas."),
      }),
    )
    .mutation(async ({ ctx, input: { name } }) => {
      if (ctx.session.user.role !== "Admin") {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const exist = await ctx.db.categories.findFirst({
        where: {
          name,
        },
      });

      if (exist) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Terdapat kategori dengan nama yang serupa.",
        });
      }

      const transactionResult = await ctx.db.$transaction(async () => {
        const newCategory = await ctx.db.categories.create({
          data: {
            name,
          },
        });

        return { newCategory };
      });

      if (!transactionResult) {
        throw new TRPCError({ code: "NOT_IMPLEMENTED" });
      }

      return {
        createMading: transactionResult.newCategory,
        success: true,
      };
    }),

  deleteCategory: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input: { id } }) => {
      if (!id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Category not found",
        });
      }

      try {
        const exist = await ctx.db.categories.findUnique({
          where: {
            id,
          },
        });

        if (exist) {
          await ctx.db.categories.delete({ where: { id } });
          return { addedToBookmark: false };
        }
      } catch (err) {
        console.error("Error deleting bookmark:", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to delete category",
        });
      }
    }),
});
