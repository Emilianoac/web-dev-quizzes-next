
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  data: {
    title: string
    area: string
    slug: string
    icon: string
    quizzes: number
  }
  admin?: boolean
}

export default function QuizCard({ data, admin }: CardProps) {
  return (
    <article
      key={data.slug} 
      className="app-card">
        <Link href={`/tecnologia/${data.slug}`} className="w-100 block p-6">
          <Image 
            src={data.icon} 
            width={55}
            height={55}
            alt={data.title} 
            className="mx-auto block mb-4 object-contain h-[40px] md:h-[55px]"  
            loading="lazy"
          />
          <h2 className="font-bold md:text-[1.1em] text-base">{data.title}</h2>
          <p className="text-center text-slate-700 dark:text-slate-300 text-sm font-semibold mt-2">{data.area}</p>
          <p className="text-center text-slate-600 dark:text-slate-400 text-sm mt-3">
            {data.quizzes} 
            {data.quizzes === 1 ? ' Quiz' : ' Quizzes'}
          </p>
        </Link>
   </article>
  )
}
