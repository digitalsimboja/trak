import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            username: string;
            uuid: string;
        } & DefaultSession["user"]
    }
}