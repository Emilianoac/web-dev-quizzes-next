import QuizForm from "@/components/admin/quiz/QuizForm"
import BreadCrumb from "@/components/AppBreadCrumb"
import prisma from "@/lib/prisma"


interface EditQuizPageProps {
  params: {
    slug: string
  }
}

export default async function EditQuizPage({params}: EditQuizPageProps) {

  const technologies = await prisma.technology.findMany()
  const quiz = await prisma.quiz.findUnique({
    where: {
      slug: params.slug
    },
    include: {
      technology: true,
      questions: {
        include: {
          answers: true
        }
      }
    }
  })

  
  if (!quiz) {
    return <div>Quiz no encontrado</div>
  }

  const breadcrumbs = [
    {name: "Admin", url: "/admin"},
    {name: "Quizzes", url: "/admin/quizzes"},
    {name: "Editar Quiz", url: undefined}
  ]

  return (
    <div>    
      <BreadCrumb sections={breadcrumbs} />
      <h1 className="text-2xl font-bold mb-4">Editar Quiz</h1>  
      <QuizForm technologies={technologies} quizData={quiz} />
    </div>
  )
}
