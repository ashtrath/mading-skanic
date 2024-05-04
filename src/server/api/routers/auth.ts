import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { registerSchema } from "~/utils/validation/auth";

const SALT_ROUNDS = 10;

import { createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      const { username, email, password, namaSiswa, nisn } = input;

      const exist = await ctx.db.users.findFirst({
        where: {
          OR: [{ email }, { username }, { nisn }],
        },
      });

      if (exist) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Username or Email has already been used.",
        });
      }

      const salt = bcrypt.genSaltSync(SALT_ROUNDS);
      const hash = bcrypt.hashSync(password, salt);

      const result = await ctx.db.users.create({
        data: {
          namaSiswa,
          email,
          username,
          nisn,
          password: hash,
        },
      });

      return {
        status: 201,
        message: "Account created successfully.",
        result: `Email: ${result.email}\n NISN: ${result.nisn}`,
      };
    }),
});
