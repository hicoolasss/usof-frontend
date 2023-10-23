import Image from 'next/image'
import { ModeToggle } from '@/components/theme-swithcer'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  justify-center p-24">
      <h1>Hello it's home page!</h1>
      <ModeToggle />
    </main>
  )
}
