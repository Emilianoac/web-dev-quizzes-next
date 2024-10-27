import SectionsHeader from "@/components/admin/AdminSectionHeader";
import prisma from "@/lib/prisma";

export default async function CategoriesPage() {
  const areas = await prisma.area.findMany({
    include: {
      technologies: {
        include: {
          quiz: true
        }
      },
    }
  });

  if (!areas) {
    return (
      <div>
        <h1 className="text-2xl text-slate-700 font-bold mb-4">Areas</h1>
        <p>No hay Areas registradas</p>
      </div>
    )
  }

  return (
    <div>
      <SectionsHeader
        title="Areas"
        buttonUrl="/admin/areas/crear"
        buttonText="Añadir Area"
      />
      <div className="app-tabla">
        <div className="app-tabla__header grid grid-cols-3 p-4">
          <p className="font-semibold">Nombre</p>
          <p className="font-semibold">Tecnologías</p>
          <p className="font-semibold">Quizzes</p>
        </div>
        <div className="app-tabla__body mt-2">
          {areas.map((area) => (
            <div 
              className="app-tabla__row grid grid-cols-3 bg-white shadow-sm rounded-md p-4 gap-2" 
              key={area.id}>
                <p>{area.name}</p>
                <p>{area.technologies.length}</p>
                <p>{area.technologies.reduce((acc, tech) => acc + tech.quiz.length, 0)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
