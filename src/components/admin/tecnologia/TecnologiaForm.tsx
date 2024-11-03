"use client";

import { useState } from "react";
import Image from "next/image";
import { Area, Technology } from "@prisma/client";
import { addTechnology, updateTechnology } from "@/lib/actions/tecnologiaActions";
import { useRouter } from "next/navigation";
import AppButton from "@/components/AppButton";
import AppLoader from "@/components/AppLoader";

interface TechnologyForm {
  areas: Area[];
  technologyData?: Technology;
}

export default function TecnologiaForm({ areas, technologyData }: TechnologyForm) {
  const [form, setForm] = useState({
    name: technologyData?.name ?? "", 
    description: technologyData?.description ?? "",
    area: technologyData?.areaId ?? "",
    icon: technologyData?.icon ?? undefined as undefined | File | string,
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();

    const data = createFormData();

    try {
      if (technologyData) {
        data.append("id", technologyData.id);
        updateTechnology(data);
      } else {
        await addTechnology(data);
      }

      router.push("/admin/tecnologias");
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  };

  function createFormData() {
    const data = new FormData();
    data.append("name", form.name);
    data.append("area", form.area);
    data.append("description", form.description);
    if (form.icon instanceof File) {
      data.append("icon", form.icon!);
    } else {
      data.append("icon", form.icon as string);
    }

    return data;
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} >

        {/* Nombre */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-bold mb-2">
            Nombre
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="p-2"
            defaultValue={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-bold mb-2">
            Descripción
          </label>
          <textarea
            name="description"
            id="description"
            className="p-2"
            defaultValue={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          ></textarea>
        </div>

        {/* area */}
        <div className="mb-4">
          <label htmlFor="area" className="block text-sm font-bold mb-2">
            Area
          </label>
          <select
            name="area"
            id="area"
            className="p-2"
            defaultValue={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
          >
            <option value="" disabled selected>Selecciona un area</option>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </select>
        </div>

        {/* Icono */}
        <div className="mb-4">
          <label htmlFor="icon" className="block text-sm font-bold mb-2">
            Icono
          </label>
          <div className="
            flex justify-center items-center 
            border-2 rounded-md overflow-hidden 
            border-dotted border-blue-500 
            h-[90px] w-[90px] relative">
            { form.icon ?
              <div className="bg-slate-100 w-full h-full flex justify-center items-center">
                <span 
                  title="Eliminar icono"
                  onClick={() => setForm({ ...form, icon: undefined })}
                  className="
                    absolute top-1 right-1 
                    bg-red-500 rounded-full 
                    flex justify-center items-center 
                    w-[15px] h-[15px] p-1 text-[0.6em] font-bold cursor-pointer">
                    X
                </span>
                <Image
                  src={form.icon && form.icon instanceof File ? URL.createObjectURL(form.icon) :  form.icon as string}
                  alt="icon"
                  width={60}
                  height={60}
                  className="w-[60px] [60px] object-scale-down"
                />
              </div>
              :
              <>
                <label 
                  htmlFor="icon" 
                  title="Seleccionar icono"
                  className="
                  font-black text-6xl 
                  hover:opacity-80
                  block w-full h-full cursor-pointer text-center">
                  +
                </label>
                <input
                  type="file"
                  hidden
                  name="icon"
                  id="icon"
                  className="p-2"
                  onInput={(e) => setForm({ ...form, icon: (e.target as HTMLInputElement).files?.[0] })}
                />
            </>
            }
          </div>
        </div>


        {/* Botones */}
        <div className="flex justify-end gap-2">
          <AppButton
            buttonType="link"
            text="Cancelar"
            className="bg-slate-500 hover:bg-slate-700"
            url="/admin/tecnologias"
          />
          <AppButton
            buttonType="button"
            text={technologyData ? "Actualizar" : "Añadir"}
          />
        </div>
      </form>
      <AppLoader isLoading={isLoading}/>
    </>
  );
}
