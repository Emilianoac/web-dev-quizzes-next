import TechnologiesGrid from "@/components/home/TechnologiesGrid";
import prisma  from "@/lib/prisma";

export default async function Home() {
  const areas = await prisma.area.findMany({
    where: {
      technologies: {
        some: {
          quiz: {
            some: {}
          }
        }
      }
    },
    include: {
      technologies: {
        include: {
          quiz: true
        }
      }
    }
  });
  

  return (
    <TechnologiesGrid areas={areas} />
  );
}
