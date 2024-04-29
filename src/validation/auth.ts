import z from "zod";

export const loginSchema = z.object({
  username: z.string().min(8),
  password: z.string().min(4),
});

export const registerSchema = loginSchema.extend({
  email: z.string().email(),
});

export type ILogin = z.infer<typeof loginSchema>;
export type IRegister = z.infer<typeof registerSchema>;
