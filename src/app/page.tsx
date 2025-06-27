import { AuthButton } from "@/components/auth/auth-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col h-screen justify-center items-center gap-4">
      <h1 className="text-3xl font-bold">Sistema Logos</h1>
      <div className="flex gap-4">
        <Button>
          <Link href={"/ficha"}>Ficha</Link>
        </Button>
        <AuthButton />
      </div>
    </div>
  );
}
