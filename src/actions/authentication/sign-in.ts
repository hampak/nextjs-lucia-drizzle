"use server";

import { signInUseCase } from "@/lib/use-cases/users";
import { lucia } from "@/lucia/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signIn(username: string, password: string) {
  const user = await signInUseCase(username, password)

  if (!user) {
    return {
      errors: "Invalid Credentials - Please Try Again!"
    }
  }

  const session = await lucia.createSession(user.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  return redirect("/dashboard")
}