
import Image from "next/image";
import Link from "next/link";
import TechCardActions from "./CardActions";

interface CardProps {
  data: {
    title: string
    area: string
    slug: string
    icon: string
    quizzes: number
    id: string
  }
  admin?: boolean
}

export default function QuizCard({ data, admin }: CardProps) {
  return (
    <article
      key={data.slug} 
      className="app-card">
        <Link href={`/tecnologia/${data.slug}`} className="w-100 block p-4">
          <div 
            className="
            bg-slate-100
              p-2 rounded-full mx-auto mb-4
              w-[55px] h-[55px] 
              flex justify-center items-center">
              <Image 
                src={data.icon} 
                width={30}
                height={30}
                alt={data.title} 
                className=" h-[30px] w-[30px] object-scale-down"  
                loading="lazy"
              />
          </div>
          <h2 className="font-bold md:text-[1.1em] text-base">{data.title}</h2>
          <p className="text-center text-slate-700 dark:text-slate-300 line-clamp-1 text-sm font-semibold mt-2">{data.area}</p>
          <p className="text-center text-slate-600 dark:text-slate-400 text-sm mt-3">
            {data.quizzes} 
            {data.quizzes === 1 ? ' Quiz' : ' Quizzes'}
          </p>
        </Link>
        { admin &&
          <TechCardActions
            className="p-4 justify-center"
            cardType="tecnologias"
            itemId={data.id}
            itemSlug={data.slug}
          />
        }
   </article>
  )
}
