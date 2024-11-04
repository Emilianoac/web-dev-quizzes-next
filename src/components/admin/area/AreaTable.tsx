
"use client";

import { deleteArea } from "@/lib/actions/areaActions";
import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Area, Technology, Quiz} from "@prisma/client";
import AppLinkButton from "@/components/AppLinkButton";
import AppButton from "@/components/AppButton";
import AppLoader from "@/components/AppLoader";

interface AreaTableProps {
  areas: (Area & {
    technologies: (Technology & {
      quiz: Quiz[]
    })[]
  })[]
}

export default function AreaTable({ areas }: AreaTableProps) {
  const [loading, setLoading] = useState(false);

  async function handleDeleteArea(id: string) {
    const isConfirmed = confirm("¿Estás seguro de eliminar esta área?");
    if (!isConfirmed) return;

    try {
      setLoading(true);
      await deleteArea(id);
    } catch {
      alert("No se pudo eliminar el área");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
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
                <p className="text-sm md:text-base"> 
                  <span className="inline-block md:hidden font-bold me-2">Nombre:</span>  
                  {area.name}
                </p>
                <p className="text-sm md:text-base">
                  <span className="inline-block md:hidden font-bold me-2">Tecnologías:</span>
                  {area.technologies.length}
                </p>
                <p className="text-sm md:text-base">
                  <span className="inline-block md:hidden font-bold me-2">Quizzes:</span>
                  {area.technologies.reduce((acc, tech) => acc + tech.quiz.length, 0)}
                </p>
                <div className="flex gap-3 justify-end md:justify-start">
                  <AppLinkButton
                    title="Editar"
                    className="text-xs !bg-blue-500 hover:bg-blue-700"
                    href={`/admin/areas/editar/${area.slug}`}
                  >
                    <FaEdit title="Editar"/>
                  </AppLinkButton>
                  <AppButton
                    onClick={() => handleDeleteArea(area.id)}
                    title="Eliminar"
                    className="text-xs bg-gray-500 hover:bg-gray-700"
                  >
                    <FaTrashAlt/>
                  </AppButton>
                </div>
            </div>
          ))}
        </div>
      </div>
      {loading && <AppLoader isLoading={loading} />} 
    </>
  )
}
