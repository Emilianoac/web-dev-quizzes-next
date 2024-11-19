
"use client";

import { useState } from "react";
import Image from "next/image";
import type { Quiz, Technology, } from "@prisma/client";
import QuizLevelBadge from "@/components/cards/QuizLevelBadge";
import AppCheckboxToggle from "@/components/AppCheckboxToggle";
import AppButton from "@/components/AppButton";
import ButtonAddToFavorite from "./ButtonAddToFavorite";


interface SetStartProps {
  status: boolean;
  config: {
    hideOptions: boolean;
  }
}

interface QuizInitProps {
  setStart: (value: SetStartProps) => void;
  quiz: Quiz & {
    technology: Technology;
  };
  isFavorite: boolean;
}

type Level = "basico" | "intermedio" | "avanzado";


export default function QuizInit({ quiz, setStart, isFavorite }: QuizInitProps) {

  const [config, setConfig] = useState({
    hideOptions: false
  })

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
            <ButtonAddToFavorite isFavorite={isFavorite} quizId={quiz.id} className="absolute right-3 top-3" />

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
 
            <hr className="my-6 dark:border-t-slate-700 border-t-slate-200" />

            {/* Opciones */}
            <div className="mb-5">
              <AppCheckboxToggle
                onChange={(e) => setConfig({ hideOptions: e.target.checked })}
                defaultChecked={config.hideOptions} 
              >
                Ocultar alternativas inicialmente
              </AppCheckboxToggle>
              <p className="text-[0.83em] mt-1 opacity-60">
              Las alternativas estarán ocultas para que reflexiones 
              sobre la respuesta antes de verlas. Este modo está pensado para 
              ejercitar tu memoria y potenciar el aprendizaje.
              </p>
            </div>

          </div>
          {/* Boton de inicio */}
          <div className="
            sticky bottom-0 
            bg-white dark:bg-blue-gray 
            border-t border-t-slate-100 dark:border-t-slate-800 
            px-6 py-3">
            <AppButton
              className="text-sm: md:text-base w-full"
              onClick={() => setStart({status: true, config: {hideOptions: config.hideOptions }})}>
              Comenzar Quiz
            </AppButton>
          </div>
      </div>
  </div>
  )
}
