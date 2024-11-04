
import prisma from "@/lib/prisma";
import QuizCard from "@/components/cards/QuizCard";
import Image from "next/image";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import appMetaData from "@/constants/metaData";

interface Props {
  params: {
    id: string;
  }
}

async function getTechnology(slug: string) {
  try {
    const technology = await prisma.technology.findUnique({
      where: { slug },
      include: {
        area: true,
        quiz: {
          where: { isPublic: true },
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
    return technology;
  } catch {
    console.error("Error al obtener la tecnología");
  }
};

export async function generateMetadata( { params }: Props ): Promise<Metadata> {
  const id = params.id;
  const technology = await getTechnology(id);
  return {
    title: `${technology?.name}`,
    description: `${appMetaData.tecnologia.description} ${technology?.name}`
  }
};

export default async function TechnologyPage({ params }: Props) {

  const technology = await getTechnology(params.id);
  if (!technology) redirect("/");

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

      { technology.quiz.length > 0 ?
        <>
          <h2 className="text-xl font-bold mt-10 mb-4">Quizzes</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {
              technology?.quiz.map(q => (
                <QuizCard key={q.slug} quiz={{
                  title: q.title,
                  slug: q.slug,
                  id: q.id,
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
        </>:
        <div className="text-center mt-10">
          <p className="font-bold text-xl dark:text-slate-700 text-slate-400">
            No hay quizzes disponibles para esta tecnología.
          </p>
        </div>
      }
    </div>
  )
}
