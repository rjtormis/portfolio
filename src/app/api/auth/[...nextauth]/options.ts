import { prisma } from "@/lib/prisma";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { type: "text", placeholder: "username" },
        password: { type: "password", placeholder: "password" },
      },
      async authorize(credentials) {
        if (credentials) {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });

          if (!user) return null;

          const compare = await bcrypt.compareSync(credentials.password, user.password);
          if (compare) return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user }) {
      if (user) {
        return true;
      }
      return false;
    },

    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
};
