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



export default function UserLoginForm({ className, ...props }) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const router = useRouter();

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
                            <Button className="absolute bottom-1 right-1 h-7 w-7" size="icon" variant="ghost">
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

                    <Button className="mt-1" disabled={isLoading}>
                        {isLoading && (
                            <Spinner className="animate-spin mr-2 w-5 h-5" />
                        )}
                        Log In
                    </Button>
                </div>
            </div>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>

            <Button variant="outline" type="button" disabled={isLoading} className="bg-github hover:bg-githubHover text-white hover:text-white" >


                {isLoading ? (
                    <Spinner className="animate-spin mr-2 w-5 h-5" />
                ) : (
                    <GitHub className="mr-1 h-5 w-5" />
                )}{" "}
                Github
            </Button>

            <Button variant="outline" type="button" disabled={isLoading} className="bg-google hover:bg-googleHover text-white hover:text-white  -mt-2" >


                {isLoading ? (
                    <Spinner className="animate-spin mr-2 w-5 h-5" />
                ) : (
                    <Google className="mr-1 h-5 w-5" />
                )}{" "}
                Google
            </Button>

        </div>
    );

}