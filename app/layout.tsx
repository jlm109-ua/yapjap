import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'YapJap',
  description: 'Una aplicación para aprender Katakana y Hiragana',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between">
            <Link href="/" className="font-bold">YapJap!</Link>
            <Link href="/dictionary" className="hover:underline">Dictionary</Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}