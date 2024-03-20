'use client'
import React from 'react'
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/mOfamdIBdPw
 */
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Header from '@/components/header'
import UserCard from '@/components/user-card'
import UserCardsSkeleton from '@/components/user-cards-skeleton'
import store from '@/store/store'
import Footer from '@/components/footer'

export default function Component () {
  const [users, setUsers] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await store.getAllUsers() // Запрос к вашему API
        setUsers(response.data.data) // Обновление состояния пользователей
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false) // Отключение индикатора загрузки
      }
    }

    fetchUsers()
  }, [])

  return (
    <>
      <Header />
      <div className='flex flex-col w-full min-h-screen bg-background text-gray-900 dark:text-gray-50'>

        <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 bg-background mt-10'>
          <h1 className='font-semibold text-3xl mx-auto max-w-6xl mt-5'>Users</h1>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto auto-rows-fr'>
            {isLoading
              ? <UserCardsSkeleton /> // Рендерим скелетоны во время загрузки
              : users.map((user) => (
                <UserCard key={user._id} user={user} />
              ))}
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
