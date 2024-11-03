
import QuizMain from "@/components/quiz/QuizMain";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

interface QuizPageProps {
  params: {
    quizSlug: string;
  }
}

export default async function QuizzPage({ params }: QuizPageProps) {

  const quiz = await prisma.quiz.findUnique({
    where: {
      slug: params.quizSlug,
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

  if (!quiz) redirect("/");
  

  return (
    <>
      <QuizMain quiz={quiz}/>
    </>
  )
}
