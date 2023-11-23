'use client'
import React from 'react'
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import store from '@/store/store'
import { toast } from 'sonner'
import { useLogout } from '@/app/page'

export default function Component ({ params: { id } }) {
  const router = useRouter()
  const logout = useLogout()
  const [newPassword, setNewPassword] = React.useState('')
  const [confirmPassword, setconfirmPassword] = React.useState('')

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match', { duration: 2000 })
      return
    }
    try {
      // Отправляем обновленные данные на сервер
      const response = await store.changePassword(id, newPassword)
      console.log(response)
      if (response) {
        toast.success('Password changed successfully', { duration: 2000 })
        logout()
        router.push('/login')
      }
    } catch (error) {
      if (error.message) {
        toast.error(error.message, { duration: 2000 })
        console.error('Error', error.message)
      }
    }
  }
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <Card className='max-w-sm dark:bg-black dark:text-white'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold'>Reset Password</CardTitle>
          <CardDescription>Please enter your new password below</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='new-password'>New Password</Label>
              <Input
                id='new-password' required type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='confirm-password'>Confirm new Password</Label>
              <Input
                id='confirm-password' required type='password'
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
            </div>
            <div className='flex w-full space-x-2'>
              <Button className='w-full' variant='outline' onClick={() => router.push('/')}>
                Cancel
              </Button>
              <Button className='w-full' onClick={handleResetPassword}>
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
