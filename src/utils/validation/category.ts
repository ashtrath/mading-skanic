import z from "zod";

export const categorySchema = z.object({
  name: z.string().max(30, "Nama kategori tidak dapat lebih dari 30 karakter"),
});

export type ICategory = z.infer<typeof categorySchema>;
