/**
 * v0 by Vercel.
 * @see https://v0.dev/t/LwqZEBWXtb8
 */
"use client"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import userAvatar from "../../resources/images/avatars/avatar1.jpg"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import { useStore } from '@/store/storeContext';

export default function Component() {

    const store = useStore();

    const [isLoading, setIsLoading] = useState(false);

    const [firstName, setFirstName] = useState('');

    const [lastName, setLastName] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [user, setUser] = useState(store.user);

    const [isAuth, setIsAuth] = useState(false);

    const [avatarFile, setAvatarFile] = useState(null);


    const handleAvatarChange = (event) => {
        setAvatarFile(event.target.files[0]);
        console.log('avatarFile', avatarFile);
    };

    useEffect(() => {
        if (store.user) {
            setEmail(store.user.email); // Обновляем email из store
            setPassword(store.user.password); // Обновляем password из store
        }
        if (store.user && store.user.full_name) {
            const parts = store.user.full_name.split(' ');
            if (parts.length > 0) {
                setFirstName(parts[0]);
                if (parts.length > 1) {
                    setLastName(parts.slice(1).join(' '));
                }
            }
        }
        console.log('store.user.profile_picture_path', store.user.profile_picture_path);
    }, [store.user]);

    useEffect(() => {

        async function checkAuthStatus() {
            try {
                await store.checkAuth();
                setIsLoading(false); // Снимаем индикатор загрузки
                setUser(store.user); // Сохраняем данные пользователя в локальном состоянии
            } catch (error) {
                console.error("Ошибка при проверке аутентификации:", error);
                setIsLoading(false); // Также снимаем индикатор загрузки в случае ошибки
            } finally {
                setIsLoading(false);
                setIsAuth(store.isAuth);
            }
        }
        // Вызываем асинхронную функцию
        checkAuthStatus().catch(console.error);

    }, [store]);


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

            if (avatarFile) {
                const avatarResponse = await store.uploadUserAvatar(user.id, avatarFile);
                console.log("avatarResponse", avatarResponse);
                // Обновляем данные пользователя с новым аватаром
                setUser({ ...response, profile_picture_path: avatarResponse.profile_picture_path });
                setAvatarFile(avatarResponse.profile_picture_path);
            } else {
                // Обновляем данные пользователя без изменения аватара
                setUser(response);
            }

            // Обновляем данные пользователя в состоянии
            setUser(response);
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
                            <Label className="dark:text-gray-200" htmlFor="avatar">
                                Avatar
                            </Label>
                            <div className="flex items-center gap-3">

                                <Image alt="User Avatar"
                                    className="rounded-full"
                                    height="48"
                                    
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${user.profile_picture_path}` || user.profile_picture_path || userAvatar}
                                    style={{
                                        aspectRatio: "48/48",
                                        objectFit: "cover",
                                    }}
                                    width="48">


                                </Image>

                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="picture">Picture</Label>
                                    <Input id="picture" type="file" onChange={handleAvatarChange} />
                                </div>
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
                        <div className="space-y-2">
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
                        </div>
                    </CardContent>
                </Card>
                <Button className="w-full" onClick={handleSaveChanges}>Save Changes</Button>
            </div>
        </div>
    )
}

