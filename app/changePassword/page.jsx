"use client";
import { Button } from "@/components/ui/button"
import { useStore } from "@/store/storeContext";
import { set } from "mobx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export default function Component() {

    const router = useRouter();

    const store = useStore();

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        console.log('storedUserData', storedUserData);

        const userData = JSON.parse(storedUserData);
        setUser(userData);

        console.log('userData', userData);
        setIsLoading(false);
        
        if (userData && userData.is_email_verified) {
            toast.error('Email already verified');
            router.push('/profile');
            setIsLoading(false);
        }

       
    }, [router]);

    const handleVerifyEmail = async () => {
        setIsLoading(true);
        if (!user || !user.id) {
            console.error('User ID is undefined.');
            return;
        }

        try {
            // Отправляем обновленные данные на сервер
            const response = await store.verifyEmail(user.email, user.id);
            router.push('/verify');
            console.log(response);

        }
        catch (error) {
            if (error.message) {
                toast.error(error.message, { duration: 2000 });
                console.error("Error", error.message);
            }
        }
        finally {
            setIsLoading(false);
            toast.success('Verification link sent to your email!', { duration: 2000 });
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">

            <main className="flex flex-col items-center justify-center flex-grow p-10 space-y-5">
                <h1 className="text-3xl font-bold">Reset Password</h1>
                <p className="max-w-md text-center text-zinc-500 dark:text-zinc-400">
                    We have sent a reset password link to your email. Please check your inbox and click the link to reset your
                    password.
                </p>
                <div className="w-full max-w-sm space-y-5 flex items-center flex-col">
                    

                    <Button className="w-full" onClick={handleVerifyEmail} disabled={isLoading}>
                        Resend Reset Password Email
                    </Button>

                </div>
            </main>
        </div>
    )
}