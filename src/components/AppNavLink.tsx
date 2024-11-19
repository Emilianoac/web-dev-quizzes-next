"use client";

import {usePathname} from "next/navigation";
import Link from "next/link";

interface MenuItem  extends React.HTMLProps<HTMLAnchorElement> {
  title?: string;
  link?: string;
  children?: React.ReactNode;
}

export default function Navlink({className,link, title, children, ...props}: MenuItem) {
  const pathname = usePathname();

  return (
    <Link 
      href={"#"} 
      className={ 
        `
        ${className || ""}
        ${pathname == link ? "!text-secondary-500 font-semibold dark:!text-primary-500" : "text-slate-700 dark:text-white"}  
        py-2 block
        `
      }
      {...props}
      >
      {children || title}
    </Link>
  )
}
