"use client"
import { ModeToggle } from '@/components/theme-swithcer';
import Link from 'next/link';
import { Button } from "@/components/ui/button"

import { LogOut } from 'lucide-react';

import Store from '@/store/store';

import { useRouter } from "next/navigation";

import { toast } from 'sonner'



export default function Home() {
  
  const router = useRouter();

  const handleLogout = async () => {

    try {
      await Store.logout();
      router.push('/');
      toast.success('Logout succssessful!', { duration: 2000 });
    } catch (error) {
      console.log("another error:", error);
    }
  }

  return (

    <main className="flex min-h-screen flex-col items-center justify-center ">

      <h1>Hello, it&apos;s home page!</h1>

      <ModeToggle />

      <Button variant="link" type="button" className="mt-5">
        <Link href="/registration">
          Go to Register
        </Link>
      </Button>

      <Button variant="link" type="button" className="mt-5">
        <Link href="/login">
          Go to Login
        </Link>
      </Button>

      <Button variant="outline" size="icon" onClick={handleLogout}>
        <LogOut className="h-4 w-4" />
      </Button>

    </main>

  );
}


