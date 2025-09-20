import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google";
import { fetchApi } from "./utils/api";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetchApi("/auth/login", {
          method: "POST",
          body: {
            email: credentials?.email,
            password: credentials?.password,
          },
        });

        if (!response.success) {
          throw new Error("Login failed");
        }

        const { access_token, user } = response.data;

        if (!user) {
          throw new Error("Invalid credentials.")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          image: user.image,
          access_token: access_token,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const response = await fetchApi("/auth/google-login", {
          method: "POST",
          body: { 
            email: profile?.email,
            first_name: profile?.given_name,
            last_name: profile?.family_name,
           },
        });
        
        if (!response.success) {
          throw new Error("Google login failed");
        }

        const { user: userData, access_token } = response.data;
        user.id = userData.id;
        user.email = userData.email;
        user.name = userData.username;
        user.first_name = userData.first_name;
        user.last_name = userData.last_name;
        user.image = userData.image;
        user.access_token = access_token;
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.first_name = user.first_name
        token.last_name = user.last_name
        token.access_token = user.access_token
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      session.user.first_name = token.first_name as string
      session.user.last_name = token.last_name as string
      session.user.access_token = token.access_token as string
      return session
    },
  },
})