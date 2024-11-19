import { checkJWT } from "@/lib/jwt"
import prisma from "@/lib/prisma";
import QuizCard from "@/components/cards/QuizCard";
import FavoritesCookieService from "@/lib/cookies/favorites";

import type { Metadata } from "next";
import appMetaData from "@/constants/metaData";

export const metadata: Metadata = {
  title: appMetaData.mis_favoritos.title,
}

export default async function favoritesPage() {

  const favoritesCookieService = new FavoritesCookieService();
  const cookieFavorites = favoritesCookieService.getCookie("_favorites");

  if (!cookieFavorites || !checkJWT(cookieFavorites)) {
    return (
      <h1 className="text-slate-600 dark:text-slate-500 text-xl text-center font-bold mt-10">
        Aún no tienes quizzes favoritos
      </h1>
    )
  }

  const favorites = favoritesCookieService.decodeCookie(cookieFavorites)?.split(',');

  const quizzes = await prisma.quiz.findMany({
    where: {
      id: { in: favorites }
    },
    include: {
      technology: {
        include: { area: true }
      }
    }
  });

  quizzes.sort((a, b) => favorites.indexOf(b.id) - favorites.indexOf(a.id));

  if (!quizzes?.length) {
    return (
      <h1 className="text-slate-600 dark:text-slate-500 text-xl text-center font-bold mt-10">
        No se encontraron quizzes favoritos
      </h1>
    )
  }

  return (
    <div>
      <h1 className="font-bold text-2xl mb-3">Mis Favoritos</h1>
      <p className="text-end mb-3 text-sm">Favoritos: <strong>{quizzes.length}</strong></p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        { quizzes &&
          quizzes.map(q => (
            <QuizCard key={q.slug} quiz={{
              title: q.title,
              slug: q.slug,
              id: q.id,
              description: q.description,
              level: q.level,
              technology: {
                icon: q.technology.icon,
                name: q.technology.name,
                area: q.technology.area.name,
                slug: q.slug
              }
            }} />
          ))
        }
      </div>
    </div>
  )
}
