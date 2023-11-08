"use client"
import { ModeToggle } from '@/components/theme-swithcer';
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react';
import { LogOut } from 'lucide-react';

import Store from '@/store/store';

import { useStore } from '@/store/storeContext';

import { useRouter } from "next/navigation";

import { toast } from 'sonner'

import Spinner from '@/components/ui/spinner';



export default function Home() {

  const store = useStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);


  useEffect(() => {

    async function checkAuthStatus() {
      try {
        await store.checkAuth();
        setIsLoading(false); // Снимаем индикатор загрузки
        setUser(store.user); // Сохраняем данные пользователя в локальном состоянии

      } catch (error) {
        console.error("Ошибка при проверке аутентификации:", error);
        setIsLoading(false); // Также снимаем индикатор загрузки в случае ошибки
      } finally {
        setIsLoading(false);
        setIsAuth(store.isAuth);
      }
    }
    // Вызываем асинхронную функцию
    checkAuthStatus().catch(console.error);

  }, [store]);

  const handleLogout = async () => {

    try {
      setIsAuth(false);
      await Store.logout();
      router.push('/');
      toast.success('Logout succssessful!', { duration: 2000 });
    } catch (error) {
      if (error.message) {
        toast.error(error.message, { duration: 2000 });
      }
      console.error("Error", error.message);
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

      <Button variant="outline" size="icon" onClick={handleLogout} className="mt-5">
        <LogOut className="h-4 w-4" />
      </Button>


    <div className='mt-5'>
    
    {isLoading ? <Spinner className="animate-spin mr-2 w-5 h-5" /> : (isAuth || !isAuth) ? <h1>Hi, {user?.login}!</h1> : <h1>Hi, Guest</h1>}

    </div>




    </main>

  );
}


