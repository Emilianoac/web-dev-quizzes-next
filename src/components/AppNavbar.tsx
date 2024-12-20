
import Link from "next/link";
import AppLogo from "./AppLogo";
import AppDarkModeToggle from "./AppDarkModeToggle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import UserDropdown from "./UserDropdown";
import { FaStar, FaHome } from "react-icons/fa";
import AppNavLink from "./AppNavLink";


export default async function AppNavbar() {
  const session = await getServerSession(authOptions);

  const mobileMenu = [
    { name: "Inicio", href: "/", icon: FaHome},
    { name: "Favoritos", href: "/favoritos", icon: FaStar },
  ]

  return (
    <>
      <nav className="
        bg-white 
        dark:bg-slate-900 dark:shadow-lg
        w-full py-4 shadow-sm sticky top-0 z-[999]">
        <div className="container">
          <div className="flex justify-between items-center">
            <Link href="/">
              <AppLogo className="w-[160px] md:w-[200px]"/>
            </Link>
            <div className="flex gap-5 items-center">
              <AppNavLink
                href="/favoritos"
                link="/favoritos"
                className="
                  hidden md:block text-[0.9rem]
                "
              >  
              Mis Favoritos
              </AppNavLink> 
              <AppDarkModeToggle />
              {session && 
                <UserDropdown
                  image={ session?.user?.image as string} 
                  email={session?.user?.email as string}
                />
              }
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <nav 
        className="
          block md:hidden
          fixed w-full bottom-0 z-[999] py-1
          dark:bg-slate-900 bg-white
          border-t dark:border-slate-800/70 border-slate-200
          "
        >
        <div className="container">
          <ul className="grid grid-cols-2">
            {
              mobileMenu.map((item, index) => (
                <li 
                  className="
                    [&:nth-child(1n)]:justify-self-center
                    [&:nth-child(2n)]:justify-self-center
                  "
                  key={index}>
                  <AppNavLink
                    className="
                      text-slate-700 text-sm dark:text-white
                      hover:text-white dark:hover:text-slate-700
                      flex flex-col items-center justify-center
                    "
                    link={item.href}
                    href={item.href}
                    >
                    <item.icon className="w-4 h-4" />
                    <span className="dark:text-white text-slate-700 mt-1">{item.name}</span>
                  </AppNavLink>
                </li>
              ))
            }
          </ul>
        </div>
      </nav>
    </>       
  )
}
