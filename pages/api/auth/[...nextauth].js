import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
        providers: [
          GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
          })
        ],
        callbacks: {
          async jwt({ token, account }) {
            if (account) {
              token.accessToken = account.access_token
            }
            return token
          },
          async session({ session, token, user }) {
            const { email, name } = session.user;
            //axios.get('/api/auth/save', { params: { email, name }});
            return session
          }
        }
  });