
import QuizMain from "@/components/quiz/QuizMain";
import prisma from "@/lib/prisma";

interface QuizPageProps {
  params: {
    quizSlug: string;
  }
}

export default async function QuizzPage({ params }: QuizPageProps) {

  const quiz = await prisma.quiz.findUnique({
    where: {
      slug: params.quizSlug,
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

  if (!quiz) return <div>Quiz no encontrado</div>
  

  return (
    <>
      <QuizMain quiz={quiz}/>
    </>
  )
}
