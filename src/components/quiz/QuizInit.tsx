
"use client";

import Image from "next/image";
import AppButton from "@/components/AppButton";
import type { Quiz, Technology, } from "@prisma/client";
import QuizLevelBadge from "../cards/QuizLevelBadge";

interface QuizInitProps {
  setStart: (value: boolean) => void;
  quiz: Quiz & {
    technology: Technology;
  }
}

type Level = "basico" | "intermedio" | "avanzado";


export default function QuizInit({ quiz, setStart }: QuizInitProps) {
  return (
    <div className="h-full md:h-[calc(100vh-150px)] flex items-center justify-center">
      <div 
        className="
          relative
          max-h-[80vh] overflow-y-auto
          max-w-[400px] w-full:
          bg-white dark:bg-blue-gray 
          rounded-lg shadow-md"
        >
          <div className="p-6">
            {/* Nivel del quiz */}
            <QuizLevelBadge 
              level={quiz.level as Level } 
              className="mb-4 block mx-auto w-max"
            />

            {/* Icono de la tecnologia */}
            <div className="
              bg-slate-200 
              flex items-center justify-center 
              w-[90px] h-[90px] 
              rounded-full
              mx-auto">
              <Image 
                className="h-[60px] w-[60px] object-scale-down p-1"
                src={quiz.technology.icon} 
                alt={quiz.technology.name} 
                width={70} 
                height={70} 
              />
            </div>

            {/* Tecnologia */}
            <p className="text-sm md:text-base text-center mt-4">{quiz.technology.name}</p>

            {/* Titulo */}
            <h1 className="text-xl md:text-xl font-bold text-center mt-1">{quiz.title}</h1>

            {/* Descripcion */}
            <p className="text-[0.93em]  text-center mt-2 opacity-65">{quiz.description}</p>

          </div>
          {/* Boton de inicio */}
          <div className="
            sticky bottom-0 
            bg-white dark:bg-blue-gray 
            border-t border-t-slate-100 dark:border-t-slate-800 
            px-6 py-3">
            <AppButton
              className="text-sm: md:text-base w-full"
              onClick={() => setStart(true)}>
              Comenzar Quiz
            </AppButton>
          </div>
      </div>
  </div>
  )
}
