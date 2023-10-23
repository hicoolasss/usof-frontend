import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/components/user-auth-form"
import { ModeToggle } from '@/components/theme-swithcer'
import { Button } from "@/components/ui/button"
import { redirect } from "next/dist/server/api-utils"


export const metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {

    return (
        <>
            {/* <div className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div> */}

      
            <div className="container relative grid h-screen flex-col items-center justify-center sm:grid md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 bg-background">
                <Link
                    href="/examples/authentication"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                        )}
                >
                    Login
                </Link>
                       
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-gradient" />
                    <div className="relative z-20 flex items-center text-lg font-medium">

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24px"
                            height="24px"
                            fill="none"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            color="#FFFFFF"
                        >
                            <rect
                                width={7}
                                height={5}
                                x={3}
                                y={2}
                                stroke="#FFFFFF"
                                strokeWidth="2"
                                rx="0.6"
                            />
                            <rect
                                width={7}
                                height={5}
                                x="8.5"
                                y={17}
                                stroke="#FFFFFF"
                                strokeWidth="2"
                                rx="0.6"
                            />
                            <rect
                                width={7}
                                height={5}
                                x={14}
                                y={2}
                                stroke="#FFFFFF"
                                strokeWidth="2"
                                rx="0.6"
                            />
                            <path
                                stroke="#FFFFFF"
                                strokeWidth="2"
                                d="M6.5 7v3.5a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7M12 12.5V17"
                            />
                        </svg>


                        <p className="ml-1 text-2xl text-color">Smack Overslow</p>
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-5">
                            <p className="text-lg text-color">
                                &ldquo;This project has saved me countless hours of work and
                                it didn&apos;t just solve my code errors - it taught me more efficient approaches to coding.
                                Every solution it provided was like a mini-lesson in best practices. It&apos;s not just a problem - solver; it&apos;s a skill enhancer.&rdquo;
                            </p>
                            <footer className="text-sm text-color">Sofia Davis</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg space-y-6 ">
                    
                    <div className="flex flex-col space-y-5 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight sm:text-5xl md:text-5xl lg:text-5xl">
                            Create an account
                        </h1>
                        <p className="text-base text-muted-foreground sm:text-xl md:text5xl lg:text-xl">
                            Enter your details below to create your account
                        </p>
                    </div>

                    <div className="mx-auto flex w-3/4 flex-col justify-center sm:w-3/4 lg:w-2/5">
                        <UserAuthForm />

                    </div>
                </div>
            </div>
        </>
    )
}