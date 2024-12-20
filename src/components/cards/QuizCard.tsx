
import Image from "next/image";
import Link from "next/link";
import QuizLevelBadge from "./QuizLevelBadge";
import CardActions from "./CardActions";
import ButtonAddToFavorite from "../quiz/ButtonAddToFavorite";
import FavoritesCookieService from "@/lib/cookies/favorites";

interface QuizCardProps {
  quiz: {
    title: string
    slug: string
    id: string
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

  const cookieService = new FavoritesCookieService();
  const data = cookieService.getCookie("_favorites");
  const favorites = data ? cookieService.decodeCookie(data) : [];

  const isFavorite = favorites?.includes(quiz.id);

  return (
    <article
      key={quiz.slug} 
      className="app-card relative">
        {/* Favoritos */}
        <ButtonAddToFavorite className="absolute right-3 top-3" quizId={quiz.id} isFavorite={isFavorite} />
        <Link className="p-4 block" href={`/tecnologia/${quiz.technology.slug}/quiz//${quiz.slug}`}>
          <div>
            <div className="flex justify-between items-start">
              {/* Icono Tencologia */}
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
            </div>

            <div className="flex justify-start items-start flex-col w-full mt-2">
              <QuizLevelBadge level={quiz.level as Level} className="mt-4 mb-2" />
              {/* Titulo */}
              <h2 
                title={quiz.title}
                className="text-start font-bold text-[0.95em] line-clamp-1">
                  {quiz.title}
              </h2>
              {/* Area */}
              <p className="text-slate-600 dark:text-slate-400 text-sm">{quiz.technology.area}</p>
            </div>
          </div>
        </Link>
        {/* Controles */}
        { admin && 
         <CardActions
            className="p-4"
            cardType="quizzes"
            itemId={quiz.id}
            itemSlug={quiz.slug}
          />
        }
   </article>
  )
}
