import SectionsHeader from "@/components/admin/AdminSectionHeader";
import AppLinkButton from "@/components/AppLinkButton";
import prisma from "@/lib/prisma";
import { FaEdit } from "react-icons/fa";
import type { Metadata } from "next";
import appMetaData from "@/constants/metaData";

export const metadata: Metadata = {
  title: `${appMetaData.areas.title}`,
}

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
        {/* Tabla Header */}
        <div className="app-tabla__header hidden md:grid grid-cols-[1.2fr_1fr_1fr_120px] p-4">
          <p className="font-semibold">Nombre</p>
          <p className="font-semibold">Tecnologías</p>
          <p className="font-semibold">Quizzes</p>
          <p className="fott-semibold">Acciones</p>
        </div>
        {/* Tabla Body */}
        <div className="app-tabla__body mt-2">
          {areas.map((area) => (
            <div 
              className="
                app-tabla__row grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_120px] items-center
                bg-white 
                dark:bg-blue-gray
                shadow-sm rounded-md p-4 gap-2 mt-3" 
              key={area.id}>
                <p> 
                  <span className="inline-block md:hidden font-bold me-2">Nombre:</span>  
                  {area.name}
                </p>
                <p>
                  <span className="inline-block md:hidden font-bold me-2">Tecnologías:</span>
                  {area.technologies.length}
                </p>
                <p>
                  <span className="inline-block md:hidden font-bold me-2">Quizzes:</span>
                  {area.technologies.reduce((acc, tech) => acc + tech.quiz.length, 0)}
                </p>
                <div className="flex gap-3 justify-end md:justify-start">
                  <AppLinkButton
                    className="text-xs !bg-blue-500 hover:bg-blue-700"
                    href={`/admin/areas/editar/${area.slug}`}
                  >
                    <FaEdit title="Editar"/>
                  </AppLinkButton>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
