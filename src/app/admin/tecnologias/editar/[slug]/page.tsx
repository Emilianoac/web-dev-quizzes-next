
import prisma from "@/lib/prisma";
import TechnologyForm from "@/components/admin/tecnologia/TecnologiaForm";

interface EditTechnologyPageProps {
  params: {
    slug: string
  }
}

export default async function EditTechnologyPage({ params }: EditTechnologyPageProps) {

  const areas = await prisma.area.findMany();

  const technology = await prisma.technology.findUnique({
    where: {
      slug: params.slug
    },
  });

  if (!technology) return <div>Tecnología no encontrada.</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Editar Tecnología</h1>
      <TechnologyForm technologyData={technology} areas={areas} />
    </div>
  )
}
