/**
 * v0 by Vercel.
 * @see https://v0.dev/t/LwqZEBWXtb8
 */
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import userAvatar from "../../resources/images/avatars/avatar1.jpg"

import { Button } from "@/components/ui/button"

export default function Component() {
    return (
        <div className="w-full h-screen max-w-lg mx-auto bg-backgorund flex items-center justify-center">
            <div className="space-y-6 self-center">
                <h1 className="text-3xl font-bold text-center text-color">Edit User</h1>
                <Card className="space-y-4 bg-backgorund">
                    <CardHeader>
                        <CardTitle className="text-color">Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="dark:text-gray-200" htmlFor="first-name">
                                    First name
                                </Label>
                                <Input id="first-name" placeholder="Enter your first name" required />
                            </div>
                            <div className="space-y-2">
                                <Label className="dark:text-gray-200" htmlFor="last-name">
                                    Last name
                                </Label>
                                <Input id="last-name" placeholder="Enter your last name" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="dark:text-gray-200" htmlFor="avatar">
                                Avatar
                            </Label>
                            <div className="flex items-center gap-3">

                                <Image alt="User Avatar"
                                    className="rounded-full"
                                    height="48"
                                    src={userAvatar}
                                    style={{
                                        aspectRatio: "48/48",
                                        objectFit: "cover",
                                    }}
                                    width="48">


                                </Image>

                                <Button className="border-border dark:text-gray-300" variant="outline">
                                    Change Avatar
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="dark:text-gray-200">Rating Score</Label>
                            <p className="text-lg dark:text-gray-300">4.5</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="dark:text-gray-200">Role</Label>
                            <p className="text-lg dark:text-gray-300">Admin</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="space-y-4 bg-background">
                    <CardHeader>
                        <CardTitle className="dark:text-white">Login Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label className="dark:text-gray-200" htmlFor="email">
                                Email
                            </Label>
                            <Input id="email" placeholder="Enter your email" required type="email" />
                        </div>
                        <div className="space-y-2">
                            <Label className="dark:text-gray-200" htmlFor="password">
                                Password
                            </Label>
                            <Input id="password" placeholder="Enter your password" required type="password" />
                        </div>
                    </CardContent>
                </Card>
                <Button className="w-full">Save Changes</Button>
            </div>
        </div>
    )
}

