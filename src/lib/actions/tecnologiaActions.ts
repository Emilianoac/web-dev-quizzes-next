"use server";

import { Prisma } from "@prisma/client";
import slugify from "slugify";
import prisma from "@/lib/prisma";
import FirebaseStorageService from "@/lib/firebase/firebaseStorageService";
import { revalidatePath } from "next/cache";

export async function getTechnologies() {
  return await prisma.technology.findMany();
};

export async function addTechnology(data: FormData) {

  const name = data.get("name") as string;
  const area = data.get("area") as string;
  const description = data.get("description") as string;
  const slug = slugify(name, { strict: true, lower: true });
  const iconFile = data.get("icon") as Blob;
  
  try {
    const storageService = new FirebaseStorageService();
    const icon = await storageService.uploadFile({ file: iconFile, basepath: "technologies", name: slug });

    await prisma.technology.create({ 
      data: { 
        name: name, 
        areaId: area ,  
        icon: icon.url,
        iconName: icon.name,
        description: description,
        slug: slug  
      } 
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        throw new Error("El nombre de la tecnología ya existe");
      }
    }
    throw e
  }

  revalidatePath("/admin/tecnologias");
};

export async function updateTechnology(data: FormData) {
  const id = data.get("id") as string;
  const name = data.get("name") as string;
  const slug = slugify(name, { strict: true, lower: true });
  const area = data.get("area") as string;
  const description = data.get("description") as string;
  const iconFile = data.get("icon") as Blob | string;

  try {
    if (iconFile instanceof Blob) {
      const storageService = new FirebaseStorageService();
      const icon = await storageService.uploadFile({ file: iconFile, basepath: "technologies", name: id });
  
      await prisma.technology.update({
        where: { id: id },
        data: {
          name: name,
          slug: slug,
          areaId: area,
          icon: icon.url,
          iconName: icon.name,
          description: description
        }
      });
    } else {

      await prisma.technology.update({
        where: { id: id },
        data: {
          name: name,
          slug: slug,
          areaId: area,
          description: description
        }
      });
    }

  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error("Error al actualizar la tecnología, intente nuevamente");
    }
    throw e
  }

  revalidatePath("/admin/tecnologias");
};