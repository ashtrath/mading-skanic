import z from "zod";

export const categorySchema = z.object({
  id: z.string(),
  // name: z.string().max(30, "Nama kategori tidak dapat lebih dari 30 karakter"),
});
