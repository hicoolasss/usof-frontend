'use client'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
// import { Icons } from "@/components/icons";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import Store from '@/store/store'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import Spinner from '@/components/ui/spinner'

import { EyeOff, Eye } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export function UserAuthForm ({ forAdmin, isLoading, setIsLoading, className, ...props }) {
  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRevealPwd, setIsRevealPwd] = useState(false)
  const [role, setRole] = useState('user')
  const [isAsyncLoading, setIsAsyncLoading] = useState(false)

  const router = useRouter()

  const validate = () => {
    if (!login) {
      toast.error('Login is required!', { duration: 2000 })
      return false
    }
    if (!email) {
      toast.error('Email is required!', { duration: 2000 })
      return false
    }
    if (!password) {
      toast.error('Password is required!', { duration: 2000 })
      return false
    }
    if (login.length < 4) {
      toast.error('Login must be at least 4 characters!', { duration: 2000 })
      return false
    }
    if (login.length > 20) {
      toast.error('Login must be less than 20 characters!', { duration: 2000 })
      return false
    }
    if (login.search(/\d/) === 1) {
      toast.error('Login should not contain numbers!', { duration: 2000 })
      return false
    }
    if (email.length < 4) {
      toast.error('Email must be at least 4 characters!', { duration: 2000 })
      return false
    }
    if (password.length < 4) {
      toast.error('Password must be at least 4 characters!', { duration: 2000 })
      return false
    }
    return true
  }

  const handleRegistration = async () => {
    setIsAsyncLoading(true)

    console.log('onSubmit')
    // Используйте значения состояния вместо FormData
    if (!validate()) {
      setIsAsyncLoading(false)
      return
    }
    try {
      if (forAdmin) {
        const response = await Store.createUserForAdmin(login, password, email, role)
        console.log('response:', response)
        toast.success('User created succssesfully!', { duration: 3000 })
      } else {
        // Вызываем функцию регистрации
        await Store.registration(login, email, password)

        router.push('/')
        toast.success('Registration succssessful!', { duration: 2000 })
      }
    } catch (error) {
      console.log('another error:', error)
      if (error.response?.data?.error) {
        toast.error(error.response.data.error, { duration: 2000 })
      }
    } finally {
      setLogin('')
      setEmail('')
      setPassword('')
      setIsRevealPwd(false)
      if (forAdmin) setRole('user') // Reset role if it's an admin form
      setIsAsyncLoading(false)
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div>
        <div className='grid gap-2'>
          <div className='grid gap-3'>

            <div>
              <Label htmlFor='login'>
                Login
              </Label>
              <Input
                id='login'
                name='login'
                placeholder='verycoollogin'
                type='text'
                autoCapitalize='none'
                autoCorrect='off'
                disabled={isLoading}
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor='user-create-email'>
                Email
              </Label>
              <Input
                id='user-create-email'
                name='user-create-email'
                placeholder='name@example.com'
                type='user-create-email'
                autoCapitalize='none'
                autoCorrect='off'
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {forAdmin && (
              <>
                <Label htmlFor='select'>
                  Role
                </Label>
                <Select id='select' onValueChange={setRole}>
                  <SelectTrigger className='w-full -mt-2'>
                    <SelectValue
                      className='block w-full p-2 rounded text-color'
                      placeholder='Select role'
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='user'>User</SelectItem>
                      <SelectItem value='admin'>Admin</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </>)}

            <div className='relative'>
              <Label htmlFor='password'>
                Password
              </Label>
              <Input
                id='password'
                name='password'
                placeholder='Password'
                type={isRevealPwd ? 'text' : 'password'}
                autoCapitalize='none'
                autoCorrect='off'
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                className='absolute bottom-1 right-2 h-8 w-8' size='icon' variant='ghost'

                onClick={() => setIsRevealPwd(prevState => !prevState)}

              >
                {isRevealPwd
                  ? (
                    <EyeOff className='h-5 w-5' />
                    )
                  : (
                    <Eye className='h-5 w-5' />
                    )}
                <span className='sr-only'>Toggle password visibility</span>
              </Button>
            </div>
          </div>

          <Button onClick={handleRegistration} className='mt-1' disabled={isLoading || !email || !login || !password}>
            {isAsyncLoading && (
              <Spinner className='animate-spin mr-2 w-5 h-5' />
            )}
            {forAdmin ? 'Create user' : 'Sign up'}
          </Button>
        </div>
      </div>
    </div>
  )
}
