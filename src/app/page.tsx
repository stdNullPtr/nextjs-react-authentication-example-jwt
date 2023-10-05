import { getServerSession } from "next-auth"
import { LoginButton } from "../components/LoginButton"
import { authOptions } from "./api/auth/[...nextauth]/route"
import Link from "next/link"
import { LogoutButton } from "@/components/LogoutButton"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div>
      {session?.error && <LoginButton />}
      {session && !session?.error && <LogoutButton />}
      {
        <div>
          Go to <Link href={"/profile"} className="text-blue-400">profile</Link> (requires login)
        </div>
      }
    </div >
  )
}