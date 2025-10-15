import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const inter = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Clous Authentication',
  description: 'Signed in as a user',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Toaster/>
    </html>

  )
}
