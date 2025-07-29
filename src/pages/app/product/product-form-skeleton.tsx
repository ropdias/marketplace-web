import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

export function ProductFormSkeleton() {
  return (
    <div className="flex-start flex gap-6">
      <div className="flex-shrink-0">
        <Skeleton className="h-[21.25rem] w-[25.9375rem] rounded-[20px]" />
      </div>
      <div className="flex w-full flex-col gap-8 rounded-[20px] bg-white p-8">
        <div className="flex items-center justify-between">
          <p className={cn('text-gray-300', getTailwindClass('font-title-sm'))}>
            Dados do produto
          </p>
          <Skeleton className="h-[1.25rem] w-[4.875rem]" />
        </div>
        <form className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <div className="w-full">
                <Skeleton className="h-[3.9rem] w-full" />
              </div>
              <div className="w-[12.5rem] flex-shrink-0">
                <Skeleton className="h-[3.9rem] w-full" />
              </div>
            </div>
            <Skeleton className="h-[6.625rem] w-full" />
            <Skeleton className="h-[3.9rem] w-full" />
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              type="button"
              className="h-12 flex-1 justify-center"
              disabled
            >
              Cancelar
            </Button>
            <Button
              className="h-12 flex-1 justify-center"
              type="submit"
              disabled
            >
              Salvar e atualizar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
