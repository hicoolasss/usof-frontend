"use client";
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { StoreContext } from '@/store/storeContext'
import store from '@/store/store'
const inter = Inter({ subsets: ['latin'] })

import { Toaster } from 'sonner'



export default function RootLayout({ children }) {
  
  return (
    <StoreContext.Provider value={store}>
      <html lang="en">
        <Toaster position="top-center" richColors className='p-24' />
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </StoreContext.Provider>
  )
}
