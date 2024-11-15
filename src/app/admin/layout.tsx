import AppNavlink from "@/components/AppNavLink";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import {redirect } from "next/navigation";
import type { Metadata } from "next";
import appMetaData from "@/constants/metaData";

export const metadata: Metadata = {
  title: {
    default: `${appMetaData.admin.title}`, 
    template: `${appMetaData.admin.title} - %s`,

  }
}

export default async function AmdminLayout({ children }: Readonly<{ children: React.ReactNode}>) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.roles?.includes("admin")) {
    redirect("/");
  }
  const memuItems = [
    { title: "Quizzes", link: "/admin/quizzes" },
    { title: "Tecnologías", link: "/admin/tecnologias" },
    { title: "Areas", link: "/admin/areas" },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-[250px_minmax(200px,1fr)] gap-4">
        <div>
          <aside 
            className="
              bg-white text-slate-600 
              dark:bg-blue-gray dark:text-slate-400
              h-auto p-4 pb-3 rounded-md sticky top-[70px]">
            <span className="text-xs font-bold mb-1 block">Admin</span>
            <ul>
              {memuItems.map((item) => (
                <li 
                  key={item.link} 
                  className="
                    border-b border-slate-300 
                    dark:border-slate-900
                    last-of-type:border-0 text-sm">
                    <AppNavlink
                      link={item.link} 
                      title={item.title}
                    />
                </li>
              ))}
            </ul>
          </aside>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}