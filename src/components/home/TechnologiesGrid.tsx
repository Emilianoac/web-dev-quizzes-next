"use client";

import TechnologyCard from "@/components/cards/TechnologyCard";
import { Area, Technology, Quiz } from "@prisma/client";
import { useState, useEffect } from "react";

interface TechnologyGridProps {
  areas: (Area & {
    technologies: (Technology & {
      quiz: Quiz[];
    })[];
  })[];
}

export default function TechnologiesGrid({ areas }: TechnologyGridProps) {

  const [currentArea, setCurrentArea] = useState("todos");
  const [filteredAreas, setFilteredAreas] = useState(areas);

  useEffect(() => {
    if (currentArea === "todos") {
      setFilteredAreas(areas);
    } else {
      const filtered = areas.filter((area) => area.name === currentArea);
      setFilteredAreas(filtered);
    }
  }, [currentArea, areas]);

  const quizCount = areas.reduce((areaAcc, area) => {
    return areaAcc + area.technologies.reduce((techAcc, technology) => {
      return techAcc + technology.quiz.length;
    }, 0);
  }, 0);

  return (
    <div>
      {/* Filtros */}
      <ul className="flex gap-2 mb-4 flex-wrap">
        <li>
          <button 
            className={`
              py-2 px-4 text-[0.8em] md:text-sm 
              bg-slate-200 dark:bg-slate-800
              rounded-md
              ${currentArea === "todos" && "!bg-primary-500 !text-white font-bold"}`
            } 
            onClick={() => setCurrentArea("todos")}>
              Todos
          </button>
        </li>
        {
          areas.map((area) => (
            <li key={area.id}>
              <button 
                className={`
                  py-2 px-4 text-[0.8em] md:text-sm 
                  bg-slate-200 dark:bg-slate-800
                  rounded-md
                  ${currentArea === area.name && "!bg-primary-500 !text-white font-bold"}`
                }
                onClick={() => setCurrentArea(area.name)}>
                  {area.name}
              </button>
            </li>
          ))
        }
      </ul>

      {/* Contador de quizzes */}
      <p className="text-sm text-end mb-3 mt-6">
        <strong>{quizCount}</strong> quizzes disponibles
      </p>

       {/* Grid de tecnologias */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
        {filteredAreas.map((area) =>
          area.technologies.map((technology) => (
            <TechnologyCard
              key={technology.slug}
              data={{
                title: technology.name,
                area: area.name,
                id: technology.id,
                slug: technology.slug,
                icon: technology.icon,
                quizzes: technology.quiz.length,
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
