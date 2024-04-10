import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} relative h-full font-sans antialiased`}
      >
        <main className="flex flex-col min-h-screen relative">
          <div className="flex-grow flex-1">{children}</div>
        </main>
      </body>
    </html>
  )
}
