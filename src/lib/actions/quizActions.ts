"use server";

import slugify from "slugify";
import { revalidatePath } from "next/cache";
import type { Question, Answer } from "@/types/quiz";
import prisma from "@/lib/prisma";

export async function addQuiz(data: FormData) {
  const title = data.get("title") as string;
  const description = data.get("description") as string;
  const technologyId = data.get("technologyId") as string;
  const questions = JSON.parse(data.get("questions") as string);

  const slug = slugify(title, { strict: true, lower: true });

  await prisma.quiz.create({
    data: {
      title,
      description,
      slug,
      technology: {
        connect: {id: technologyId}
      },
      questions: {
        create: questions.map((question: Question) => ({
          questionText: question.questionText,
          codeExample: question.codeExample,
          answerExplain: question.answerExplain,
          answers: {
            create: question.answers.map((answer: Answer) => ({
              answerText: answer.answerText,
              isCorrect: answer.isCorrect
            }))
          }
        }))
      }
    }
  });

  revalidatePath("/admin");
};