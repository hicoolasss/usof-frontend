import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
export default function UserCard ({ user }) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center gap-4'>
        <Avatar className='h-9 w-9'>
          <AvatarImage alt='@user' src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${user.profile_picture_path}`} />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className='grid gap-1'>
          <CardTitle>{user.login}</CardTitle>
          <CardDescription>{user.full_name ? user.full_name : 'Unknown'}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className='grid gap-2'>
        <div className='text-sm font-semibold'>Role: {user.role}</div>
        <div className='flex items-center gap-4 text-sm'>
          <Badge>Rating: {user.rating}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
