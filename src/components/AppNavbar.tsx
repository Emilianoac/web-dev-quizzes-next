
import Link from "next/link";
import AppLogo from "./AppLogo";

export default function AppNavbar() {
  return (
    <nav className="bg-white w-full p-4 shadow-sm sticky top-0 z-[999]">
    <div className="container">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          <AppLogo />
        </Link>
        <div>
        </div>
      </div>
    </div>
  </nav>
  )
}
