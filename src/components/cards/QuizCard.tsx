
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
      slug: string
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
        <Link href={`/tecnologia/${quiz.technology.slug}/quiz//${quiz.slug}`}>
          <div>
            <div className="
              bg-slate-100
              p-2 rounded-full
              w-[55px] h-[55px] 
              flex justify-center items-center
            ">
              <Image 
                src={quiz.technology.icon} 
                width={30}
                height={30}
                alt={quiz.title} 
                loading="lazy"
                className="h-[30px] w-[30px] object-scale-down"
              />         
            </div>
            <div className="flex justify-start items-start flex-col w-full mt-2">
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
