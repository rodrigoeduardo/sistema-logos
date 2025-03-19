import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col h-screen justify-center items-center gap-4">
      <h1 className="text-3xl font-bold">Sistema Logos</h1>
      <Link
        href="/ficha"
        className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 cursor-pointer"
      >
        Ficha
      </Link>
    </div>
  );
}
