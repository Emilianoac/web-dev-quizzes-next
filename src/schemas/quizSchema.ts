
import { z } from "zod";

export const quizSchema = z.object({
  title: z
    .string()
    .min(1, { message: "El titulo es requerido." })
    .max(255)
    .superRefine((value, ctx) => {
      if (value && value.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El nombre no puede contener solo espacios en blanco.",
        });
      }
    }
  ),
  isPublic: z
    .boolean(),
  description: z
    .string()
    .max(255),
  technologyId: z
    .string()
    .min(1, { message: "La tecnología es requerida." }),
  level: z
    .string()
    .refine((value) => ["basico", "intermedio", "avanzado"].includes(value), {
      message: "El nivel es requerido.",
    }),
  questions: z
    .array(
      z.object({
        questionText: z
          .string()
          .min(1, { message: "El titulo es requerido." })
          .max(255)
          .superRefine((value, ctx) => {
            if (value && value.trim() === "") {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "El nombre no puede contener solo espacios en blanco.",
              });
            }
          }
        ),
        answerExplain: z
          .string()
          .min(1, { message: "La explicación es requerida." })
          .max(255)
          .superRefine((value, ctx) => {
            if (value && value.trim() === "") {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "La explicación no puede contener solo espacios en blanco.",
              });
            }
          }
        ),
        answers: z
          .array(
            z.object({
              answerText: z
                .string()
                .min(1, { message: "La respuesta es requerida." })
                .max(255)
                .superRefine((value, ctx) => {
                  if (value && value.trim() === "") {
                    ctx.addIssue({
                      code: z.ZodIssueCode.custom,
                      message: "La respuesta no puede contener solo espacios en blanco.",
                    });
                  }
                }
              ),
              isCorrect: z
                .boolean()
            })
          )
      })
    )
  
});

export type QuizSchema = z.infer<typeof quizSchema>;
export type QuizErrorSchema = z.ZodFormattedError<QuizSchema>;