import { SaleTag02Icon, Search01Icon } from 'hugeicons-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

export function Products() {
  const [selectedValue, setSelectedValue] = useState<string>('')
  const [selectedValue2, setSelectedValue2] = useState<string>('')

  const clearSelection = () => {
    setSelectedValue('')
  }

  const clearSelection2 = () => {
    setSelectedValue2('')
  }

  console.log(selectedValue)

  return (
    <div className="m-auto flex w-full max-w-[66.875rem] flex-1 flex-col gap-10 px-5">
      <Helmet title="Produtos" />
      <div className="flex flex-col gap-2">
        <p className={cn('text-gray-500', getTailwindClass('font-title-md'))}>
          Seus Produtos
        </p>
        <p className={cn('text-gray-300', getTailwindClass('font-body-sm'))}>
          Acesse gerencie a sua lista de produtos à venda
        </p>
      </div>
      <div className="flex-start flex gap-6">
        <div className="flex w-[20.4375rem] flex-none flex-col gap-6 rounded-[20px] bg-white p-6">
          <p className={cn('text-gray-300', getTailwindClass('font-title-sm'))}>
            Filtrar
          </p>
          <div className="flex w-full flex-col gap-10">
            <div className="flex flex-col gap-5">
              <Input
                id="search"
                isFilled={false}
                placeholder="Pesquisar"
                iconLeft={Search01Icon}
              ></Input>
              <Select value={selectedValue} onValueChange={setSelectedValue}>
                <SelectTrigger
                  iconLeft={SaleTag02Icon}
                  onClear={clearSelection}
                  selectedValue={selectedValue}
                >
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="announced">Anunciado</SelectItem>
                  <SelectItem value="sold">Vendido</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedValue2} onValueChange={setSelectedValue2}>
                <SelectTrigger
                  labelText="TESTE"
                  onClear={clearSelection2}
                  selectedValue={selectedValue2}
                >
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="announced">Anunciado</SelectItem>
                  <SelectItem value="sold">Vendido</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button size="medium" className="justify-center">
              Aplicar Filtro
            </Button>
          </div>
        </div>
        <div className="w-full"></div>
      </div>
    </div>
  )
}
