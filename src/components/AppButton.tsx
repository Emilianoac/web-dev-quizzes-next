import Link from "next/link";
import { FormEvent } from "react";


interface AppButtonPropss {
  text: string;
  onClickAction?: (() => void) | ((e: FormEvent) => void);
  className?: string;
  buttonType?: "button" | "link"; 
  url?: string;
  disabled?: boolean;
}

export default function AppButton({ text, onClickAction, buttonType = "button", url, className, disabled }: AppButtonPropss) {
  return (
    buttonType === "button" ? (
      <button 
        className={`
          ${className}
          bg-primary-500 text-white font-semibold
          py-2 px-4 rounded-md
          hover:bg-primary-700
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-500
          transition-colors duration-300 ease-in-out`}
        onClick={onClickAction}
        disabled={disabled}
      >
        {text}
      </button>
    ) : (
      <Link
        className={`
          ${className}
          bg-primary-500 text-white font-semibold
          py-2 px-4 rounded-md
          hover:bg-primary-700
          transition-colors duration-300 ease-in-out`}
       href={url ?? '/'}
      >
        {text}
      </Link>
    )
  );
}
