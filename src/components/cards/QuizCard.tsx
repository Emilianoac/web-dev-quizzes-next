
import Image from "next/image";
import Link from "next/link";
import QuizLevelBadge from "./QuizLevelBadge";
import CardActions from "./CardActions";

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
    level: string
    description: string
  }
  admin?: boolean
}

type Level = "basico" | "intermedio" | "avanzado";

export default function QuizCard({ quiz, admin }: QuizCardProps) {
  return (
    <article
      key={quiz.slug} 
      className="app-card">
        <Link className="p-4 block" href={`/tecnologia/${quiz.technology.slug}/quiz//${quiz.slug}`}>
          <div>
            <div className="flex justify-between items-start">
              {/* Icono */}
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
              <QuizLevelBadge level={quiz.level as Level} />
            </div>


            <div className="flex justify-start items-start flex-col w-full mt-2">
              {/* Titulo */}
              <h2 className="font-bold text-[1.1em]">{quiz.title}</h2>
              {/* Area */}
              <p className="text-center text-slate-600 dark:text-slate-400 text-sm">{quiz.technology.area}</p>
            </div>
          </div>
        </Link>
        {/* Controles */}
        { admin && 
         <CardActions
            className="p-4"
            cardType="quizzes"
            itemId={quiz.slug}
            itemSlug={quiz.slug}
          />
        }
   </article>
  )
}
