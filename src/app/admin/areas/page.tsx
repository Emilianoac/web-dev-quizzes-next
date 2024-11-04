import SectionsHeader from "@/components/admin/AdminSectionHeader";
import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import appMetaData from "@/constants/metaData";
import AreaTable from "@/components/admin/area/AreaTable";

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
      <AreaTable areas={areas} />
    </div>
  )
}
