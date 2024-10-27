import CategoryForm from "@/components/admin/area/AreaForm";
import BreadCrumb from "@/components/AppBreadCrumb";

export default async function CreateCategoryPage() {

  const breadcrumb = [
    { name: "Areas", url: "/admin/areas"}, 
    { name: "Crear", url: "/admin/areas/crear"}
  ]

  return (
    <div>
    <BreadCrumb sections={breadcrumb} />
     <h1 className="text-2xl font-bold mb-4">Crear Area</h1>
     <CategoryForm/> 
    </div>
  )
}
