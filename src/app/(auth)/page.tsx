import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/validate-request";
import Login from "./_component/Login";

export default async function Home() {

  const { user } = await validateRequest()

  if (user) {
    return redirect("/dashboard")
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Login />
    </div>
  );
}
