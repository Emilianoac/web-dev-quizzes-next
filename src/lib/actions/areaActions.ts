"use server";

import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import slugify from "slugify";
import { areaSchema } from "@/schemas/areaSchema";
import { revalidatePath } from "next/cache";

export async function addArea(data: FormData) {
    
  try {
    if (!validateData(data)) throw new Error("Error al validar los datos, intente nuevamente");
  
    const name = data.get("name") as string;
    const slug = slugify(name, { strict: true, lower: true });
    await prisma.area.create({ data: { name: name, slug: slug } });

  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        throw new Error("El nombre del área ya existe");
      }
    }
    throw e
  }

  revalidatePath("/admin");
};

export async function editArea(data: FormData, id: string) {
  try {
    if (!validateData(data)) throw new Error("Error al validar los datos, intente nuevamente");

    const name = data.get("name") as string;
    const newSlug = slugify(name, { strict: true, lower: true });
    await prisma.area.update({ where: { id: id }, data: { name: name, slug: newSlug } });

  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        throw new Error("El nombre del área ya existe");
      }
    }
    throw e
  }

  revalidatePath("/admin");
};

export async function deleteArea(id: string) {
  await prisma.area.delete({ where: { id: id } });
  revalidatePath("/admin");
};

function validateData(data: FormData) {
  const name = data.get("name") as string;

  const formData = {
    name: name,
  }

  const validSchema = areaSchema.safeParse(formData);

  if (!validSchema.success)  {
    return false
  } else {
    return true
  }
}