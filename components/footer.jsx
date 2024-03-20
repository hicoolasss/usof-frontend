import Link from 'next/link'
export default function Footer () {
  return (
    <footer className='w-full h-16 px-4 md:px-6 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800'>
      <p className='text-sm text-zinc-500 dark:text-zinc-400'>© 2023 Smack Overslow. All rights reserved.</p>
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
  )
}
