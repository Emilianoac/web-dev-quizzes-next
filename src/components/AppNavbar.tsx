
import Link from "next/link";
import AppLogo from "./AppLogo";
import AppDarkModeToggle from "./AppDarkModeToggle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import UserDropdown from "./UserDropdown";

export default async function AppNavbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="
      bg-white 
      dark:bg-slate-900 dark:shadow-lg
      w-full p-4 shadow-sm sticky top-0 z-[999]">
      <div className="container">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            <AppLogo />
          </Link>
          <div className="flex gap-3">
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
