import { validateRequest } from "@/lib/validate-request";
import SignUp from "../_component/SignUp";
import { redirect } from "next/navigation";

export default async function Home() {

  const { user } = await validateRequest()

  if (user) {
    return redirect("/dashboard")
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <SignUp />
    </div>
  );
}
