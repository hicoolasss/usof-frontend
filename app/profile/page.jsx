/**
 * v0 by Vercel.
 * @see https://v0.dev/t/LwqZEBWXtb8
 */
"use client"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState, useEffect, useCallback } from "react"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import Link from "next/link"

import { Slash } from "iconoir-react"
import Spinner from "@/components/ui/spinner"
import { useRouter } from "next/navigation";

import { useStore } from '@/store/storeContext';
import { observer } from "mobx-react"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import { Skeleton } from "@/components/ui/skeleton"
import { UserAuthForm } from "@/components/user-auth-form"
import { DataTable } from "@/components/user-table"

const Component = observer(() => {

    const store = useStore();

    const router = useRouter();

    const [isPageLoading, setIsPageLoading] = useState(true); // State for initial page load
    const [isAsyncLoading, setIsAsyncLoading] = useState(false); // State for async operations

    const toggleLoading = (isPageLoading) => {
        setIsPageLoading(isPageLoading);
    };

    const [user, setUser] = useState(store.user);

    const [firstName, setFirstName] = useState('');

    const [lastName, setLastName] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [users, setUsers] = useState([]);
    const makeApiCall = async (call, successMessage, errorMessage) => {
        try {
            const response = await call();
            toast.success(successMessage, { duration: 2000 });
            return response;
        } catch (error) {
            toast.error(errorMessage || error.message, { duration: 2000 });
            console.error("Error", error.message);
        } finally {
            setIsAsyncLoading(false);
        }
    };


    const readFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(file);
        });
    };

    const handleAvatarChangePreview = async (event) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const filePreview = await readFile(file);
                setAvatarFile(file);
                setAvatarPreview(filePreview);
            } catch (error) {
                toast.error('Failed to read file.', { duration: 2000 });
            }
        }
    };
    const updateUserState = (userData) => {
        setUser(userData);
        const { full_name = '', email = '' } = userData;
        const [firstName, lastName] = full_name.split(' ');
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
    };

    const handleAvatarSave = async () => {
        setIsAsyncLoading(true);
        const response = await makeApiCall(
            () => store.uploadUserAvatar(user.id, avatarFile),
            'Avatar updated successfully!',
            'Failed to update avatar.'
        );
        if (response) updateUserState(response.data.data.userData);
    };

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        console.log('storedUserData', storedUserData);

        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setUser(userData);
            setFirstName(userData && userData.full_name ? userData.full_name.split(' ')[0] : '');
            setLastName(userData && userData.full_name ? userData.full_name.split(' ')[1] : '');
            setEmail(userData && userData.email);
            setIsPageLoading(false);
        } else {
            toast.error('Please log in to check your profile!');
            router.push('/login');
        }
    }, [router]);

    const handleSaveChanges = async () => {
        setIsAsyncLoading(true);
        const full_name = `${firstName} ${lastName}`;
        const response = await makeApiCall(
            () => store.updateUser({ full_name, email, password }, user.id),
            'User updated successfully!',
            'Failed to update user.'
        );
        if (response) updateUserState(response);
    };

    const handleVerifyEmail = async () => {
        setIsAsyncLoading(true);
        const response = await makeApiCall(
            () => store.verifyEmail(user.email, user.id),
            'Verification link sent to your email!',
            'Failed to send verification link.'
        );
        if (response) router.push('/verify');
    };

    const handleCreateNewCategory = async () => {
        setIsAsyncLoading(true);
        await makeApiCall(
            () => store.createCategory(title, description ),
            'Category created successfully!',
            'Failed to create category.'
        ).then(() => { setTitle(''); setDescription('') });
    }

    const handleChangePassword = async () => {
        setIsAsyncLoading(true);
        const response = await makeApiCall(
            () => store.resetPassword(user.email),
            'Password reset link sent to your email!',
            'Failed to change password.'
        );
        if (response) router.push('/changePassword');
    }


    return (
        <div className="realtive w-screen h-screen bg-backgorund flex flex-col items-center justify-start overflow-auto" >
            <div className="absolute left-5 top-5 flex flex-row">
                <Button variant="link" className="text-xl font-bold text-color left-5 top-5 p-0" href="#">
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

                    <Link href="/posts">Smack Overslow</Link>
                    <Slash />
                </Button>
                <Button variant="link" className="text-xl font-bold text-color p-0">
                    <Link href="/profile">Profile</Link>
                </Button>

            </div>
            <div className="mx-auto flex flex-col space-y-5 p-5 lg:grid lg:grid-cols-3 lg:grid-row-2 lg:gap-5 lg:space-y-0 px-10 mt-16">
                <Card className="space-y-4 bg-backgorund">
                    <CardHeader>
                        <CardTitle className="text-color">Avatar</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">

                        <div className="space-y-2">

                            <div className="flex flex-col items-center space-y-4">

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

                                <div className="grid w-full max-w-sm items-center gap-2">
                                    <Label htmlFor="picture">Pick Avatar</Label>
                                    <Input id="picture" type="file" onChange={handleAvatarChangePreview} />
                                </div>
                                <Button className="w-full" onClick={handleAvatarSave} disabled={!avatarFile || isAsyncLoading}>
                                    Save Avatar
                                    {isAsyncLoading && (
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
                    <CardContent className="space-y-6">
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
                                    disabled={isPageLoading || isAsyncLoading}
                                    placeholder={user && user.full_name ? user.full_name.split(' ')[0] : 'Enter your first name'}
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
                                    disabled={isPageLoading || isAsyncLoading}
                                    placeholder={user && user.full_name ? user.full_name.split(' ')[1] : 'Enter your last name'}
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
                                disabled={isPageLoading || isAsyncLoading}
                                placeholder={user && user.email ? user.email : 'Enter your email'}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <Button className="w-full" onClick={handleSaveChanges} disabled={!firstName || !lastName || isAsyncLoading || isPageLoading}>Save Changes</Button>
                    </CardContent>
                </Card>
                <Card className="space-y-4 bg-background">
                    <CardHeader>
                        <CardTitle className="text-color">Account Information</CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-col space-y-4">

                        <div className="space-x-2 flex flex-row items-center">
                            <p className="dark:text-gray-200">Rating Score - </p>
                            <p className="text-lg font-bold dark:text-gray-300">4.5</p>
                        </div>
                        <div className="space-x-2 flex flex-row items-center ">
                            <p className="dark:text-gray-200">Role - </p>
                            <p className="text-lg font-bold dark:text-gray-300">{user && user.role}</p>
                        </div>
                        <div className="space-x-2 flex flex-row items-center ">
                            <p className="dark:text-gray-200">Email - </p>
                            {user.is_email_verified ?
                                <p className="text-lg font-bold dark:text-gray-300">Verified</p>
                                :
                                <Button onClick={handleVerifyEmail} disabled={isPageLoading}>Verify</Button>
                            }
                        </div>
                        <div className="space-x-2 flex flex-row items-center ">
                            <p className="dark:text-gray-200">Password - </p>
                            <Button variant="destructive" onClick={handleChangePassword }>Change Password</Button>
                        </div>

                    </CardContent>
                </Card>
                {user.role === 'admin' && (
                    <Card className="space-y-4 bg-background">
                        <CardHeader>
                            <CardTitle className="text-color">Create New User</CardTitle>
                        </CardHeader>

                        <CardContent className="px-10">

                            <UserAuthForm forAdmin={true} isLoading={isPageLoading} setIsLoading={toggleLoading} />

                        </CardContent>
                    </Card>
                )}
                {user.role === 'admin' && (<Card className="space-y-4 bg-background col-start-3 col-end-4">
                    <CardHeader>
                        <CardTitle className="text-color">Create New Category</CardTitle>
                    </CardHeader>

                    <CardContent className="grid gap-3 p-10">
                        <div>
                            <Label htmlFor="title">
                                Title
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="How to create placeholders?"
                                type="text"
                                autoCapitalize="none"
                                autoCorrect="off"
                                disabled={isPageLoading || isAsyncLoading}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="description">
                                Description
                            </Label>
                            <Input
                                id="description"
                                name="description"
                                placeholder="I want to know how to ..."
                                type="text"
                                autoCapitalize="none"
                                autoCorrect="off"
                                disabled={isPageLoading || isAsyncLoading}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <Button className="w-full" disabled={isPageLoading || isAsyncLoading || !title || !description} onClick={handleCreateNewCategory}>Create category</Button>
                    </CardContent>
                </Card>)}
            </div>
            {user.role === 'admin' && (<h1 className="text-3xl font-bold mt-16">User Managment</h1> && 
            <div className="w-full px-10 rounded-md border-solid border-2 border-ring border-opacity-75 my-12 lg:w-2/3">
                <DataTable />
            </div>)}
        </div>
    )
});

export default Component;

