'use client'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { Input } from '@/components/ui/input'
import { TextareaWithMarkdown } from '@/components/ui/textarea'
import { Slash } from 'iconoir-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import store from '@/store/store'
import router from 'next/navigation'
import { toast } from 'sonner'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export default function Component () {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }
  const [categories, setCategories] = useState([])

  const [user, setUser] = useState(store.user)

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData')
    console.log('storedUserData', storedUserData)

    if (storedUserData) {
      const userData = JSON.parse(storedUserData)
      setUser(userData)
    } else {
      toast.error('Please log in to check your profile!')
      router.push('/login')
    }
  }, [])

  const getCategories = async () => {
    try {
      const fetchedCategories = await store.getCategories() // Make sure 'store.getCategories()' is a valid function call
      setCategories(fetchedCategories)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  useEffect(() => {
    getCategories()
  }, []) // The empty array ensures this effect runs once after the initial render

  const handleSubmit = async () => {
    // Construct the payload
    const postData = {
      title,
      publish_date: new Date().toISOString(),
      status: 'active',
      content: description,
      categories: selectedCategory
    }

    // Make the API call to submit the data
    try {
      const response = await store.createPost(postData.title, postData.publish_date, postData.status, postData.content, postData.categories) // Replace with your actual API call
      console.log('Post created:', response)
      // Handle the response or navigate to another page
    } catch (error) {
      console.error('Failed to create post:', error)
    } finally {
      // Reset the form
      setTitle('')
      setDescription('')
      toast.success('Post created successfully!')
    }
  }

  return (
    <div className='bg-background h-full min-h-screen p-6'>
      <div className='absolute left-5 top-5 flex flex-row'>
        <Button variant='link' className='text-xl font-bold text-color left-5 top-5 p-0' href='#'>
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

          <Link href='/' className='ml-1'>Smack Overslow</Link>
          <Slash />
        </Button>
        <Button variant='link' className='text-xl font-bold text-color p-0'>
          <Link href='/createPost'>New Post</Link>
        </Button>

      </div>
      <div className='max-w-4xl mx-auto mt-16'>
        <h1 className='text-4xl text-white font-bold mb-4'>Create Post</h1>
        <div className='rounded-lg shadow p-6 border-solid border-2 border-ring border-opacity-50 space-y-10'>
          <div>
            <label className='block text-sm text-gray-700 dark:text-gray-300 mb-2' htmlFor='title'>
              Title
            </label>
            <Input
              className='block w-full p-2 border border-gray-300 rounded mb-4 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
              id='title'
              type='text'
              placeholder='How to create react app?'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <TextareaWithMarkdown
            className='block w-full p-2 border border-gray-300 rounded mb-4 h-24 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
            id='description'
            placeholder='Hi guys i`m new here and i want to know how to create react app, please help me!'
            description={description}
            setDescription={setDescription}
          />
          <div>
            <label className='block text-sm text-gray-700 dark:text-gray-300 mb-2' htmlFor='categories'>
              Categories
            </label>
            <Select
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className='w-full'>
                <SelectValue
                  className='block w-full p-2 rounded text-color'
                  placeholder='Select category...'
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[200px] justify-between"
                                >
                                    {value
                                        ? categories.find((categories) => categories.title === value)?.title
                                        : "Select framework..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search framework..." />
                                    <CommandEmpty>No framework found.</CommandEmpty>
                                    <CommandGroup>
                                        {categories.map((category) => (
                                            <CommandItem
                                                key={category._id}
                                                value={category.title}
                                                onSelect={(currentTitle) => {
                                                    setValue(currentTitle === title ? "" : currentTitle)
                                                    setOpen(false)
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        value === category.title ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {category.title}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover> */}
          </div>
          <div className='flex justify-center'>
            <Button className='w-2/3 mb-4' onClick={handleSubmit}>
              Create Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
