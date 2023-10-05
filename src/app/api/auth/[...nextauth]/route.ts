import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, { NextAuthOptions } from "next-auth"
import jwt_decode from "jwt-decode";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                const res = await fetch("http://localhost:8080/api/auth/signin", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()

                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
    ],
    callbacks: {
        // after first login only 'token' is supplied
        async jwt({ token, user }) {
            // console.log("jwt callback", { token, user })

            if (user) {
                console.log("------User is present branch")
                const tokenDecoded: { sub: string, iat: string, exp: number } = jwt_decode(user.accessToken);
                return {
                    name: user.username,
                    email: user.email,
                    accessToken: user.accessToken,
                    expiresAt: tokenDecoded.exp,
                    refreshToken: user.refreshToken,
                }
            }
            else if (Date.now() < token.expiresAt * 1000) {
                console.log("------Token valid branch", Date.now(), token.expiresAt * 1000)
                return token;
            }
            else {
                console.log("------Refresh token branch")
                try {
                    const res = await fetch("http://localhost:8080/api/auth/refreshtoken", {
                        method: 'POST',
                        body: JSON.stringify({ refreshToken: token.refreshToken }),
                        headers: { "Content-Type": "application/json" }
                    })

                    const resJson: { accessToken: string, refreshToken: string } = await res.json()

                    if (!res.ok) throw resJson
                    return {
                        ...token,
                        accessToken: resJson.accessToken,
                        refreshToken: resJson.refreshToken,
                    }
                } catch (error) {
                    //console.error("Error refreshing access token", error)
                    // The error property will be used client-side to handle the refresh token error
                    return { ...token, error: "RefreshAccessTokenError" as const }
                }
            }
        },
        async session({ session, token }) {
            //console.log("session callback", { token, session })

            session.user.name = token.name || "";
            session.user.email = token.email || "";
            session.user.accessToken = token.accessToken;
            session.error = token.error;

            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt" },
    debug: process.env.NODE_ENV === "development"
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }