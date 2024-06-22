import { validateRequest } from "@/lib/validate-request"
import { redirect } from "next/navigation"

export default async function Page() {

  const { user, session } = await validateRequest()

  if (!user) {
    return redirect("/")
  }

  return (
    <div>
      <p>Hello, {user.username}!</p>
      <p>Your session expires in, {session.expiresAt.toString()}</p>
    </div>
  )
}