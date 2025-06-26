import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Manager() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return <div>Manager</div>;
}
