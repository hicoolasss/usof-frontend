"use client";
import React from "react";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/theme-swithcer"
import { Input } from "@/components/ui/input"
import { Search } from "iconoir-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Facebook,
    User,
    UserPlus,
    Users,
    MenuIcon,
    X,
    Plus,
    Filter,
    FilterX,
} from "lucide-react"
import { HomeSimple, ShareIos, Telegram, Instagram } from "iconoir-react";
import { Skeleton } from "@/components/ui/skeleton"

import { UserContext } from "@/store/userContext";
import { useContext, useState, useEffect } from "react";
import { usePathname } from 'next/navigation'

export default function Header() {
    const { user, logout } = useContext(UserContext);
    const [searchText, setSearchText] = React.useState('');
    const pathname = usePathname()

    const isActive = (path) => {
        return pathname === path
    }




    return (
        <header className="w-full h-16 px-4 flex fixed z-50 lg:px-6 items-center justify-between bg-background  border-b border-zinc-200 dark:border-zinc-800">
            <div className="relative flex items-center ">
                <nav className="hidden lg:flex lg:w-full space-x-0 xl:space-x-8 lg:space-x-2">
                    <Button variant="link" className="text-xl font-bold text-color " href="#">
                        <svg className="mr-1"
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
                    {user ? (
                        <Link href="/profile">
                            <Button
                                variant="ghost"
                                className={`text-base font-medium ${isActive('/profile') ? 'bg-secondary_color' : 'text-zinc-600 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'}`}
                            >
                                Profile
                            </Button>
                        </Link>
                    ) : null}

                    <Link href="/users">
                        <Button
                            variant="ghost"
                            className={`text-base font-medium ${isActive('/users') ? 'bg-secondary_color' : 'text-zinc-600 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'}`}
                        >
                            Users
                        </Button>
                    </Link>
                    <Link href="/posts">
                        <Button
                            variant="ghost"
                            className={`text-base font-medium ${isActive('/posts') ? 'bg-secondary_color' : 'text-zinc-600 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'}`}
                        >
                            Posts
                        </Button>
                    </Link>

                    {user ? (
                        <Link href="/my-posts">
                            <Button
                                variant="ghost"
                                className={`text-base font-medium ${isActive('/my-posts') ? 'bg-secondary_color' : 'text-zinc-600 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'}`}
                            >
                                My Posts
                            </Button>
                        </Link>
                    ) : null}

                    {user ? (
                        <Link href="/createPost">
                            <Button
                                variant="ghost"
                                className={`text-base font-medium ${isActive('/createPost') ? 'bg-secondary_color' : 'text-zinc-600 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'}`}
                            >
                                New Post
                            </Button>
                        </Link>
                    ) : null}

                    <div className="relative justify-self-start hidden lg:flex md:flex items-center xl:w-64  ml-8 md:ml-0 lg:ml-8 xl:ml-8">
                        <Button variant="ghost" size="icon" className="absolute"><Search className="w-5 h-5" /></Button>

                        <Input className="indent-8"
                            placeholder="Search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        >
                        </Input>
                    </div>
                </nav>
                <nav className="lg:hidden flex">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild >
                            <Button variant="ghost" size="icon" >
                                <MenuIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" >
                            <DropdownMenuLabel>Posts</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Link href="/profile" className="flex flexs-row items-center">
                                        <User className="mr-2 h-4 w-4" />
                                        Profile
                                    </Link>

                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/" className="flex flexs-row items-center">
                                        <HomeSimple className="mr-2 h-4 w-4" />
                                        Home
                                    </Link>

                                </DropdownMenuItem>

                            </DropdownMenuGroup>

                            <DropdownMenuItem>
                                <Link href="/users" className="flex flexs-row items-center">
                                    <Users className="mr-2 h-4 w-4" />
                                    <span>Users</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/createPost" className="flex flexs-row items-center">
                                    <Plus className="mr-2 h-4 w-4" />
                                    <span>New Post</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    <ShareIos className="mr-2 h-4 w-4" />
                                    <span>Socials</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem>
                                            <Link href="https://web.telegram.org/#/im?p=@hicoolasss" target="_blank" className="flex flexs-row items-center">
                                                <Telegram className="mr-2 h-4 w-4" />
                                                <span>Telegram</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link href="https://www.instagram.com/hicoolasss/" target="_blank" className="flex flexs-row items-center">
                                                <Instagram className="mr-2 h-4 w-4" />
                                                <span>Instagram</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link href="https://github.com/hicoolasss" target="_blank" className="flex flexs-row items-center">
                                                <Github className="mr-2 h-4 w-4" />
                                                <span>Github</span>
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={logout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </nav>
            </div>


            <div className="flex items-center space-x-4 lg:space-x-4">
                <div ><ModeToggle /></div>
                {user ? (
                    <Button className="hidden lg:inline-flex " variant="outline" onClick={logout}>
                        Sign Out
                    </Button>) : (
                    <Button variant="ghost"
                        className={`text-base font-medium ${isActive('/posts') ? 'bg-secondary_color' : 'text-zinc-600 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'}`}
                    >
                        <Link href="/login">Log in</Link>
                    </Button>
                )
                }
                {user ? (<Avatar>
                    <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${user.profile_picture_path}`} style={{ objectFit: "cover" }} quality={100} />
                    <AvatarFallback>
                        <Skeleton />
                    </AvatarFallback>

                </Avatar>) : null}
            </div>
        </header>
    )
}