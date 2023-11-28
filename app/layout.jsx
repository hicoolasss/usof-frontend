"use client";
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { StoreContext } from '@/store/storeContext'
import store from '@/store/store'
import { useState } from 'react';
import { useLogout } from './page';

import { UserProvider } from '@/store/userContext';
const inter = Inter({ subsets: ['latin'] })

import { Toaster } from 'sonner'



export default function RootLayout({ children }) {

  const [user, setUser] = useState(null);

  const logout = useLogout();


  return (
    <StoreContext.Provider value={store}>
      <UserProvider>
        <html lang="en">
          <Toaster position="top-center" richColors className='p-24' />
          <body className={inter.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </body>
        </html>
      </UserProvider>
    </StoreContext.Provider>
  )
}
