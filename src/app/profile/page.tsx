import { Session, getServerSession } from "next-auth"
import { EndpointList } from "@/components/TestEndpointList"
import { LogoutButton } from "@/components/LogoutButton"
import jwt_decode from "jwt-decode";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
    const session = await getServerSession(authOptions)
    console.log("Session: ", session)

    if (session?.error === "RefreshAccessTokenError" || !session?.user.accessToken) {
        return redirect("api/auth/signin")
    }

    const tokenDecoded: { sub: string, iat: string, exp: number } = jwt_decode(session?.user.accessToken);
    return (
        <div>
            <UserInfo session={session} />
            {<div>Expires: {new Date(tokenDecoded.exp * 1000).toTimeString()}</div>}
            {session && <LogoutButton />}
            {session && <EndpointList />}
        </div >
    )
}

function UserInfo({ session }: { session: Session | null }) {
    return (
        <>
            {session &&
                <>
                    <div>SESSION:</div>
                    <pre>{JSON.stringify(session, null, 2)}</pre>
                </>
            }
        </>
    );
}