'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/theme-swithcer'
import Image from 'next/image'
import { useState, useEffect, useMemo } from 'react'

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
  Plus,
  Filter,
  FilterX
} from 'lucide-react'
import Filters from '@/components/filters'

import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'

import { Post } from '@/components/post'

import PostsCardSkeleton from '@/components/posts-skeleton'
import { usePathname } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function MyPostsPage () {
  const store = useStore()

  const logout = useLogout()

  const [isLoading, setIsLoading] = useState(true)

  const [user, setUser] = useState(null)

  const [posts, setPosts] = useState([])

  const [userPosts, setUserPosts] = useState([])

  const [currentPage, setCurrentPage] = useState(1)

  const postsPerPage = 10 // Здесь вы можете установить количество постов на странице

  const [isAsyncLoading, setIsAsyncLoading] = useState(false)

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData')
    console.log('user posts user data:', storedUserData)

    if (storedUserData) {
      // Инициализируем состояние данными пользователя из localStorage
      setUser(JSON.parse(storedUserData))
    }
  }, [])

  const getPosts = async () => {
    try {
      setIsAsyncLoading(true)
      const response = await store.getPosts()
      console.log('posts', response.data.data)
      setPosts(response.data.data)
      if (user) {
        const userPosts = response.data.data.filter(post => post.author_id === user.id)
        setUserPosts(userPosts)
        console.log('user posts', userPosts)
        console.log('user sf', user)
      }
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getPosts()
  }, [user])

  return (
    <>
      <div className='relative flex flex-col min-h-screen bg-background '>
        <Header />
        <main className='flex-grow py-8 px-4 md:px-6 mt-10 '>
          <section className='max-w-3xl mx-auto space-y-8'>
            {(userPosts.length > 0) && user &&
                            userPosts
                              .map((post) => <Post key={post._id} post={post} user={user} posts={userPosts} setPosts={setUserPosts} />)}
            {isLoading && <PostsCardSkeleton />}
            <div className='flex justify-between'>
              {userPosts.length > 1 && (
                <Button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  variant='outline'
                >
                  Previous
                </Button>
              )}
              {userPosts.length > 1 && (
                <Button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={userPosts.length < postsPerPage}
                >
                  Next
                </Button>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
