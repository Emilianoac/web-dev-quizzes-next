
"use client";

import Image from "next/image";
import AppButton from "@/components/AppButton";
import type { Quiz, Technology } from "@prisma/client";

interface QuizInitProps {
  setStart: (value: boolean) => void;
  quiz: Quiz & {
    technology: Technology;
  }
}

export default function QuizInit({ quiz, setStart }: QuizInitProps) {
  return (
    <div className="h-[70vh] flex items-center justify-center">
    <div className="flex flex-col items-center">
      <div className="bg-slate-200 flex items-center justify-center w-[120px] h-[120px] rounded-full">
        <Image 
          className="h-[70px] w-[70px] object-scale-down p-1"
          src={quiz.technology.icon} 
          alt={quiz.technology.name} 
          width={80} 
          height={80} 
        />
      </div>
      <p className="text-xl text-center mt-6">{quiz.technology.name}</p>
      <h1 className="text-2xl mdtext-3xl font-bold text-center mt-2">{quiz.title}</h1>
      <AppButton
        className="mt-6"
        buttonType="button"
        text="Comenzar Quiz"
        onClickAction={() => setStart(true)}
      />
    </div>
  </div>
  )
}
