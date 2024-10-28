import SectionsHeader from "@/components/admin/AdminSectionHeader";
import prisma from "@/lib/prisma";
import Image from "next/image";

export default async function TechnologyPage() {

  const technologies = await prisma.technology.findMany({
    include: {
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
      <ul className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {technologies.map((technology) => (
          <li
           className="p-4 bg-white shadow-sm rounded-md flex flex-col items-center gap-2"
           key={technology.id}>
            <Image 
              src={technology.icon} 
              alt={technology.name} 
              width={90} 
              height={90} 
              className="p-4 object-contain h-[90px]" 
            />
            <p className="font-semibold">
              {technology.name}
            </p>
            <p className="text-sm text-slate-500">
              {technology.quiz.length > 0 ? technology.quiz.length : 0}
              {technology.quiz.length === 1 ? ' Quiz' : ' Quizzes'}
            </p>
           </li>
        ))}
      </ul>
    </div>
  )
}
