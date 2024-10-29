
import Link from "next/link";
import AppLogo from "./AppLogo";
import AppDarkModeToggle from "./AppDarkModeToggle";

export default function AppNavbar() {

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
        <div>
          <AppDarkModeToggle />
        </div>
      </div>
    </div>
  </nav>
  )
}
