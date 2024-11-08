import TechnologiesGrid from "@/components/home/TechnologiesGrid";
import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import appMetaData from "../constants/metaData";

export const metadata: Metadata = {
  title: `Web Dev Quizzes - Pon a prueba tus conocimientos de desarrollo web`,
  description: appMetaData.inicio.description,
}

export default async function Home() {
  const areas = await prisma.area.findMany({
    where: {
      technologies: {
        some: {
          quiz: {
            some: { 
              isPublic: true
            }
          }
        }
      }
    },
    include: {
      technologies: {
        where: {
          quiz: {
            some: {
              isPublic: true
            }
          }
        },
        include: {
          quiz: {
            where: {
              isPublic: true
            }
          }
        }
      }
    }
  });

  return (
    <TechnologiesGrid areas={areas} />
  );
}
