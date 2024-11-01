import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";


export const authOptions:NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {

    async signIn({user}) {
      if (user.roles && user.roles.includes("admin")) {
        return true;
      }
      return false;
    },

    async jwt({ token}) {
      const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } });
      if ( dbUser?.isActive === false ) {
        throw Error("El usuario no está activo");
      }

      token.roles = dbUser?.roles ?? ["no-roles"];
      token.id    = dbUser?.id ?? "no-uuid";

      return token;
    },

    async session({session, token}) {
      if ( session && session.user ) {
        session.user.roles = token.roles;
        session.user.id = token.id;
      }

      return session;
    }
  }
}