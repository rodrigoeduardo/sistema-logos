import { auth, signIn, signOut } from "@/lib/auth";
import { Button } from "../ui/button";

export async function AuthButton() {
  const session = await auth();

  if (!session) {
    return (
      <Button
        onClick={async () => {
          "use server";
          await signIn("discord", { redirectTo: "/manager" });
        }}
        className="cursor-pointer"
      >
        Login com Discord
      </Button>
    );
  }

  return (
    <Button
      onClick={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
      className="cursor-pointer"
    >
      Logout
    </Button>
  );
}
