import TechnologiesGrid from "@/components/home/TechnologiesGrid";
import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import appMetaData from "../constants/metaData";

export const metadata: Metadata = {
  title: `${appMetaData.inicio.title} - Web Dev Quizzes`,
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
