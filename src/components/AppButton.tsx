
"use client";

interface AppButtonPropss extends React.HTMLProps<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function AppButton({children, className, ...props }: AppButtonPropss) {
  return (
    <button 
      type="button"
      className={`
        ${className}
        bg-primary-500 text-white font-semibold
        py-2 px-4 rounded-md
        hover:bg-primary-700
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-500
        transition-colors duration-300 ease-in-out`}
        {...props}
    >
      {children}
    </button>
  );
}
