import { Suspense } from 'react'
import { Search } from '@/components/search'
import { PageSkeleton } from '@/components/page-skeleton'

export default function Home() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center -mt-32">
          <Search />
        </div>
        <div className="max-w-3xl mx-auto w-full px-4 mb-8">
        </div>
      </div>
    </Suspense>
  )
}

