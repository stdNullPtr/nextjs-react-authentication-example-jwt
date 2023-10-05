import NextAuth, { User } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface User {
        type: string
        accessToken: string,
        refreshToken: string,
        id: string
        username: string
        email: string
        roles: string[]
    }

    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            name: string,
            email: string,
            accessToken: string
        },
        error?: "RefreshAccessTokenError"
    }
}


declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        accessToken: string,
        expiresAt: number,
        refreshToken: string,
        error?: "RefreshAccessTokenError"
    }
}