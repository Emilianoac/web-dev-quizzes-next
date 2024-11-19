"use client"

import  {setFavoritesCookie} from "@/lib/actions/quizActions";
import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

interface BtnFavoritesProps extends React.HTMLProps<HTMLButtonElement> {
  quizId: string;
  isFavorite: boolean;
}

export default function BtnFavorites({isFavorite, quizId, className }: BtnFavoritesProps) {
  const [favorite, setFavorite] = useState(isFavorite || false);

  async function handleFavorite() {
    if (!quizId) return;

    await setFavoritesCookie(quizId);
    setFavorite(!favorite);
  }
  
  return (
    <button 
      className={
        `${className || ""}
        flex justify-end items-center gap-2 
        rounded-full p-1 z-20
        dark:bg-slate-700 bg-slate-100 text-yellow-500  `
      }
      onClick={() => handleFavorite()}
      >
      {favorite ? <FaStar/> : <FaRegStar />}
    </button>
  )
}
