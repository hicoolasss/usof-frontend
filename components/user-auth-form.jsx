"use client"
import React from "react";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Store from "@/store/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from 'sonner'

import { GitHub } from "iconoir-react";
import { Google } from "iconoir-react";

import Spinner from "@/components/ui/spinner";



export function UserAuthForm({ className, ...props }) {

  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegistration = async () => {
    setIsLoading(true);

    console.log("onSubmit");

    // Используйте значения состояния вместо FormData
    try {
      // Вызываем функцию регистрации
      await Store.registration(login, email, password);

      router.push('/');
      toast.success('Registration succssessful!', { duration: 2000 });

    } catch (error) {
      console.log("another error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>

      <div >
        <div className="grid gap-2">
          <div className="grid gap-3">

            <div>
              <Label htmlFor="login">
                Login
              </Label>
              <Input
                id="login"
                name="login"
                placeholder="login"
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>


            <div>
              <Label htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                placeholder="password"
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={handleRegistration} className="mt-1" disabled={isLoading}>
            {isLoading && (
              <Spinner className="animate-spin mr-2 w-5 h-5" />
            )}
            Sign In with Email
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
