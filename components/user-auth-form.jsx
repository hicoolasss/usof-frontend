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
import { Toaster, toast } from 'sonner'

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
              />
            </div>
          </div>

          <Button onClick={handleRegistration} className="mt-1" disabled={isLoading}>
            {/* {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )} */}
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
      <Button variant="outline" type="button" disabled={isLoading}>
        {/* {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "} */}
        Github
      </Button>
    </div>
  );
}
