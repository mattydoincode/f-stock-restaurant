import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Goethena
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Build a beautiful restaurant website in minutes.
        </p>
      </div>
      <Link href="/dashboard" className={buttonVariants({ size: "lg" })}>
        Get Started
      </Link>
    </div>
  );
}
