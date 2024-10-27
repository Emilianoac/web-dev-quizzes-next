"use server";

import slugify from "slugify";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function addArea(data: FormData) {
  const name = data.get("name") as string;

  if (!name) throw new Error("El nombre del área es requerido");
  const slug = slugify(name, { strict: true, lower: true });

  try {
    await prisma.area.create({ 
      data: { name: name, slug: slug } 
    });
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