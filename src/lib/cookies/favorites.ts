"use server";

import { createJWT, checkJWT, decodeJWT } from "@/lib/jwt";
import { cookies } from "next/headers";

class FavoritesCookieService {
  cookieStore: ReturnType<typeof cookies>;
  cookieOptions: object;

  constructor() {
    this.cookieStore = cookies();
    this.cookieOptions = {sameSite: "strict" as const, secure: true, httpOnly: true};
  }

  getCookie(cookieName: string) {
    return this.cookieStore.get(cookieName)?.value;
  }

  createCookie(id: string, cookieName: string) {
    try {
      const data = createJWT(id);
      if (!data) throw new Error("Falta el id de la quiz")

      this.cookieStore.set(cookieName, data, this.cookieOptions);
    } catch(e) {
      console.log(e)
    }
  }

  updateCookie(cookieData: string, cookieName: string, id: string) {

    if (!cookieData) return

    if (!checkJWT(cookieData)) {
      this.cookieStore.set(cookieName, "");
      this.createCookie(id, cookieName);
    }

    const decodedCookie = decodeJWT(cookieData);
    const favoritesArray = decodedCookie ? decodedCookie.split(",") : [];

    if (favoritesArray.includes(id)) {
      const newFavorites = favoritesArray.filter((fav: string) => fav !== id).join(",");

      if (!newFavorites) {
        this.cookieStore.delete(cookieName);
        return
      }

      this.createCookie(newFavorites, cookieName);
    } else {
      const data = decodedCookie ? `${decodedCookie},${id}` : id;
      this.createCookie(data, cookieName);
    }
  }

  decodeCookie(cookieData: string) {
    return decodeJWT(cookieData);
  }
}

export default FavoritesCookieService;