
import QuizMain from "@/components/quiz/QuizMain";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import appMetaData from "@/constants/metaData";

interface QuizPageProps {
  params: {
    quizSlug: string;
  }
}

async function getQuiz(slug: string) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: {
        slug,
        isPublic: true
      },
      include: {
        technology: {
          include: {
            area: true,
          }
        },
        questions: {
          include: {
            answers: true,
          }
        }
      }
    })
    return quiz;
  } catch {
    console.error("Error al obtener el quiz");
  }
};

export async function generateMetadata( { params }: QuizPageProps ): Promise<Metadata> {
  const id = params.quizSlug;
  const quiz = await getQuiz(id);
  return {
    title: `${quiz?.title}`,
    description: `${appMetaData.quiz.description} ${quiz?.technology.name}`
  }
};

export default async function QuizzPage({ params }: QuizPageProps) {

  const quiz = await getQuiz(params.quizSlug);
  if (!quiz) redirect("/");

  return (
    <>
      <QuizMain quiz={quiz}/>
    </>
  )
}
