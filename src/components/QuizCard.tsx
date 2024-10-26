
import type { Technology } from "@/types/quiz";
import Image from "next/image";
import AppButton from "./AppButton";

interface QuizCardProps {
  quiz: {
    title: string
    slug: string
    technology: Technology
    description: string
  }
  admin?: boolean
}

export default function QuizCard({ quiz, admin }: QuizCardProps) {
  return (
    <article
      key={quiz.slug} 
      className="
      bg-white text-slate-700 
        text-center
        shadow-sm rounded-md  p-6 
        hover:shadow-lg 
        transition-shadow ease-in-out duration-300">
        <Image 
          src={quiz.technology.icon} 
          width={70}
          height={70}
          alt={quiz.title} 
          className="mx-auto block mb-6"  
          loading="lazy"
        />
        <h2 className="font-bold text-[1.2em]">{quiz.title}</h2>
        <p className="text-center text-slate-600 text-sm">{quiz.technology.area.name}</p>
        {/* Controles */}
        <div className="flex justify-center items-center gap-2 mt-4">
          <AppButton
            className="text-xs"
            text="Comenzar Quiz"
            buttonType="link"
            url={`quiz/${quiz.slug}`}
          />
          { admin && 
            <AppButton
              className="text-xs bg-slate-400 hover:bg-slate-500"
              text="Editar Quiz"
              buttonType="link"
              url={`/admin/quizzes/editar/${quiz.slug}`}
            />
          }
        </div>
   </article>
  )
}
