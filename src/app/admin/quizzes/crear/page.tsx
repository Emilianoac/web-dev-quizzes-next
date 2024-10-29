import { getTechnologies } from "@/lib/actions/tecnologiaActions";
import QuizForm from "@/components/admin/quiz/QuizForm";
import BreadCrumb from "@/components/AppBreadCrumb";

export default async function CreateQuizPage() {

  const technologies = await getTechnologies();

  const breadCrumb = [
    {
      name: "Quizzes",
      url: "/admin/quizzes"
    },
    {
      name: "Crear",
      url: "/admin/quizzes/crear"
    },
  ]

  return (
    <div>
      <BreadCrumb  
        sections={breadCrumb} 
      />
      <h1 className="text-2xl text-slate-700 font-bold">Nuevo Quiz</h1>
      <QuizForm technologies={technologies} />
    </div>
  )
}
