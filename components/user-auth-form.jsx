"use client"
import React from "react";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Store from "@/store/store";

export function UserAuthForm({ className, ...props }) {
  const [isLoading, setIsLoading] = React.useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    console.log("onSubmit");
  
    // сбор данных из формы
    const formData = new FormData(event.target);
    const login = formData.get('login');
    const email = formData.get('email');
    //const fullName = formData.get('fullName'); // Если fullName не обрабатывается в registration, его следует исключить
    const password = formData.get('password');
  
    try {
      // Вызываем функцию регистрации
      await Store.registration(login, email, password); // Мы предполагаем, что Store доступен в вашем контексте
      // после успешной регистрации, вы можете, например, перенаправить пользователя на другую страницу
    } catch (error) {
      // Ошибки обрабатываются внутри функции registration, здесь можно обработать состояние UI, например, показать сообщение об ошибке
      console.log("another error:",error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
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
              <Label htmlFor="fullName">
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="full name (optional)"
                type="text"
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

          <Button className="mt-1" disabled={isLoading}>
            {/* {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )} */}
            Sign In with Email
          </Button>
        </div>
      </form>
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
