"use client"

import { useTheme } from "next-themes";
import { DarkModeIcon } from "./icons/DarkMode";
import { LightModeIcon } from "./icons/LightMode";


export default function AppDarkModeToggle() {
  const { setTheme, theme} = useTheme();

  function toggleTheme() {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  return (
    <button 
      onClick={() => toggleTheme()}
      title="Cambiar tema"
      className="
      rounded-full flex items-center justify-center
      transition-colors duration-200 ease-in-out
      bg-slate-200 dark:bg-slate-950 
      hover:bg-slate-300 dark:hover:bg-blue-gray
      h-[30px] w-[30px]">
      {theme === "dark" ? <DarkModeIcon/> : <LightModeIcon/>}
    </button>
  )
}
