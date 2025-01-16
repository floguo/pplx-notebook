'use client'

import { Sidebar } from '@/components/sidebar'
import '@/app/globals.css'
import { Toaster } from 'sonner'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { Footer } from '@/components/footer'
import { usePathname } from 'next/navigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const showFooter = !pathname.includes('/notebook/')

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-[#202222]">
          <Sidebar />
          <main className="flex-1 flex flex-col bg-[#191A1A] border border-neutral-800 m-3 rounded-xl">
            {children}
            {showFooter && <Footer />}
          </main>
        </div>
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: '#1E1E1E',
              border: '1px solid rgba(82, 82, 82, 0.3)',
              color: 'rgba(229, 229, 229, 0.8)',
            },
            className: "gap-3",
            descriptionClassName: "text-neutral-400/70",
          }}
          icons={{
            success: <CheckCircle className="w-5 h-5 stroke-[1.5]" />,
            error: <AlertCircle className="w-5 h-5 stroke-[1.5]" />
          }}
        />
      </body>
    </html>
  )
}

