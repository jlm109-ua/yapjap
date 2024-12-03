import Link from 'next/link'
import './globals.css'

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
      <body>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between">
            <Link href="/" className="font-bold">Learn Japanese</Link>
            <div className="space-x-4">
              <Link href="/dictionary" className="hover:underline">Syllables</Link>
              <Link href="/word-dictionary" className="hover:underline">Words</Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}