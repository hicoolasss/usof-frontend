/**
 * v0 by Vercel.
 * @see https://v0.dev/t/rvDhDittPGA
 */
"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/theme-swithcer"
import Image from "next/image"
import userAvatar from "../../resources/images/avatars/avatar1.jpg"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input"
import { Search } from "iconoir-react"

import { useStore } from '@/store/storeContext';
import { observer } from "mobx-react"

export default function Component() {
    const store = useStore();

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        console.log(storedUserData);

        if (storedUserData) {
            // Инициализируем состояние данными пользователя из localStorage
            setUser(JSON.parse(storedUserData));
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-background ">
            <header className="w-full h-16 px-4 md:px-6 flex items-center justify-between  border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center ">
                    <Button variant="link" className="text-xl font-bold text-color " href="#">
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
                        <Link href="/">Smack Overslow</Link>

                    </Button>

                    <nav className="hidden lg:flex ">
                        <Button variant="ghost"
                            className="text-base font-medium text-zinc-600 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                        >
                            <Link href="/home">Home</Link>
                        </Button>
                        {user ? ( <Button variant="ghost"
                            className="text-base font-medium text-zinc-600 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                        >
                            <Link href="/profile">Profile</Link>
                        </Button>) 
                        : (null)}
                        
                        <Button variant="ghost"
                            className="text-base font-medium text-zinc-600 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                        >
                            <Link href="/posts">Posts</Link>
                        </Button>
                        <Button variant="ghost"
                            className="text-base font-medium text-zinc-600 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                        >
                            <Link href="/users">Users</Link>
                        </Button>
                        <div className="relative justify-self-start hidden lg:flex items-center w-64 ml-8">
                            <Button variant="ghost" size="icon" className="absolute"><Search className="w-5 h-5" /></Button>

                            <Input className="indent-8"
                                placeholder="Search"
                            >
                            </Input>

                        </div>
                    </nav>
                </div>


                <div className="flex items-center space-x-4">
                    <div ><ModeToggle /></div>
                    {user ? (
                        <Button className="hidden lg:inline-flex" variant="outline">
                            Sign Out
                        </Button>) : (
                        <Button variant="ghost"
                            className="text-base font-medium text-zinc-600 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                        >
                            <Link href="/login">Log in</Link>
                        </Button>
                    )
                    }
                    <Image
                        alt="User Avatar"
                        className="rounded-full"
                        height="32"
                        src={userAvatar}
                        style={{
                            aspectRatio: "32/32",
                            objectFit: "cover",
                        }}
                        width="32"
                    />
                </div>
            </header>
            <main className="flex-grow py-8 px-4 md:px-6">
                <section className="max-w-3xl mx-auto space-y-8">
                    <div className="space-y-4 border rounded-lg p-4">
                        <h2 className="text-xl font-bold">Post Title</h2>
                        <p className="text-base text-zinc-600 dark:text-zinc-400">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non diam nec augue tincidunt facilisis.
                            Donec vitae semper purus.
                        </p>
                        <div className="flex items-center space-x-2">
                            <Image
                                alt="User Avatar"
                                className="rounded-full"
                                height="24"
                                src="/placeholder.svg"
                                style={{
                                    aspectRatio: "24/24",
                                    objectFit: "cover",
                                }}
                                width="24"
                            />
                            <span className="text-sm text-zinc-500 dark:text-zinc-400">Username</span>
                        </div>
                    </div>
                    <div className="space-y-4 border rounded-lg p-4">
                        <h2 className="text-xl font-bold">Post Title</h2>
                        <p className="text-base text-zinc-600 dark:text-zinc-400">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non diam nec augue tincidunt facilisis.
                            Donec vitae semper purus.
                        </p>
                        <div className="flex items-center space-x-2">
                            <Image
                                alt="User Avatar"
                                className="rounded-full"
                                height="24"
                                src="/placeholder.svg"
                                style={{
                                    aspectRatio: "24/24",
                                    objectFit: "cover",
                                }}
                                width="24"
                            />
                            <span className="text-sm text-zinc-500 dark:text-zinc-400">Username</span>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="w-full h-16 px-4 md:px-6 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">© 2023 Company Name. All rights reserved.</p>
                <nav className="hidden lg:flex space-x-4">
                    <Link
                        className="text-sm text-zinc-600 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                        href="#"
                    >
                        Terms
                    </Link>
                    <Link
                        className="text-sm text-zinc-600 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                        href="#"
                    >
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    )
}

