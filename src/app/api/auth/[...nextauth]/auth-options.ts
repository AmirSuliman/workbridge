// pages/api/auth/[...nextauth].ts
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {},
      authorize: async (credentials: any) => {
        const res = await axios.post(
          'https://devbackend.isaworkbridge.com/user/login',
          {
            email: credentials.email,
            password: credentials.password,
          }
        );
        // console.log(res, "res_____=++++L")
        // Extract and clean up the accessToken
        let accessToken = res.data?.data?.accessToken?.accessToken;

        // Remove 'Bearer' prefix if present
        if (accessToken?.startsWith('Bearer ')) {
          accessToken = accessToken.replace('Bearer ', '');
        }

        if (accessToken) {
          const user = jwtDecode(accessToken.trim()) as User;
          // console.log(user, "user++++++++")
          return { ...user, accessToken }; // Pass the cleaned access token to the user object
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',

    maxAge: 60 * 10 * 6, // 1 hour
  },
  callbacks: {
    async jwt({ token, user }) {
      // console.log(token, "token")
      if (user) {
        // return user as JWT
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      // console.log(session, "session")
      // console.log(token, "token")
      const nToken = token as any;
      return {
        ...session,
        user: token.user,
        accessToken: nToken.user?.accessToken,
      } as any;
    },
    async redirect({ url, baseUrl }) {
      const parsedUrl = new URL(url, baseUrl);
      // console.log(parsedUrl, "parsedUrl")
      // console.log(baseUrl, "baseUrl")
      // console.log(url, "url")

      if (parsedUrl.searchParams.has('callbackUrl')) {
        return `${baseUrl}${parsedUrl.searchParams.get('callbackUrl')}`;
      }
      if (parsedUrl.origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },
  pages: {
    signIn: '/sign-in',
    // error: '/error',
  },
};
