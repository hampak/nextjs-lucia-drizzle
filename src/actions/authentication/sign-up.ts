"use server";

import { redirect } from "next/navigation";

export async function signUp(username: string, password: string) {

  try {
    const user = await registerUserUseCase(username, password)
  } catch (err) {
    return {
      errors: "Please try again"
    }
  }

  return redirect("/")
}