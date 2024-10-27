
import prisma from "@/lib/prisma";
import QuizzCard from "@/components/QuizCard";
import SectionsHeader from "@/components/admin/AdminSectionHeader";

export default async function QuizzesPage() {
  const quizzes = await prisma.quiz.findMany({
    include: {
      technology: {
        include: {
          area: true 
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        { quizzes.map((quiz) => <QuizzCard key={quiz.id} quiz={quiz} admin={true} /> )}
      </div>
    </div>
  );
}
