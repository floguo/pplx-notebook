import { Skeleton } from "@/components/ui/skeleton"

export function PageSkeleton() {
  return (
    <div className="flex-1 max-w-3xl mx-auto w-full pt-12 px-4">
      <Skeleton className="h-8 w-96 mb-8 mx-auto" />
      
      <div className="rounded-2xl border border-neutral-700/30 bg-[#202020]/80">
        <Skeleton className="h-[120px] w-full rounded-t-2xl" />
        <div className="flex items-center px-4 py-3 border-t border-neutral-800/40">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Skeleton className="h-5 w-10 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
} 