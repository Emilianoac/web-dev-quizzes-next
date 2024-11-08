import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import AppNavbar from "@/components/AppNavbar";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: { 
    default: "Web Dev Quizzes", 
    template: "%s - Web Dev Quizzes" 
  },
  description: "Test your web development knowledge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-black dark:bg-slate-900 dark:text-white">
        <NextTopLoader color="#ff3c9d"/>
        <ThemeProvider>
          <AppNavbar />
          <div className="container my-5">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
