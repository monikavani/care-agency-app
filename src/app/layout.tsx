import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ShiftProvider } from '@/context/ShiftContext';
import ClientOnly from '@/components/ClientOnly';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Care Agency App',
  description: 'Manage caregiver shifts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <ClientOnly>
          <ShiftProvider>
            <main className="container mx-auto p-4 min-h-screen">
              {children}
            </main>
          </ShiftProvider>
        </ClientOnly>
      </body>
    </html>
  )
}