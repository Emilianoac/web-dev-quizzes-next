import QuizCard from "@/components/QuizCard";
import prisma  from "@/lib/prisma";

export default async function Home() {
  const quizzes = await prisma.quiz.findMany({
    include: {
      technology: {
        include: {
          area: true,
        }
      }
    }
  });

  return (
    
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
      {
        quizzes.map((quiz) => (
          <QuizCard key={quiz.slug} quiz={quiz} />
        ))
      }
    </div>
  );
}
