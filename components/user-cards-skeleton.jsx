import { Skeleton } from './ui/skeleton'
import { CardHeader, CardContent, Card } from '@/components/ui/card'
export default function UserCardsSkeleton () {
  return [...Array(9)].map((_, index) => (
    <Card key={index} className='w-[314px] h-[176px] rounded-md border bg-card'>
      <CardHeader className='flex flex-row items-center gap-4'>
        <Skeleton className='w-9 h-9 rounded-full' />
        <div className='grid gap-1'>
          <Skeleton className='w-20 h-5' />
          <Skeleton className='w-40 h-5' />

        </div>
      </CardHeader>
      <CardContent className='grid gap-2'>
        <Skeleton className='w-20 h-5' />
        <Skeleton className='w-20 h-5 bg-color rounded-xl' />
      </CardContent>
    </Card>
  ))
}
