
import Link from "next/link";
import AppLogo from "./AppLogo";
import AppDarkModeToggle from "./AppDarkModeToggle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import UserDropdown from "./UserDropdown";
import AppLinkButton from "./AppLinkButton";

export default async function AppNavbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="
      bg-white 
      dark:bg-slate-900 dark:shadow-lg
      w-full py-4 shadow-sm sticky top-0 z-[999]">
      <div className="container">
        <div className="flex justify-between items-center">
          <Link href="/">
            <AppLogo className="w-[160px] md:w-[200px]"/>
          </Link>
          <div className="flex gap-1 items-center">
            <AppLinkButton
              href="/favoritos"
              className="
                hidden md:block p-0
                bg-transparent hover:bg-transparent 
                !text-slate-700 dark:!text-white text-sm
                dark:hover:!text-slate-400 hover:!text-slate-900
              "
            >  
             Mis Favoritos
            </AppLinkButton> 
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
  )
}
