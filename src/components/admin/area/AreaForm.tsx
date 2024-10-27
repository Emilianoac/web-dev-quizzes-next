"use client";

import { useState } from "react";
import { addArea } from "@/lib/actions/areaActions";
import { useRouter } from "next/navigation";
import AppButton from "@/components/AppButton";
import AppLoader from "@/components/AppLoader";
import AppAlert from "@/components/AppAlert";

export default function CategoryForm() {
  const [form, setForm] = useState({ name: ""});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ text: "", status: false});

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData();
    data.append("name", form.name);

    try {
      setIsLoading(true);
      await addArea(data);

      setError({ text: "", status: false });
      router.push("/admin/areas");

    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        setError({ text: error.message, status: true });
      } else {
        setError({ text: "An unknown error occurred", status: true });
      }
    }
  }

  return (
    <>
      { error.status && <AppAlert text={error.text} type="error"/> }
      <form onSubmit={(e) => handleSubmit(e)} >
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-bold mb-2">
            Nombre
          </label>
          <input
            type="text"
            placeholder="Ej: Frontend"
            name="title"
            id="title"
            className="p-2"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
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
            text="Crear Area"
          />
        </div>
      </form>
      <AppLoader isLoading={isLoading}/>
    </>
  );
}
