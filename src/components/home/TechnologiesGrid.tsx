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
  const [quizCount, setQuizCount] = useState(0);

  useEffect(() => {
    if (currentArea === "todos") {
      setFilteredAreas(areas);

      const count = calculateQuizCount(areas);
      setQuizCount(count);
    } else {
      const filtered = areas.filter((area) => area.name === currentArea);
      setFilteredAreas(filtered);

      const count = calculateQuizCount(filtered);

      setQuizCount(count);
    }
  }, [currentArea, areas]);

  function calculateQuizCount( areas: (Area & { technologies: (Technology & { quiz: Quiz[] })[] })[] ) {
    const count = areas.reduce((areaAcc, area) => {
      return areaAcc + area.technologies.reduce((techAcc, technology) => {
        return techAcc + technology.quiz.length;
      }, 0);
    }, 0);
  
    return count;
  }

  return (
    <div>
      {/* Filtros */}
      <ul className="flex gap-2 mb-4 overflow-x-auto pb-3 md:pb-0">
        <li>
          <button 
            className={`
              py-2 px-4 text-[0.8em] md:text-sm 
              bg-slate-200 dark:bg-slate-800
              rounded-md whitespace-nowrap
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
                  rounded-md whitespace-nowrap
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
        {quizCount > 1 ? "Quizzes" : "Quiz"}: <strong>{quizCount}</strong>
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
