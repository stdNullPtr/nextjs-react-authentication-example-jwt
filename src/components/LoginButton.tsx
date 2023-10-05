"use client"
import { signIn } from "next-auth/react";

export function LoginButton() {
    return <button className="underline text-blue-400" onClick={() => signIn()}>Sign in</button>;
}
