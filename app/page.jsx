// "use client"
// import { ModeToggle } from '@/components/theme-swithcer';
// import Link from 'next/link';
// import { Button } from "@/components/ui/button"
// import { useEffect, useState, useRef } from 'react';
// import { LogOut } from 'lucide-react';

// import Store from '@/store/store';

// import { useStore } from '@/store/storeContext';

// import { useRouter } from "next/navigation";

// import { toast } from 'sonner'

// import Spinner from '@/components/ui/spinner';



// export const useLogout = () => {
//   const router = useRouter();

//   const handleLogout = async () => {
//     try {
//       await Store.logout();
//       router.push('/');
//       toast.success('Logout successful!', { duration: 2000 });
//     } catch (error) {
//       if (error.message) {
//         toast.error(error.message, { duration: 2000 });
//       }
//       console.error("Error", error.message);
//     }
//   };

//   return handleLogout;
// };

// export default function Home() {

//   const store = useStore();
//   const logout = useLogout();
//   const [isLoading, setIsLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const [isAuth, setIsAuth] = useState(false);


//   useEffect(() => {

//     function checkAuthStatus() {
//       try {
//         store.checkAuth();
//         setIsAuth(store.isAuth);
//         setUser(store.user); // Сохраняем данные пользователя в локальном состоянии
//         setIsLoading(false); // Снимаем индикатор загрузки
//         console.log('user', store.user);
//       } catch (error) {
//         console.error("Ошибка при проверке аутентификации:", error);
//         setIsLoading(false); // Также снимаем индикатор загрузки в случае ошибки
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     // Вызываем асинхронную функцию
//     checkAuthStatus();

//   }, [store]);

//   return (

//     <main className="flex min-h-screen flex-col items-center justify-center ">

//       <h1>Hello, it&apos;s home page!</h1>

//       <div className='mt-5'>
//         <ModeToggle />
//       </div>

//       <Button variant="link" type="button" className="mt-5">
//         <Link href="/registration">
//           Go to Register
//         </Link>
//       </Button>

//       <Button variant="link" type="button" className="mt-5">
//         <Link href="/login">
//           Go to Login
//         </Link>
//       </Button>

//       <Button variant="link" type="button" className="mt-5">
//         <Link href="/home">
//           Go to Home
//         </Link>
//       </Button>

//       <Button variant="link" type="button" className="mt-5">
//         <Link href="/profile">
//           Go to Profile
//         </Link>
//       </Button>

//       <Button variant="outline" size="icon" onClick={logout} className="mt-5">
//         <LogOut className="h-4 w-4" />
//       </Button>

//       <div className='mt-5'>

//         {isLoading ? <Spinner className="animate-spin mr-2 w-5 h-5" /> : (isAuth || !isAuth) ? <h1>Hi, {user?.login}!</h1> : <h1>Hi, Guest</h1>}

//       </div>
//     </main>

//   );
// }



"use client"
import Link from "next/link"
import { Code, Learning, PeaceHand } from "iconoir-react"
import { Search } from "iconoir-react"
import { BadgeCheck, Undo } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JetBrains_Mono } from "next/font/google"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation"

import { toast } from 'sonner'
import Store from '@/store/store';
import { useStore } from "@/store/storeContext"
import { motion } from "framer-motion"
import Framer from "@/components/framer"
export const useLogout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await Store.logout();
      router.push('/login');
      toast.success('Logout successful!', { duration: 2000 });
    } catch (error) {
      if (error.message) {
        toast.error(error.message, { duration: 2000 });
      }
      console.error("Error", error.message);
    }
  };

  return handleLogout;
};

const JetBrains = JetBrains_Mono({ subsets: ['latin'] })

