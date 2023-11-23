/**
 * v0 by Vercel.
 * @see https://v0.dev/t/4wd6bSpsO81
 */
import React from 'react'
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import store from '@/store/store'

export default function Filters ({ filters, setFilters }) {
  const [categories, setCategories] = React.useState([])
  const getCategories = async () => {
    try {
      const fetchedCategories = await store.getCategories() // Make sure 'store.getCategories()' is a valid function call
      setCategories(fetchedCategories)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  React.useEffect(() => {
    getCategories()
  }, [])

  const handleAuthorChange = (e) => {
    setFilters({ ...filters, author: e.target.value })
  }

  const handleClearFilters = () => {
    setFilters({
      creationDate: '',
      category: '',
      titleSortBy: '',
      likesSortBy: '',
      commentsSortBy: '',
      authorsSortBy: ''
    })
  }

  return (
    <section className='absolute top-16 right-5 flex flex-col lg:flex-row h-2/3 '>
      <aside className='w-full lg:w-80 p-4 space-y-6'>
        <h2 className='text-xl font-semibold'>Filters</h2>
        <div>
          <h3 className='text-lg font-medium flex items-center'>
            <IconCalendar className='mr-2 h-5 w-5' />
            Creation Date
          </h3>
          <Select
            onValueChange={(selectedValue) => {
              setFilters({ ...filters, creationDate: selectedValue })
            }}
            value={filters.creationDate}
          >
            <SelectTrigger className='w-full'>
              <SelectValue
                placeholder='Select a date'
                value={filters.creationDate}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='today'>Today</SelectItem>
              <SelectItem value='thisWeek'>This Week</SelectItem>
              <SelectItem value='thisMonth'>This Month</SelectItem>
              <SelectItem value='thisYear'>This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <h3 className='text-lg font-medium flex items-center'>
            <IconTag className='mr-2 h-5 w-5' />
            Category
          </h3>
          <Select
            onValueChange={(selectedValue) => {
              setFilters({ ...filters, category: selectedValue })
            }}
            value={filters.category}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select a category' />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <h3 className='text-lg font-medium flex items-center'>
            <IconSearch className='mr-2 h-5 w-5' />
            Title
          </h3>
          <Select
            onValueChange={(selectedValue) => {
              setFilters({ ...filters, titleSortBy: selectedValue })
            }}
            value={filters.titleSortBy}
          >
            <SelectTrigger className='w-full mt-2'>
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='asc'>Ascending</SelectItem>
              <SelectItem value='desc'>Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <h3 className='text-lg font-medium flex items-center'>
            <IconHeart className='mr-2 h-5 w-5' />
            Likes
          </h3>
          <Select
            onValueChange={(selectedValue) => {
              setFilters({ ...filters, likesSortBy: selectedValue })
            }}
            value={filters.likesSortBy}
          >
            <SelectTrigger className='w-full mt-2'>
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='asc'>Ascending</SelectItem>
              <SelectItem value='desc'>Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <h3 className='text-lg font-medium flex items-center'>
            <IconMessagesquare className='mr-2 h-5 w-5' />
            Comments
          </h3>
          <Select
            onValueChange={(selectedValue) => {
              setFilters({ ...filters, commentsSortBy: selectedValue })
            }}
            value={filters.commentsSortBy}
          >
            <SelectTrigger className='w-full mt-2'>
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='asc'>Ascending</SelectItem>
              <SelectItem value='desc'>Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <h3 className='text-lg font-medium flex items-center'>
            <IconUser className='mr-2 h-5 w-5' />
            Author
          </h3>
          <Input
            className='w-full' placeholder='login' type='text'
            value={filters.author}
            onChange={handleAuthorChange}
          />
          <Select
            onValueChange={(selectedValue) => {
              setFilters({ ...filters, authorsSortBy: selectedValue })
            }}
            value={filters.authorsSortBy}
          >
            <SelectTrigger className='w-full mt-2'>
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='asc'>Ascending</SelectItem>
              <SelectItem value='desc'>Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className='w-full' variant='destructive' onClick={handleClearFilters}>
          Clear Filters
        </Button>
      </aside>
    </section>
  )
}

function IconCalendar (props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <rect width='18' height='18' x='3' y='4' rx='2' ry='2' />
      <line x1='16' x2='16' y1='2' y2='6' />
      <line x1='8' x2='8' y1='2' y2='6' />
      <line x1='3' x2='21' y1='10' y2='10' />
    </svg>
  )
}

function IconHeart (props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' />
    </svg>
  )
}

function IconMessagesquare (props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
    </svg>
  )
}

function IconSearch (props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='11' cy='11' r='8' />
      <path d='m21 21-4.3-4.3' />
    </svg>
  )
}

function IconTag (props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z' />
      <path d='M7 7h.01' />
    </svg>
  )
}

function IconUser (props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
      <circle cx='12' cy='7' r='4' />
    </svg>
  )
}
