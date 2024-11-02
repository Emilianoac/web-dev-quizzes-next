
import { z } from "zod"

export const areaSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre es requerido" })
    .max(255)
    .superRefine((value, ctx) => {
      if (value && value.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El nombre no puede contener solo espacios en blanco",
        });
      }
    }
  ),
});

export type AreaSchema = z.infer<typeof areaSchema>;
export type AreaErrorSchema = z.ZodFormattedError<AreaSchema>;