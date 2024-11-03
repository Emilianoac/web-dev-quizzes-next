
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
    <div className="h-[70vh] flex items-center justify-center">
    <div className="flex flex-col items-center">
      <QuizLevelBadge level={quiz.level as Level } className="mb-4"/>
      <div className="bg-slate-200 flex items-center justify-center w-[120px] h-[120px] rounded-full">
        <Image 
          className="h-[70px] w-[70px] object-scale-down p-1"
          src={quiz.technology.icon} 
          alt={quiz.technology.name} 
          width={80} 
          height={80} 
        />
      </div>
      <p className=" text-base md:text-xl text-center mt-6">{quiz.technology.name}</p>
      <h1 className="text-xl md:text-2xl font-bold text-center mt-2">{quiz.title}</h1>
      <AppButton
        className="mt-6 text-sm: md:text-base"
        onClick={() => setStart(true)}
      >
        Comenzar Quiz
      </AppButton>
    </div>
  </div>
  )
}
