"use client";
import React from "react";
import { useState } from "react";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Spinner from "@/components/ui/spinner";

import { GitHub } from "iconoir-react";
import { Google } from "iconoir-react";

import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";
import Store from "@/store/store";
import { toast } from 'sonner'


export default function UserLoginForm({ className, ...props }) {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const validate = () => {
        if (!login) {
            toast.error('Login is required!', { duration: 2000 });
            return false;
        }
        if (!password) {
            toast.error('Password is required!', { duration: 2000 });
            return false;
        }
        if (login.length < 4) {
            toast.error('Login must be at least 4 characters!', { duration: 2000 });
            return false;
        }
        if (login.length > 20) {
            toast.error('Login must be less than 20 characters!', { duration: 2000 });
            return false;
        }
        if (login.search(/\d/) === 1) {
            toast.error('Login should not contain numbers!', { duration: 2000 });
            return false;
        }
        if (password.length < 4) {
            toast.error('Password must be at least 4 characters!', { duration: 2000 });
            return false;
        }
        return true;
    }

    const handleLogin = async () => {

        setIsLoading(true);
        // Используйте значения состояния вместо FormData
        try {
            if (!validate()) {
                return;
            }
            // Вызываем функцию регистрации
            await Store.login(login, password);

            router.push('/home');
            toast.success('Login succssessful!', { duration: 2000 });

        } catch (error) {
            console.log("another error:", error);
            if (error.response?.data?.error) {
                toast.error(error.response.data.error, { duration: 2000 });
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <div>
                <div className="grid gap-2">
                    <div className="grid gap-3">

                        <div>
                            <Label htmlFor="login">
                                Login or Email
                            </Label>
                            <Input
                                id="login"
                                name="login"
                                placeholder="name@example.com"
                                type="text"
                                autoCapitalize="none"
                                autoCorrect="off"
                                disabled={isLoading}
                                onChange={(e) => setLogin(e.target.value)}
                            />
                        </div>

                        <div className="relative ">
                            <Label htmlFor="password">
                                Password
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                placeholder="Password"
                                type="text"
                                autoCapitalize="none"
                                autoCorrect="off"
                                disabled={isLoading}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button className="absolute bottom-1 right-2 h-8 w-8" size="icon" variant="ghost">
                                <svg
                                    className=" h-4 w-4"
                                    fill="none"
                                    height="24"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                                <span className="sr-only">Toggle password visibility</span>
                            </Button>
                        </div>
                    </div>

                    <Button className="mt-1" disabled={isLoading} onClick={handleLogin}>
                        {isLoading && (
                            <Spinner className="animate-spin mr-2 w-5 h-5" />
                        )}
                        Log In
                    </Button>
                </div>
            </div>
        </div>
    );

}