import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

export const authOptions: NextAuthConfig = {
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID ?? "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      const isAllowed = [
        "622613499805433886",
        "791669203043745823",
        "1365386607003435008",
      ].includes(account?.providerAccountId ?? "");

      if (isAllowed) {
        console.log("User allowed to sign in");
        return true;
      }

      console.log("User not allowed to sign in");
      return false;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
