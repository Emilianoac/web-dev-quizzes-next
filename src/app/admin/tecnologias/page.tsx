import SectionsHeader from "@/components/admin/AdminSectionHeader";
import TechnologyCard from "@/components/cards/TechnologyCard";
import prisma from "@/lib/prisma";

export default async function TechnologyPage() {

  const technologies = await prisma.technology.findMany({
    include: {
      area: true,
      quiz: true
    }
  });

  return (
    <div>
      <SectionsHeader 
        title="Tecnologías" 
        buttonText="Añadir tecnología"
        buttonUrl="/admin/tecnologias/crear"
      />
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {technologies.map((technology) => (
          <TechnologyCard key={technology.id} data={{
            title: technology.name,
            icon: technology.icon,
            area: technology.area.name,
            slug: technology.slug,
            quizzes: technology.quiz.length
          }} />
        ))}
      </ul>
    </div>
  )
}
