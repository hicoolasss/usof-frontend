'use client'
import Link from 'next/link'
import { Code, Learning, PeaceHand, Search } from 'iconoir-react'
import { BadgeCheck, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { JetBrains_Mono } from 'next/font/google'
import { ModeToggle } from '@/components/theme-swithcer'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const JetBrains = JetBrains_Mono({ subsets: ['latin'] })

export default function Component () {
  const [theme, setTheme] = useState('system')

  const theme_temp = useTheme()

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme')
    if (currentTheme) {
      setTheme(currentTheme)
    }
  }, [theme_temp])

  return (
    <section className='w-screen h-screen bg-background md:flex md:justify-center md:items-center lg:flex lg:justify-center lg:items-center'>

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
      <Button variant='link' className='absolute text-xl font-bold text-color top-5 left-5 '>
        <svg
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
            x={8.5}
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

      <div className='flex flex-col justify-center items-center space-y-10 mt-16 p-5 md:mt-0 md:p-0 lg:mt-0 lg:p-0'>

        <div className='space-y-5 w-full flex flex-col items-center'>
          <h1 className='text-center text-3xl font-bold sm:text-4xl md:text-5xl xl:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-color to-accent_color animate-text'>
            Discover Our Interactive Q&A Platform
          </h1>
          <p className='max-w-[875px] text-sm  text-zinc-500 sm:text-l md:text-xl xl:text-2xl text-center'>
            Engage in stimulating discussions, ask meaningful questions and provide insightful answers. Let&apos;s learn and grow together.
          </p>
        </div>
        <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 w-3/4'>
          <div className='flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg'>
            <Learning className='text-accent_color h-6 w-full mb-2 opacity-75 hover:-translate-y-3 hover:scale-150 transition ease-in-out ' />
            <h2 className='text-l md:text-xl lg:text-xl font-bold text-color'>User-friendly Interface</h2>
            <p className='text-accent-foreground dark:text-zinc-100'>
              Navigating our platform is a breeze with our intuitive design.
            </p>
          </div>
          <div className='flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg'>
            <Search className='text-accent_color h-6 w-full mb-2 opacity-75 hover:-translate-y-3 hover:scale-150 transition ease-in-out' />
            <h2 className='text-l md:text-xl lg:text-xl font-bold text-color'>Powerful Search</h2>
            <p className='text-accent-foreground dark:text-zinc-100'>
              Implement a robust search engine that enables users to easily find relevant questions and answers.
            </p>
          </div>
          <div className='flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg'>

            <PeaceHand className='text-accent_color h-6 w-full mb-2 opacity-75 hover:-translate-y-3 hover:scale-150 transition ease-in-out' />

            <h2 className='text-l md:text-xl lg:text-xl font-bold text-color'>Voting and Rating System</h2>
            <p className='text-accent-foreground dark:text-zinc-100'>
              Allow users to upvote or downvote both questions and answers.
            </p>
          </div>
          <div className='flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg'>
            <BadgeCheck className='text-accent_color h-6 w-full mb-2 opacity-75 hover:-translate-y-3 hover:scale-150 transition ease-in-out' />
            <h2 className='text-l md:text-xl lg:text-xl font-bold text-color'>Tagging and Categorization</h2>
            <p className='text-accent-foreground dark:text-zinc-100'>
              Enable users to categorize questions with relevant tags or topics.
            </p>
          </div>
          <div className='flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg'>
            <svg
              className=' text-accent_color h-6 w-full mb-2 opacity-75 hover:-translate-y-3 hover:scale-150 transition ease-in-out'
              fill='none'
              height='24'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              viewBox='0 0 24 24'
              width='24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect height='11' rx='2' ry='2' width='18' x='3' y='11' />
              <path d='M7 11V7a5 5 0 0 1 10 0v4' />
            </svg>
            <h2 className='text-l md:text-xl lg:text-xl font-bold text-color'>Reliable Security</h2>
            <p className='text-accent-foreground dark:text-zinc-100'>
              With Reliable Security, your data is always safe and protected.
            </p>
          </div>
          <div className='flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg'>
            <svg
              className=' text-accent_color h-6 w-full mb-2 opacity-75 hover:-translate-y-3 hover:scale-150 transition ease-in-out'
              fill='none'
              height='24'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              viewBox='0 0 24 24'
              width='24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='m8 6 4-4 4 4' />
              <path d='M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22' />
              <path d='m20 22-5-5' />
            </svg>
            <h2 className='text-l md:text-xl lg:text-xl font-bold text-color'>Knowledge Sharing</h2>
            <p className='text-accent-foreground dark:text-zinc-100'>
              Share your insights and learn from others.
            </p>
          </div>
        </div>
        <div className='flex flex-col '>
          <Link href='/home' className='w-full'>
            <Button className='w-full'>
              Let&apos;s Start!
            </Button>
          </Link>
          <div className={JetBrains.className}>
            <div className='flex flex-col md:flex-row l:flex-row  xl:flex-row  2xl:flex-row '>
              <h4 className='mt-5 text-gray font-JetBrains_Mono'> ▲ ~ How to create code snippent?</h4>
              <h4 className='mt-5 ml-1 text-highlight font-JetBrains_Mono'>#React</h4>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
