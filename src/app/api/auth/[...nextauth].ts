// pages/api/auth/[...nextauth].ts
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosInstance from "@/src/lib/axios";
import { API_ROUTES } from "@/src/constants/apiRoutes";
import { jwtDecode } from "jwt-decode";

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
            },
            authorize: async (credentials: any) => {
                try {
                    const res = await axiosInstance.post(API_ROUTES.LOGIN, {
                        email: credentials.email,
                        password: credentials.password,
                    });

                    // Extract and clean up the accessToken
                    let accessToken = res.data?.data?.accessToken?.accessToken;

                    // Remove 'Bearer' prefix if present
                    if (accessToken?.startsWith("Bearer ")) {
                        accessToken = accessToken.replace("Bearer ", "");
                    }

                    if (accessToken) {
                        const user = jwtDecode(accessToken) as User;
                        return { ...user, accessToken }; // Pass the cleaned access token to the user object
                    }

                    throw new Error("No access token provided");
                } catch (error) {
                    console.error("Authorization failed:", error);
                    return null; // Stop redirection to an error page
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 10 * 6  // 1 hour
    },
    callbacks: {
        async jwt({ token, user }) {
            console.log(token, "token")
            console.log(user, "user")
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            console.log(session, "session")
            console.log(token, "token")
            const nToken = token as any;
            return {
                ...session, user: token.user, accessToken: nToken.user?.accessToken,
            } as any;
        },
        async redirect({ url, baseUrl }) {
            // Redirect to role-based dashboard or to a specified callback URL if provided

            const parsedUrl = new URL(url, baseUrl);
            console.log("redirectimng+++++++++++++++++++++++++++++++++++++++++");
            console.log(parsedUrl, "parsedURL")
            if (parsedUrl.searchParams.has("callbackUrl")) {
                return parsedUrl.searchParams.get("callbackUrl");
            }
            if (parsedUrl.origin === baseUrl) {
                return url;
            }

            return baseUrl as any;

            // const isAuthPage = url === `${baseUrl}/login`;
            // if (isAuthPage) {
            //     return baseUrl;
            // }
            // return url.startsWith(baseUrl) ? url : baseUrl;
        },
    },
    pages: {
        // signIn: "/",
        // error: '/sign-in',
    },
});
