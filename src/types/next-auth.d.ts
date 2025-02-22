// auth.d.ts
import { DefaultSession } from "@auth/core/types"

declare module "@auth/core/types" {
  interface Session extends DefaultSession {
    user: {
      id: string
      email: string
      name?: string
    } & DefaultSession["user"]
    accessToken?: string
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id?: string
    email?: string
    name?: string
    accessToken?: string
  }
}