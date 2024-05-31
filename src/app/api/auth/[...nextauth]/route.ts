import { config } from "@/config/config";
import { JWT } from "next-auth/jwt";
import NextAuth, { NextAuthOptions } from "next-auth";
import { Session } from "next-auth";

import GoogleProvider from 'next-auth/providers/google'

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: config.google.clientId! as string,
      clientSecret: config.google.clientSecret! as string,
    })
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.username = session.user.name
          ?.split(' ')
          .join('')
          .toLowerCase() || '';
        session.user.uuid = token.sub || '';
      }
      return session;
    }
  }
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };