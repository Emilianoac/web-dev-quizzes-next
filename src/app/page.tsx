import TechnologiesGrid from "@/components/home/TechnologiesGrid";
import prisma from "@/lib/prisma";

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
