
import prisma from "@/lib/prisma";
import QuizCard from "@/components/cards/QuizCard";
import Image from "next/image";

interface Props {
  params: {
    id: string;
  }
}

export default async function TechnologyPage({ params }: Props) {

  const technology = await prisma.technology.findUnique({
    where: { slug: params.id },
    include: {
      area: true,
      quiz: {
        include: {
          questions: {
            include: {
              answers: true
            }
          }
        }
      }
    }
  })

  if (!technology) return <div>Tecnología no encontrada.</div>

  return (
    <div>
      <div className="block md:flex items-center gap-9 text-center md:text-start bg-white dark:bg-blue-gray p-5 rounded-lg">
        <div className="flex items-center justify-center bg-slate-100 w-[160px] h-[160px] rounded-full flex-shrink-0 mx-auto md:mx-0">
          <Image 
            className="object-scale-down h-[80px] w-[80px]" 
            src={technology.icon} 
            alt={technology.name} 
            width={100} 
            height={100} 
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mt-4">{technology.name}</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-[700px]">
            {technology.description ?? ""}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-5 mt-10">
        <h2 className="text-xl font-bold">Quizzes</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {
          technology?.quiz.map(q => (
            <QuizCard key={q.slug} quiz={{
              title: q.title,
              slug: q.slug,
              description: q.description,
              level: q.level,
              technology: {
                icon: technology.icon,
                name: technology.name,
                area: technology.area.name,
                slug: technology.slug
              }
            }} />
          ))
        }
      </div>
    </div>
  )
}
