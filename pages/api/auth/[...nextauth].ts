import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "nononcrust",
      clientSecret: process.env.GOOGLE_SECRET || "google",
    }),
  ],
});
