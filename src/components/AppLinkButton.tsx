import Link from "next/link"

interface AppLinkButtonProps extends React.HTMLProps<HTMLAnchorElement> {
  children?: React.ReactNode;
}

export default function AppLinkButton({ className, children, ...props }: AppLinkButtonProps) {
  return (
    <Link
      className={`
        bg-primary-500 text-white font-semibold
        py-2 px-4 rounded-md
        hover:bg-primary-700
        transition-colors duration-300 ease-in-out
        ${className || ""}
      `}
      href={"#"}
      {...props}
    >
      {children}
    </Link>
  )
}
