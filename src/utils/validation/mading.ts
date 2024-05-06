import { Priorities } from "@prisma/client";
import z from "zod";
import { categorySchema } from "./category";

export const madingSchema = z.object({
  title: z
    .string()
    .min(5, "Judul harus memiliki setidaknya 5 karakter")
    .max(100, "Judul tidak dapat melebihi 100 karakter"),
  description: z.string().min(5, "Judul harus memiliki setidaknya 5 karakter"),
  thumbnail: z.string(),
  article: z.string().optional(),
  priority: z.nativeEnum(Priorities).default("Normal"),
  category: categorySchema,
});

export type IMading = z.infer<typeof madingSchema>;
