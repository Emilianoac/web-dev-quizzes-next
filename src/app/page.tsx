import TechnologyCard from "@/components/cards/TechnologyCard";
import prisma  from "@/lib/prisma";

export default async function Home() {
  const quizzes = await prisma.technology.findMany({
    include: {
      area: true,
      quiz: true
    }
  });

  return (
    
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
      {
        quizzes.map((quiz) => (
          <TechnologyCard key={quiz.slug} data={{
            title: quiz.name,
            area: quiz.area.name,
            slug: quiz.slug,
            icon: quiz.icon,
            quizzes: quiz.quiz.length
          }} />
        ))
      }
    </div>
  );
}
