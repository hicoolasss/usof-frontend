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
    let user = store.user;


    useEffect(() => {
        async function check() {
            try {
                await store.checkAuth();
                setIsLoading(false); // Когда аутентификация проверена, снимаем индикатор загрузки
            } catch (error) {
                console.log("another error:", error);
            }
        };
        if (!store.isAuth) {
            check();
        }
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