export default function Component() {
  const [theme, setTheme] = useState("system");

  const theme_temp = useTheme()

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) {
      setTheme(currentTheme);
    }
  }, [theme_temp])

  const store = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);


  useEffect(() => {

    function checkAuthStatus() {
      try {
        store.checkAuth();
        setIsAuth(store.isAuth);
        setUser(store.user); // Сохраняем данные пользователя в локальном состоянии
        setIsLoading(false); // Снимаем индикатор загрузки
        console.log('user', store.user);
      } catch (error) {
        console.error("Ошибка при проверке аутентификации:", error);
        setIsLoading(false); // Также снимаем индикатор загрузки в случае ошибки
      } finally {
        setIsLoading(false);
      }
    }
    // Вызываем асинхронную функцию
    checkAuthStatus();

  }, [store]);

  const x = 50;
  const y = 0;
  const rotate = 372;

  return (
    <section className="w-screen h-screen bg-background md:flex md:justify-center md:items-center lg:flex lg:justify-center lg:items-center">

      {/* <div className="absolute flex top-5 right-5 space-x-5">
        <div >
          <ModeToggle />
        </div>

        {theme === "light" ? (
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="secondary">
                <AlertTriangle size={16} color="#f5a623" />

              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-warning">
              <div key="someUniqueKey" className="flex justify-between space-x-4">

                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">Alert!</h4>
                  <p className="text-sm">
                    We strongly recommend  you use a dark theme
                  </p>
                  <div className="flex items-center pt-2">
                    <Code className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-xs font-bold">
                      Serikov Ilya
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        ) : (null)}
      </div> */}
      <Button variant="link" className="absolute text-xl font-bold text-color top-5 left-5 " >
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
            x={8.5}
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

      <div className="absolute top-5 right-5 flex items-center space-x-2">
        <Link href="/registration"><Button variant="outline">Sign up</Button></Link>
        <Link href="/login"><Button variant="ghost">Sign in</Button></Link>
      </div>

      <div className="flex flex-col justify-center items-center space-y-10 mt-16 p-5 md:mt-0 md:p-0 lg:mt-0 lg:p-0">


        <div className="space-y-5 relative flex flex-col items-center">
          <h1 className="text-center z-10 text-3xl font-bold sm:text-4xl md:text-5xl xl:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-color to-accent_color animate-text">
            Discover Our Interactive Q&A Platform
          </h1>
          <motion.h2 className="absolute rotate-12 text-transparent text-6xl font-extrabold -top-[20%] -left-[20%] transform -translate-x-1/2 -translate-y-1/2 bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 hover:animate-pulse z-0"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0, rotate: 336, transition: { delay: 0.5 } }}
            transition={{ duration: 1, loop: Infinity, type: "spring", stiffness: 50 }}
          >
            Innovate
          </motion.h2>
          <p className="max-w-[875px] z-10 text-sm  text-zinc-500 sm:text-l md:text-xl xl:text-2xl text-center">
            Engage in stimulating discussions, ask meaningful questions and provide insightful answers. Let&apos;s learn and grow together.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 w-3/4">
          <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
            <Framer>
              <Learning className="text-accent_color h-8 w-full mb-2 opacity-75 " />
            </Framer>
            <h2 className="text-l md:text-xl lg:text-xl font-bold text-color">User-friendly Interface</h2>
            <p className="text-accent-foreground dark:text-zinc-100">
              Navigating our platform is a breeze with our intuitive design.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
            <Framer>
              <Search className="text-accent_color h-8 w-full mb-2 opacity-75" />
            </Framer>
            <h2 className="text-l md:text-xl lg:text-xl font-bold text-color">Powerful Search</h2>
            <p className="text-accent-foreground dark:text-zinc-100">
              Implement a robust search engine that enables users to easily find relevant questions and answers.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
            <Framer>
              <PeaceHand className="text-accent_color h-8 w-full mb-2 opacity-75" />
            </Framer>

            <h2 className="text-l md:text-xl lg:text-xl font-bold text-color">Voting and Rating System</h2>
            <p className="text-accent-foreground dark:text-zinc-100">
              Allow users to upvote or downvote both questions and answers.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
            <Framer>
              <BadgeCheck className="text-accent_color h-8 w-full mb-2 opacity-75" />
            </Framer>
            <h2 className="text-l md:text-xl lg:text-xl font-bold text-color">Tagging and Categorization</h2>
            <p className="text-accent-foreground dark:text-zinc-100">
              Enable users to categorize questions with relevant tags or topics.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
            <Framer>
              <svg
                className=" text-accent_color h-8 w-full mb-2 opacity-75"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect height="11" rx="2" ry="2" width="18" x="3" y="11" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </Framer>
            <h2 className="text-l md:text-xl lg:text-xl font-bold text-color">Reliable Security</h2>
            <p className="text-accent-foreground dark:text-zinc-100">
              With Reliable Security, your data is always safe and protected.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
            <Framer>
              <svg
                className=" text-accent_color h-8 w-full mb-2 opacity-75"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m8 6 4-4 4 4" />
                <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
                <path d="m20 22-5-5" />
              </svg>
            </Framer>
            <h2 className="text-l md:text-xl lg:text-xl font-bold text-color">Knowledge Sharing</h2>
            <p className="text-accent-foreground dark:text-zinc-100">
              Share your insights and learn from others.
            </p>
          </div>
        </div>
        <div className="flex flex-col ">
          <Link href="/posts" className="w-full">
            <Button className="w-full">
              Let&apos;s Start!
            </Button>
          </Link>
          <div className={JetBrains.className}>
            <div className="flex flex-col md:flex-row l:flex-row  xl:flex-row  2xl:flex-row ">
              <h4 className="mt-5 text-gray font-JetBrains_Mono"> ▲ ~ How to create code snippent?</h4>
              <h4 className="mt-5 ml-1 text-highlight font-JetBrains_Mono">#React</h4>
            </div>
          </div>
          {/* <motion.div
            className="w-24 h-24 border-solid border-2 border-blue-500"
            animate={{ x, y, rotate }}
            transition={"spring"}
          /> */}
          <motion.h2 className="absolute rotate-12 text-transparent text-6xl font-extrabold top-2/3 left-24 bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 "
            initial={{ opacity: 0, x: -100 }} // Начальное состояние (невидимое и сдвинутое)
            animate={{ opacity: 1, x: 0, rotate: 372 }} // Конечное состояние при анимации (появление и вращение)
            transition={{ duration: 1, loop: Infinity, type: "spring", stiffness: 50 }}
          >
            Inspire
          </motion.h2>
          <motion.h2 className="absolute rotate-12 text-transparent text-6xl font-extrabold top-1/3 right-24 bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500"
            initial={{ opacity: 0, x: -100 }} // Начальное состояние (невидимое и сдвинутое)
            animate={{ opacity: 1, x: 0, rotate: 384, transition: { delay: 1 } }} // Конечное состояние при анимации (появление и вращение)
            transition={{ duration: 1, loop: Infinity, type: "spring", stiffness: 50 }}
          >
            Discover
          </motion.h2>
          <motion.h2 className="absolute rotate-12 text-transparent text-6xl font-bold top-[77%] left-[62%] text-center bg-clip-text bg-gradient-to-r from-fuchsia-600 to-pink-600 "
            initial={{ opacity: 0, y: 100 }} // Начальное состояние (невидимое и сдвинутое)
            animate={{ opacity: 1, y: 0, rotate: 0, transition: { delay: 1.5 } }} // Конечное состояние при анимации (появление и вращение)
            transition={{ duration: 1, loop: Infinity, type: "spring", stiffness: 50 }}
          >
            Try it!
          </motion.h2>
          <motion.div className="absolute top-[72%] left-[60%]"
            initial={{ opacity: 0, y: 100 }} // Начальное состояние (невидимое и сдвинутое)
            animate={{ opacity: 1, y: 0, rotate: 0, transition: { delay: 1.25 } }} // Конечное состояние при анимации (появление и вращение)
            transition={{ duration: 1, loop: Infinity, type: "spring", stiffness: 50 }}>
            <Undo className="w-16 h-16 rotate-12" />
          </motion.div>

        </div>
      </div>


    </section>
  )
}


