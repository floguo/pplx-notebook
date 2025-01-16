import { Sidebar } from '@/components/sidebar'
import '@/app/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-[#202222]">
          <Sidebar />
          <main className="flex-1 flex flex-col bg-[#191A1A] m-2 rounded-xl">
            {children}
            <footer className="">
              <div className="max-w-7xl mx-auto px-6 py-3">
                <div className="flex justify-center items-center gap-6 text-sm">
                  <div className="flex items-center gap-6 text-gray-500">
                    <a href="#" className="hover:text-gray-300">Pro</a>
                    <a href="#" className="hover:text-gray-300">Enterprise</a>
                    <a href="#" className="hover:text-gray-300">Store</a>
                    <a href="#" className="hover:text-gray-300">Blog</a>
                    <a href="#" className="hover:text-gray-300">Careers</a>
                  </div>
                  <div className="flex items-center gap-6 text-gray-500">
                    <button className="hover:text-gray-300">
                      English (English)
                    </button>
                  </div>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </body>
    </html>
  )
}

