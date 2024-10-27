"use client";

import {usePathname} from "next/navigation";
import Link from "next/link";

interface MenuItem {
  title: string;
  link: string;
}

export default function Navlink({link, title}: MenuItem) {
  const pathname = usePathname();

  return (
    <Link 
      href={link} 
      className={ `${pathname == link ? "text-secondary-500 font-semibold" : "text-slate-700"}  py-2 block`}>
      {title}
    </Link>
  )
}
