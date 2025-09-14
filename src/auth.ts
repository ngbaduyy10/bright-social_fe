import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // const res = await fetch(`${process.env.BE_URL}/api/auth/login`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     email: credentials?.email,
        //     password: credentials?.password,
        //   }),
        // })
        // const json = await res.json();
        // if (json.statusCode !== 200 && json.statusCode !== 201) {
        //   throw new Error(json.message || "Login failed");
        // }

        // const { access_token, user } = json.data;
        const user = {
          id: "123",
          email: "test@test.com",
          username: "test",
          image: "https://via.placeholder.com/150",
        }

        const access_token = "12345";

        if (!user) {
          throw new Error("Invalid credentials.")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.username,
          image: user.image,
          access_token: access_token,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        //call api to create user if not exists based on profile
        user.id = "123";
        user.access_token = "12345";
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.access_token = user.access_token
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      session.user.access_token = token.access_token as string
      return session
    },
  },
})