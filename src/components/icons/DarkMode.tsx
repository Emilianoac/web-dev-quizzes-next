import { SVGProps } from "react";

interface CustomIconProps {
  className?: string;
  props?: SVGProps<SVGSVGElement>;
}

export function DarkModeIcon({ className, props }: CustomIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      className={className ?? ""}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.39 5.39 0 0 1-4.4 2.26a5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1"
      />
    </svg>
  );
}
