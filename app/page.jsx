"use client"
import { ModeToggle } from '@/components/theme-swithcer';
import Link from 'next/link';
import { Button } from "@/components/ui/button"



export default function Home() {


  return (
    
      <main className="flex min-h-screen flex-col items-center justify-center ">

        <h1>Hello, it&apos;s home page!</h1>

        <ModeToggle />

        <Button variant="link" type="button" className="mt-5">
          <Link href="/registration">
            Go to Register
          </Link>
        </Button>

      </main>

  );
}


