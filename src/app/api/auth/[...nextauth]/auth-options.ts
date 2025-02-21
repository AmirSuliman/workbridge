// pages/api/auth/[...nextauth].ts
import axiosInstance from '@/lib/axios';
import { jwtDecode } from 'jwt-decode';
import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {},
      async authorize(credentials: any) {
        try {
          console.log("🔹 Logging in user:", credentials);
          
          const res = await axiosInstance.post('/user/login', {
            email: credentials.email,
            password: credentials.password,
          });

          console.log("✅ API Response:", res.data);
          
          let accessToken = res.data?.data?.accessToken?.accessToken;
          if (accessToken?.startsWith('Bearer ')) {
            accessToken = accessToken.replace('Bearer ', '');
          }

          if (accessToken) {
            const user = jwtDecode(accessToken.trim()) as User;
            console.log("🔹 Decoded User:", user);
            return { ...user, accessToken };
          }

          throw new Error('Invalid credentials');
        } catch (error) {
          console.error("❌ Login failed:", error);
          throw new Error('Authentication failed');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 10 * 6, // 1 hour
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      const nToken = token as any;
      return {
        ...session,
        user: token.user,
        accessToken: nToken.user?.accessToken,
      } as any;
    },
    async redirect({ url, baseUrl }) {
      const parsedUrl = new URL(url, baseUrl);
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
  },
};
