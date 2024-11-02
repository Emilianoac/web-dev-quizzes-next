
import prisma from "@/lib/prisma";
import QuizzCard from "@/components/cards/QuizCard";
import SectionsHeader from "@/components/admin/AdminSectionHeader";

export default async function QuizzesPage() {
  const quizzes = await prisma.quiz.findMany({
    include: {
      technology: {
        include: {
          area: true,
          quiz: {
            include: {
              questions: true
            }
          }
        }
      }
    }
  });

  return (
    <div>
      <SectionsHeader 
        title="Quizzes"  
        buttonUrl="/admin/quizzes/crear"  
        buttonText="Añadir Quiz"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        { quizzes.map((quiz) => <QuizzCard key={quiz.id} quiz={{
          title: quiz.title,
          description: quiz.description,
          slug: quiz.slug,
          level: quiz.level,
          technology: {
            icon: quiz.technology.icon,
            name: quiz.technology.name,
            area: quiz.technology.area.name,
            slug: quiz.technology.slug
          }
        }} admin={true} /> )}
      </div>
    </div>
  );
}
