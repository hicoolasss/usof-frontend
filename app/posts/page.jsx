/**
 * v0 by Vercel.
 * @see https://v0.dev/t/rvDhDittPGA
 */
'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/theme-swithcer'
import Image from 'next/image'
import { useState, useEffect } from 'react'

import { Input } from '@/components/ui/input'
import { Search, HomeSimple, ShareIos, Telegram, Instagram } from 'iconoir-react'

import { useStore } from '@/store/storeContext'
import { useLogout } from '../page'

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar'

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
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

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
  Plus
} from 'lucide-react'

import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'

import { Post } from '@/components/post'

export default function Component () {
  const store = useStore()

  const logout = useLogout()

  const [isLoading, setIsLoading] = useState(true)

  const [user, setUser] = useState(store.user)

  const [posts, setPosts] = useState([])

  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData')
    console.log('home user data:', storedUserData)

    if (storedUserData) {
      // Инициализируем состояние данными пользователя из localStorage
      setUser(JSON.parse(storedUserData))
      setIsLoading(false)
    }
  }, [])

  const getPosts = async () => {
    try {
      const response = await store.getPosts()
      console.log('posts', response.data.data)
      setPosts(response.data.data)
    } catch (error) {
      console.error(error)
    } finally {
      toast.success('Posts loaded')
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div className='flex flex-col min-h-screen bg-background '>
      <header className='w-full h-16 px-4 lg:px-6 flex fixed items-center justify-between bg-background  border-b border-zinc-200 dark:border-zinc-800'>
        <div className='relative flex items-center '>
          <nav className='hidden lg:flex lg:w-full space-x-0  lg:space-x-8'>
            <Button variant='link' className='text-xl font-bold text-color ' href='#'>
              <svg
                className='mr-1'
                xmlns='http://www.w3.org/2000/svg'
                width='24px'
                height='24px'
                fill='none'
                strokeWidth='2'
                viewBox='0 0 24 24'
                color='var(--color)'
              >
                <rect
                  width={7}
                  height={5}
                  x={3}
                  y={2}
                  stroke='var(--color)'
                  strokeWidth='2'
                  rx='0.6'
                />
                <rect
                  width={7}
                  height={5}
                  x='8.5'
                  y={17}
                  stroke='var(--color)'
                  strokeWidth='2'
                  rx='0.6'
                />
                <rect
                  width={7}
                  height={5}
                  x={14}
                  y={2}
                  stroke='var(--color)'
                  strokeWidth='2'
                  rx='0.6'
                />
                <path
                  stroke='var(--color)'
                  strokeWidth='2'
                  d='M6.5 7v3.5a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7M12 12.5V17'
                />
              </svg>
              <Link href='/'>Smack Overslow</Link>

            </Button>
            {user
              ? (
                <Link href='/profile'>
                  <Button
                    variant='ghost'
                    className='text-base font-medium text-zinc-600 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'
                  >
                    Profile
                  </Button>
                </Link>
                )
              : null}

            <Link href='/users'>
              <Button
                variant='ghost'
                className='text-base font-medium text-zinc-600 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'
              >
                Users
              </Button>
            </Link>

            {user
              ? (
                <Link href='/createPost'>
                  <Button
                    variant='ghost'
                    className='text-base font-medium text-zinc-600 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'
                  >
                    New Post
                  </Button>
                </Link>
                )
              : null}

            <div className='relative justify-self-start hidden lg:flex md:flex items-center w-64 ml-8 md:ml-0 lg:ml-8 xl:ml-8'>
              <Button variant='ghost' size='icon' className='absolute'><Search className='w-5 h-5' /></Button>

              <Input
                className='indent-8'
                placeholder='Search'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </nav>
          <nav className='lg:hidden flex'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <MenuIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>Posts</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link href='/profile' className='flex flexs-row items-center'>
                      <User className='mr-2 h-4 w-4' />
                      Profile
                    </Link>

                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href='/' className='flex flexs-row items-center'>
                      <HomeSimple className='mr-2 h-4 w-4' />
                      Home
                    </Link>

                  </DropdownMenuItem>

                </DropdownMenuGroup>

                <DropdownMenuItem>
                  <Link href='/users' className='flex flexs-row items-center'>
                    <Users className='mr-2 h-4 w-4' />
                    <span>Users</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href='/createPost' className='flex flexs-row items-center'>
                    <Plus className='mr-2 h-4 w-4' />
                    <span>New Post</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <ShareIos className='mr-2 h-4 w-4' />
                    <span>Socials</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <Link href='https://web.telegram.org/#/im?p=@hicoolasss' target='_blank' className='flex flexs-row items-center' rel='noreferrer'>
                          <Telegram className='mr-2 h-4 w-4' />
                          <span>Telegram</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href='https://www.instagram.com/hicoolasss/' target='_blank' className='flex flexs-row items-center' rel='noreferrer'>
                          <Instagram className='mr-2 h-4 w-4' />
                          <span>Instagram</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href='https://github.com/hicoolasss' target='_blank' className='flex flexs-row items-center' rel='noreferrer'>
                          <Github className='mr-2 h-4 w-4' />
                          <span>Github</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className='mr-2 h-4 w-4' />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        <div className='flex items-center space-x-4  lg:space-x-4'>
          <div><ModeToggle /></div>
          {user
            ? (
              <Button className='hidden lg:inline-flex ' variant='outline' onClick={logout}>
                Sign Out
              </Button>)
            : (
              <Button
                variant='ghost'
                className='text-base font-medium text-zinc-600 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'
              >
                <Link href='/login'>Log in</Link>
              </Button>
              )}
          <Avatar>
            <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${user.profile_picture_path}`} style={{ objectFit: 'cover' }} quality={100} />
            <AvatarFallback>
              <Skeleton />
            </AvatarFallback>

          </Avatar>
        </div>
      </header>
      <main className='flex-grow py-8 px-4 md:px-6 mt-10'>
        <section className='max-w-3xl mx-auto space-y-8'>
          {posts.length > 1 && user &&
                        posts
                          .filter((post) =>
                            post.title.toLowerCase().includes(searchText.toLowerCase())
                          )
                          .map((post) => <Post key={post._id} post={post} />)}
        </section>
      </main>
      <footer className='w-full h-16 px-4 md:px-6 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800'>
        <p className='text-sm text-zinc-500 dark:text-zinc-400'>© 2023 Company Name. All rights reserved.</p>
        <nav className='hidden lg:flex space-x-4'>
          <Link
            className='text-sm text-zinc-600 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'
            href='#'
          >
            Terms
          </Link>
          <Link
            className='text-sm text-zinc-600 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'
            href='#'
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
