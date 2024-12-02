import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Learn Japanese',
  description: 'An application to learn Katakana, Hiragana, and Japanese words',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between">
            <Link href="/" className="font-bold">Learn Japanese</Link>
            <div className="space-x-4">
              <Link href="/dictionary" className="hover:underline">Syllable Dictionary</Link>
              <Link href="/word-dictionary" className="hover:underline">Word Dictionary</Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}