"use server";

import { registerUserUseCase } from "@/lib/use-cases/users";
import { lucia } from "@/lucia/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp(username: string, password: string) {

  let user

  try {
    user = await registerUserUseCase(username, password)
  } catch (err) {
    return {
      errors: "Please try again"
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