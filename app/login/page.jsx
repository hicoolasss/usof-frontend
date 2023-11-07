
"use client";
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/components/user-auth-form"
import { ModeToggle } from '@/components/theme-swithcer'
import { Button } from "@/components/ui/button"
import { redirect } from "next/dist/server/api-utils"


import UserLoginForm from "@/components/user-login-form"
import Scene from "@/components/lightning-bulb"
import { useTheme } from "next-themes"



export default function AuthenticationPage() {
    const  theme = useTheme();
    return (
        <>

            <div className="container relative grid h-screen flex-col items-center justify-center sm:grid md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 bg-background cursor-default">
                <Link
                    href="/registration"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute left-4 top-4 md:left-8 md:top-8"
                    )}
                >
                    Registration
                </Link>

                <div className="lg space-y-6 ">

                    <div className="flex flex-col space-y-5 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight sm:text-5xl md:text-5xl lg:text-5xl">
                            Welcome Back!
                        </h1>
                        <p className="text-base text-muted-foreground sm:text-xl md:text5xl lg:text-xl">
                            Please login to your account
                        </p>
                    </div>

                    <div className="mx-auto flex w-full flex-col justify-center sm:w-3/4 lg:w-2/5">
                        <UserLoginForm />

                    </div>
                </div>

                <div className="relative hidden h-full flex-col bg-gradient  text-white dark:border-r lg:flex">

                    {/* <div className="w-full h-screen white:hidden">
                        <Scene />
                    </div> */}

                    <div className="absolute flex items-center p-10 text-lg font-medium right-10">

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24px"
                            height="24px"
                            fill="none"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            color="var(--color)"
                        >
                            <rect
                                width={7}
                                height={5}
                                x={3}
                                y={2}
                                stroke="var(--color)"
                                strokeWidth="2"
                                rx="0.6"
                            />
                            <rect
                                width={7}
                                height={5}
                                x="8.5"
                                y={17}
                                stroke="var(--color)"
                                strokeWidth="2"
                                rx="0.6"
                            />
                            <rect
                                width={7}
                                height={5}
                                x={14}
                                y={2}
                                stroke="var(--color)"
                                strokeWidth="2"
                                rx="0.6"
                            />
                            <path
                                stroke="var(--color)"
                                strokeWidth="2"
                                d="M6.5 7v3.5a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7M12 12.5V17"
                            />
                        </svg>

                        <p className="ml-1 text-2xl text-color">Smack Overslow</p>

                    </div>

                </div>
            </div>
        </>
    )
}