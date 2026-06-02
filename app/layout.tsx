import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Link from 'next/link'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'DevLearn - Learn Development Fundamentals',
  description: 'Free, open learning platform for development fundamentals including Git, GitHub, HTML, CSS, JavaScript, and CI/CD.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="font-sans antialiased bg-background text-foreground">
        <div className="flex flex-col min-h-screen">
          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-border bg-background/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-bold mb-4">DevLearn</h3>
                  <p className="text-sm text-muted-foreground">Free and open learning platform for development fundamentals.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Resources</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="/courses" className="hover:text-foreground transition-colors">All Courses</Link></li>
                    <li><a href="https://github.com/s8rr/learn" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a></li>
                    <li><a href="https://sabbir.cc" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Made by Sabbir</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-border pt-8">
                <p className="text-sm text-muted-foreground text-center">
                  © 2026 DevLearn. Free and open-source learning platform.
                </p>
              </div>
            </div>
          </footer>
        </div>

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
