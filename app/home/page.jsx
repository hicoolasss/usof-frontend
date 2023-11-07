"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';
import { store } from '@/store/store';
import Cookies from 'js-cookie';
import { toast } from 'sonner'
import { useStore } from '@/store/storeContext';

export default function HomePage() {

    const store = useStore();
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const [user, setUser] = useState(null);


    useEffect(() => {

        async function checkAuthStatus() {
            try {
                await store.checkAuth();
                setIsLoading(false); // Снимаем индикатор загрузки
                setUser(store.user); // Сохраняем данные пользователя в локальном состоянии
            } catch (error) {
                console.error("Ошибка при проверке аутентификации:", error);
                setIsLoading(false); // Также снимаем индикатор загрузки в случае ошибки
            }
        }

        // Вызываем асинхронную функцию

        checkAuthStatus().catch(console.error);


    }, [store]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleLogout = async () => {

        try {
            await store.logout();
            router.push('/');
            toast.success('Logout succssessful!', { duration: 2000 });
        } catch (error) {
            console.log("another error:", error);
        }
    }
    return (
        <div>
            <h1>Home Page</h1>

            <h2>Hi, {user?.login}!</h2>
            <Button variant="outline" size="icon" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
            </Button>
        </div>

    )
}