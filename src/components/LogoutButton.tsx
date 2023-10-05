"use client"
import { signOut } from "next-auth/react";

export function LogoutButton() {
    return <button className="underline text-blue-400" onClick={() => signOut()}>Log Out</button>;
}
