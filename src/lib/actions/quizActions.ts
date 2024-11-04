"use server";

import slugify from "slugify";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import type { Question, Answer } from "@/types/quiz";
import { quizSchema } from "@/schemas/quizSchema";
import prisma from "@/lib/prisma";

export async function addQuiz(data: FormData) {

  try {
    if (!validateData(data)) throw new Error("Error al validar los datos, intente nuevamente");

    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const technologyId = data.get("technologyId") as string;
    const questions = JSON.parse(data.get("questions") as string);
    const level = data.get("level") as string;
    const isPublic = data.get("isPublic") === "true" ? true : false;
    const slug = slugify(title, { strict: true, lower: true });

    await prisma.quiz.create({
      data: {
        title,
        description,
        isPublic,
        slug,
        level,
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
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error("Error al crear el quiz, intente nuevamente");
    }
    throw e
  }


  revalidatePath("/admin");
};

export async function updateQuiz(data: FormData) {

  try {
    if (!validateData(data)) throw new Error("Error al validar los datos, intente nuevamente");
    
    const title = data.get("title") as string;
    const isPublic = data.get("isPublic") === "true" ? true : false;
    const id = data.get("id") as string;
    const description = data.get("description") as string;
    const level = data.get("level") as string;
    const technologyId = data.get("technologyId") as string;
    const questions = JSON.parse(data.get("questions") as string);

    await prisma.quiz.update({
      where: {
        id: id
      },
      data: {
        title,
        description,
        level,
        isPublic,
        technology: {
          connect: {id: technologyId}
        },
        questions: {
          deleteMany: {},
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
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error("Error al actualizar el quiz, intente nuevamente");
    }
    throw e
  }

  revalidatePath("/admin");
};

export async function deleteQuiz(id: string) {
  try {
    await prisma.quiz.delete({
      where: {
        id: id
      }
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error("Error al eliminar el quiz, intente nuevamente");
    }
    throw e
  }

  revalidatePath("/admin");
};

function validateData(data: FormData) {
  const title = data.get("title") as string;
  const description = data.get("description") as string;
  const technologyId = data.get("technologyId") as string;
  const questions =  JSON.parse(data.get("questions") as string);
  const level = data.get("level") as string;
  const isPublic = data.get("isPublic") === "true" ? true : false;


  const formData = {
    title: title,
    description: description,
    technologyId: technologyId,
    questions: questions,
    level: level,
    isPublic: isPublic
  }

  const validSchema = quizSchema.safeParse(formData);

  if (!validSchema.success)  {
    console.log(validSchema.error.format());
    return false
  } else {
    return true
  }
}

