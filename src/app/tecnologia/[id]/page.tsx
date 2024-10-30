
import prisma from "@/lib/prisma";
import QuizCard from "@/components/cards/QuizCard";

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
      <h1 className="text-2xl font-bold mb-4">
        Quizzes 
        <span className="inline-block ms-2 text-primary-500">{technology.name}</span> 
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 m">
        {
          technology?.quiz.map(q => (
            <QuizCard key={q.slug} quiz={{
              title: q.title,
              slug: q.slug,
              description: q.description,
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
