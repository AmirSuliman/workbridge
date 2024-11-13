// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                        username: credentials?.username,
                        password: credentials?.password,
                    });
                    const user = res.data;

                    if (user) {
                        return user;
                    }
                    return null;
                } catch (error) {
                    console.error("Login failed:", error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const newUser: any = { ...user };
                const modifiedToken = { ...token, role: newUser.role };
            }
            return token;
        },
        async session({ session, token }) {

            const modifiedSession = { ...session, accessToken: token.accessToken, role: token.role };
            // modifiedSession.user = { ...session.user, role: token.role };
            // modifiedSession.accessToken = token.accessToken;
            return modifiedSession;
        },
        async redirect({ url, baseUrl }) {
            // Redirect to role-based dashboard or to a specified callback URL if provided
            const isAuthPage = url === `${baseUrl}/login`;
            if (isAuthPage) {
                return baseUrl;
            }
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
    },
    pages: {
        signIn: "/login",
    },
});
