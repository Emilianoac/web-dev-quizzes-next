import AreaForm from "@/components/admin/area/AreaForm";
import BreadCrumb from "@/components/AppBreadCrumb";

export default async function CreateCategoryPage() {

  const breadcrumb = [
    { name: "Areas", url: "/admin/areas"}, 
    { name: "Añadir", url: "/admin/areas/Añadir"}
  ]

  return (
    <div>
    <BreadCrumb sections={breadcrumb} />
     <h1 className="text-2xl font-bold mb-4">Añadir Area</h1>
     <AreaForm mode="add"/> 
    </div>
  )
}
