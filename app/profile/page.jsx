/**
 * v0 by Vercel.
 * @see https://v0.dev/t/LwqZEBWXtb8
 */
"use client"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import Link from "next/link"

import { Slash } from "iconoir-react"
import Spinner from "@/components/ui/spinner"
import { useRouter } from "next/navigation";

import { useStore } from '@/store/storeContext';
import { observer } from "mobx-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import { Skeleton } from "@/components/ui/skeleton"

import { LoadingAvatar } from "./loading"

const Component = observer(() => {

    const store = useStore();

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);

    const [firstName, setFirstName] = useState('');

    const [lastName, setLastName] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [user, setUser] = useState(store.user);


    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState('');


    const handleAvatarChangePreview = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setAvatarFile(file);

            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

   

    const handleAvatarSave = async () => {
        setIsLoading(true);

        if (!user || !user.id) {
            console.error('User ID is undefined.');
            return;
        }

        try {
            // Отправляем обновленные данные на сервер
            const response = await store.uploadUserAvatar(user.id, avatarFile);
            setUser({ ...user, profile_picture_path: response.data.data.userData.profile_picture_path });
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
            toast.success('Avatar updated successfully!', { duration: 2000 });
        }
    }

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        console.log('storedUserData', storedUserData);

        if (storedUserData) {
            // Инициализируем состояние данными пользователя из localStorage
            setUser(JSON.parse(storedUserData));
            setIsLoading(false);
        } else {
            router.push('/login');
        }
    }, [router]);



    const handleSaveChanges = async () => {
        setIsLoading(true);

        if (!user || !user.id) {
            console.error('User ID is undefined.');
            return;
        }

        try {
            console.log('user', user);
            const full_name = `${firstName} ${lastName}`;
            // Отправляем обновленные данные на сервер
            const response = await store.updateUser({ full_name, email, password }, user.id);
            //console.log(response);

        }
        catch (error) {
            if (error.message) {
                toast.error(error.message, { duration: 2000 });
                console.error("Error", error.message);
            }
        }
        finally {
            setIsLoading(false);
            toast.success('User updated successfully!', { duration: 2000 });
        }
    }

    const handleVerifyEmail = async () => {
        setIsLoading(true);

        if (!user || !user.id) {
            console.error('User ID is undefined.');
            return;
        }

        try {
            // Отправляем обновленные данные на сервер
            const response = await store.verifyEmail(user.email);
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

        <div className="realtive w-screen h-screen bg-backgorund flex flex-col items-center justify-start" >
            <div className="absolute left-5 top-5 flex flex-row">
                <Button variant="link" className="text-xl text-color left-5 top-5 p-0" href="#">
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
                    <Slash />
                </Button>
                <Button variant="link" className="text-xl text-color p-0">
                    <Link href="/profile">Profile</Link>
                </Button>

            </div>
            <div className="mx-auto flex flex-col space-y-5 p-5 lg:flex-row lg:space-x-5 lg:space-y-0 mt-16">
                <Card className="space-y-4 bg-backgorund">
                    <CardHeader>
                        <CardTitle className="text-color">Avatar</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">

                        <div className="space-y-2">

                            <div className="flex flex-col items-center gap-3">
                                {avatarPreview ? (
                                    <Avatar className="rounded-full w-24 h-24">
                                        <AvatarImage src={avatarPreview} alt="Avatar Preview" style={{ objectFit: "cover" }} quality={100} />
                                        <AvatarFallback>
                                            <Skeleton />
                                        </AvatarFallback>

                                    </Avatar>
                                ) : (
                                    <Avatar className="rounded-full w-24 h-24">
                                        <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${user.profile_picture_path}`} style={{ objectFit: "cover" }} quality={100} />
                                        <AvatarFallback>
                                            <Skeleton />
                                        </AvatarFallback>

                                    </Avatar>
                                )

                                }

                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="picture">Pick Avatar</Label>
                                    <Input id="picture" type="file" onChange={handleAvatarChangePreview} />
                                </div>
                                <Button className="w-full" onClick={handleAvatarSave} disabled={!avatarFile || isLoading}>
                                    Save Avatar
                                    {isLoading && (
                                        <Spinner className="animate-spin mr-2 w-5 h-5" />
                                    )}
                                </Button>
                            </div>
                        </div>

                    </CardContent>
                </Card>

                <Card className="space-y-4 bg-background">
                    <CardHeader>
                        <CardTitle className="dark:text-white">Login Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="dark:text-gray-200" htmlFor="first-name">
                                    First name
                                </Label>
                                <Input
                                    id="first-name"
                                    name="first-name"
                                    type="text"
                                    autoCapitalize="none"
                                    autoCorrect="off"
                                    disabled={isLoading}
                                    placeholder="Enter your first name"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required


                                />

                            </div>
                            <div className="space-y-2">
                                <Label className="dark:text-gray-200" htmlFor="last-name">
                                    Last name
                                </Label>
                                <Input
                                    id="last-name"
                                    name="last-name"
                                    type="text"
                                    autoCapitalize="none"
                                    autoCorrect="off"
                                    disabled={isLoading}
                                    placeholder="Enter your last name"
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                // id="last-name" placeholder="Enter your last name" required 
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="dark:text-gray-200" htmlFor="email">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoCapitalize="none"
                                autoCorrect="off"
                                disabled={isLoading}
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            // id="email" placeholder="Enter your email" required type="email" 
                            />
                        </div>
                        {/* <div className="space-y-2">
                            <Label className="dark:text-gray-200" htmlFor="password">
                                Password
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoCapitalize="none"
                                autoCorrect="off"
                                disabled={isLoading}
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            // id="password" placeholder="Enter your password" required type="password"
                            />
                        </div> */}
                        <Button className="w-full" onClick={handleSaveChanges} disabled={!firstName || !lastName || !email || isLoading}>Save Changes</Button>
                    </CardContent>
                </Card>
                <Card className="space-y-4 bg-background">
                    <CardHeader>
                        <CardTitle className="text-color">Personal Information</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="space-x-2 flex flex-row items-center">
                            <p className="dark:text-gray-200">Rating Score - </p>
                            <p className="text-lg font-bold dark:text-gray-300">4.5</p>
                        </div>
                        <div className="space-x-2 flex flex-row items-center ">
                            <p className="dark:text-gray-200">Role - </p>
                            <p className="text-lg font-bold dark:text-gray-300">User</p>
                        </div>
                        <div className="space-x-2 flex flex-row items-center ">
                            <p className="dark:text-gray-200">Email - </p>
                            <Button onClick={handleVerifyEmail}>Verify</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>


    )
});

export default Component;

