
import Image from "next/image";
import AppButton from "../AppButton";
import Link from "next/link";

interface QuizCardProps {
  quiz: {
    title: string
    slug: string
    technology: {
      icon: string,
      name: string
      area: string
    }
    description: string
  }
  admin?: boolean
}

export default function QuizCard({ quiz, admin }: QuizCardProps) {
  return (
    <article
      key={quiz.slug} 
      className="app-card p-5">
        <Link href={`/quiz/${quiz.slug}`}>
          <div className="">
            <Image 
              src={quiz.technology.icon} 
              width={40}
              height={40}
              alt={quiz.title} 
              loading="lazy"
            />
            <div className="flex justify-start items-start flex-col w-full mt-4">
              <h2 className="font-bold text-[1.1em]">{quiz.title}</h2>
              <p className="text-center text-slate-600 dark:text-slate-400 text-sm">{quiz.technology.area}</p>
            </div>
          </div>
        </Link>
        {/* Controles */}
        { admin && 
          <div className="flex justify-end items-center gap-2 mt-4 w-full">
            <AppButton
              className="text-xs bg-blue-500 hover:bg-blue-600 text-white"
              text="Editar Quiz"
              buttonType="link"
              url={`/admin/quizzes/editar/${quiz.slug}`}
            />
          </div>
        }
   </article>
  )
}
