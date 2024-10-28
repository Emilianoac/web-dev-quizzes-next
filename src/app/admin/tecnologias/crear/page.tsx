import TecnologiaForm from "@/components/admin/tecnologia/TecnologiaForm";
import prisma from "@/lib/prisma";
import BreadCrumb from "@/components/AppBreadCrumb";

export default async function page() {

  const areas = await prisma.area.findMany();

  const breadcrumb = [
    {
      name: "Tecnologías",
      url: "/admin/tecnologias"
    }, 
    {
      name: "Crear",
      url: "/admin/tecnologias/crear"
    }
  ];

  return (
    <div>
      <BreadCrumb sections={breadcrumb} />
      <TecnologiaForm areas={areas} />
    </div>
  )
}
