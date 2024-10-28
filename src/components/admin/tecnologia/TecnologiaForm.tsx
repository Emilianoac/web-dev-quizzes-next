"use client";

import { useState } from "react";
import { Area } from "@prisma/client";
import { addTechnology } from "@/lib/actions/tecnologiaActions";
import { useRouter } from "next/navigation";
import AppButton from "@/components/AppButton";
import AppLoader from "@/components/AppLoader";

interface TechnologyForm {
  areas: Area[];
}

export default function TecnologiaForm({ areas }: TechnologyForm) {
  const [form, setForm] = useState({
    name: "",
    area: "",
    icon: undefined as undefined | File,
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    const data = new FormData();
    data.append("name", form.name);
    data.append("area", form.area);
    data.append("icon", form.icon!);

    try {
      await addTechnology(data);
      router.push("/admin/tecnologias");
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} >
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-bold mb-2">
            Nombre
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="p-2"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-bold mb-2">
            Categoría
          </label>
          <select
            name="category"
            id="category"
            className="p-2"
            onChange={(e) => setForm({ ...form, area: e.target.value })}
          >
            <option value="" disabled selected>Selecciona una categoría</option>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="icon" className="block text-sm font-bold mb-2">
            Icono
          </label>
          <input
            type="file"
            name="icon"
            id="icon"
            className="p-2"
            onInput={(e) => setForm({ ...form, icon: (e.target as HTMLInputElement).files?.[0] })}
          />
        </div>
        <div className="flex justify-end gap-2">
          <AppButton
            buttonType="link"
            text="Cancelar"
            className="bg-slate-500 hover:bg-slate-700"
            url="/admin/tecnologias"
          />
          <AppButton
            buttonType="button"
            text="Crear Tecnología"
          />
        </div>
      </form>
      <AppLoader isLoading={isLoading}/>
    </>
  );
}
