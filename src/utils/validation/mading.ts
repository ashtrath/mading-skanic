import z from "zod";

export const madingSchema = z.object({
  title: z
    .string()
    .min(5, "Judul harus memiliki setidaknya 5 karakter")
    .max(191, "Judul tidak dapat melebihi 191 karakter"),
  description: z.string().min(5, "Judul harus memiliki setidaknya 5 karakter"),
  thumbnail: z.string().nullable(),
  article: z.string().optional(),
  priority: z.boolean().optional(),
  categoryId: z.string(),
});

export type IMading = z.infer<typeof madingSchema>;
