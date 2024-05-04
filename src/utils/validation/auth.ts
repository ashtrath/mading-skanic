import z from "zod";

export const loginSchema = z.object({
  username: z.string().min(8),
  password: z.string().min(4),
});

export const registerSchema = loginSchema.extend({
  namaSiswa: z.string(),
  email: z.string().email(),
  nisn: z.string().max(11),
});

export type ILogin = z.infer<typeof loginSchema>;
export type IRegister = z.infer<typeof registerSchema>;
