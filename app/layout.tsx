import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/nav'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Room Availability | Devscope',
  description: 'The availability of the room inside the Devscope facility.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} relative h-full scroll-smooth font-sans antialiased bg-zinc-900 text-white`}
      >
        <main className="flex flex-col min-h-screen relative">
          <Toaster richColors className="cursor-default" />
          <Nav />
          <div className="flex-grow flex-1">{children}</div>
        </main>
      </body>
    </html>
  )
}
