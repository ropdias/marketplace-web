import { Skeleton } from '@/components/ui/skeleton'
import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

export function ProductItemSkeleton() {
  return (
    <div className="relative flex w-full cursor-pointer flex-col gap-1 rounded-[20px] bg-white p-1 outline-none">
      <Skeleton className="flex h-[9rem] w-full items-center justify-center rounded-[16px]" />

      <div className="flex flex-col gap-2 px-3 pb-4 pt-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-[1.1875rem] w-[6rem]" />

          <div className="flex items-baseline justify-center gap-1">
            <span
              className={cn('text-gray-500', getTailwindClass('font-label-md'))}
            >
              R$
            </span>
            <Skeleton className="h-[1.35rem] w-[3rem]" />
          </div>
        </div>
        <Skeleton className="h-[1.05rem] w-full" />
        <Skeleton className="mt-[-0.25rem] h-[1.05rem] w-full" />
      </div>
    </div>
  )
}
