import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web dev quizzes",
  description: "Test your web development knowledge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-black">
        <div className="container my-5">
          {children}
        </div>
      </body>
    </html>
  );
}
