"use client";
import React from "react";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/mOfamdIBdPw
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header";

export default function Component() {

    return (
        <>
            <Header />
            <div className="flex flex-col w-full min-h-screen bg-background text-gray-900 dark:text-gray-50">

                <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40 mt-10">
                    <h1 className="font-semibold text-3xl mx-auto max-w-6xl mt-5">Users</h1>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage alt="@user1" src="/placeholder-avatar.jpg" />
                                    <AvatarFallback>U1</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <CardTitle>User 1</CardTitle>
                                    <CardDescription>user1@example.com</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="grid gap-2">
                                <div className="text-sm font-semibold">Role: Administrator</div>
                                <div className="flex items-center gap-4 text-sm">
                                    <Badge >Rating: 4.7</Badge>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage alt="@user2" src="/placeholder-avatar.jpg" />
                                    <AvatarFallback>U2</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <CardTitle>User 2</CardTitle>
                                    <CardDescription>user2@example.com</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="grid gap-2">
                                <div className="text-sm font-semibold">Role: User</div>
                                <div className="flex items-center gap-4 text-sm">
                                    <Badge >Rating: 4.2</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </>
    )
}

function IconFrame(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="22" x2="2" y1="6" y2="6" />
            <line x1="22" x2="2" y1="18" y2="18" />
            <line x1="6" x2="6" y1="2" y2="22" />
            <line x1="18" x2="18" y1="2" y2="22" />
        </svg>
    )
}

