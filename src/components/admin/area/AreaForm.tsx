"use client";

import { useState } from "react";
import { Area } from "@prisma/client";
import { addArea, editArea, deleteArea } from "@/lib/actions/areaActions";
import { useRouter } from "next/navigation";
import { areaSchema, type AreaErrorSchema, type AreaSchema } from "@/schemas/areaSchema";
import AppButton from "@/components/AppButton";
import AppLoader from "@/components/AppLoader";
import AppAlert from "@/components/AppAlert";

interface AreaFormProps {
  area?: Area;
  mode: "add" | "edit"
}

export default function AreaForm({ area }: AreaFormProps) {
  const [form, setForm] = useState<AreaSchema>({name: area?.name ?? ""});
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<AreaErrorSchema | undefined>(undefined);
  const [fetchError, setFetchError] = useState({
    text: "",
    status: false,
  });

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validateFormData(form)) return;

    const data = new FormData();
    data.append("name", form.name);

    try {
      setIsLoading(true);

      if (area) {
        await editArea(data, area.id);
      } else {
        await addArea(data);
      }

      setFetchError({ text: "", status: false });
      router.push("/admin/areas");

    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        setFetchError({ text: error.message, status: true });
      } else {
        setFetchError({ text: "Ocurrió un error, intente nuevamente", status: true });
      }
    }
  }

  async function handleDelete() {
    if (!area) return;
    try {
      await deleteArea(area.id);

      router.push("/admin/areas");

    } catch (error) {
      if (error instanceof Error) {
        setFetchError({ text: error.message, status: true });
      } else {
        setFetchError({ text: "Ocurrió un error, intente nuevamente", status: true });
      }
    }
  }

  function validateFormData(data: AreaSchema) {
    const validSchema = areaSchema.safeParse(data);

    if (!validSchema.success)  {
      setFormError(validSchema.error.format());
      return false;
    } else {
      setFormError(undefined);
      return true;
    }
  }

  return (
    <>
      { fetchError.status && <AppAlert text={fetchError.text} type="error"/> }
      <form onSubmit={(e) => handleSubmit(e)} >
      {area && 
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold mb-5">Editar Area</h1>
          <AppButton  
            buttonType="button" 
            className="bg-red-500 hover:bg-red-700 text-sm"
            text="Eliminar Area"
            onClickAction={() => handleDelete()}
          /> 
        </div>
        }
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-bold mb-2">
            Nombre
          </label>
          <input
            type="text"
            placeholder="Ej: Frontend"
            name="title"
            id="title"
            defaultValue={form.name}
            className={`p-2 ${formError?.name && "!border-red-500"}`}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {formError?.name && 
            formError.name._errors.map((error, index) => (
              <p key={index} className="text-red-500 text-xs italic">{error}</p>
            ))
          }
        </div>
        <div className="flex justify-end gap-3">
          <AppButton
            buttonType="link"
            className="bg-slate-500 hover:bg-slate-700"
            text="Cancelar"
            url="/admin/areas"
          />
          <AppButton
            buttonType="button"
            text={area ? "Editar Area" : "Añadir Area"}
          />
        </div>
      </form>
      <AppLoader isLoading={isLoading}/>
    </>
  );
}
