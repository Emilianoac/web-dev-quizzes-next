import prisma from "@/lib/prisma";
import AreaForm from "@/components/admin/area/AreaForm";
import BreadCrumb from "@/components/AppBreadCrumb";

interface EditAreaPageProps {
  params: {
    slug: string;
  }
}

export default async function EditAreaPage({ params }: EditAreaPageProps) {

  const area = await prisma.area.findUnique({where: {slug: params.slug}});

  if (!area) {
    return <div>Area no encontrada</div>
  }

  const breadcrumb = [
    { name: "Areas", url: "/admin/areas"}, 
    { name: "Editar", url: "/admin/areas/editar"},
  ]

  return (
    <div>
      <BreadCrumb sections={breadcrumb} />
      <AreaForm area={area} mode="edit"/>
    </div>
  )
}
