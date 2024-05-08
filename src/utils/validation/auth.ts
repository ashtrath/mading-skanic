import z from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(8, "Username harus memiliki setidaknya 8 karakter")
    .max(16, "Username tidak dapat melebihi 16 karakter."),
  password: z.string().min(8, "Password harus memiliki setidaknya 8 karakter."),
});

export const registerSchema = loginSchema.extend({
  namaSiswa: z.string(),
  email: z.string().email(),
  nisn: z.string().max(11),
});

export type ILogin = z.infer<typeof loginSchema>;
export type IRegister = z.infer<typeof registerSchema>;
