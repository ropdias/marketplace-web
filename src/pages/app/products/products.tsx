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

import { ProductItem } from './product-item'

export function Products() {
  const [selectedValue, setSelectedValue] = useState<string>('')

  const clearSelection = () => {
    setSelectedValue('')
  }

  return (
    <div className="m-auto flex w-full max-w-[66.875rem] flex-1 flex-col gap-10 px-5 pb-5">
      <Helmet title="Produtos" />
      <div className="flex flex-col gap-2">
        <p className={cn('text-gray-500', getTailwindClass('font-title-md'))}>
          Seus Produtos
        </p>
        <p className={cn('text-gray-300', getTailwindClass('font-body-sm'))}>
          Acesse a sua lista de produtos à venda
        </p>
      </div>
      <div className="flex-start flex gap-6">
        <div className="flex h-full w-[20.4375rem] flex-none flex-col gap-6 rounded-[20px] bg-white p-6">
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
            </div>
            <Button size="medium" className="justify-center">
              Aplicar Filtro
            </Button>
          </div>
        </div>
        <div className="grid w-full grid-cols-2 grid-rows-3 gap-4">
          <ProductItem
            imgSrc="picture-1.png"
            productName="Sofá"
            productPrice={1200.9}
            productDescription="Sofá revestido em couro legítimo, com estrutura em madeira maciça e pés em metal cromado."
            category="Móvel"
            status="anunciado"
          />
          <ProductItem
            imgSrc="picture-2.png"
            productName="Camiseta masculina"
            productPrice={35.89}
            productDescription="Camiseta básica cinza, confeccionada em algodão 100%, com corte slim fit e gola redonda."
            category="Vestuário"
            status="anunciado"
          />
          <ProductItem
            imgSrc="picture-3.png"
            productName="Kit utensílios"
            productPrice={86.79}
            productDescription="Conjunto com 10 de cozinha, feitos medeira de bambu."
            category="Utensílio"
            status="anunciado"
          />
          <ProductItem
            imgSrc="picture-4.png"
            productName="Kit de cremes"
            productPrice={159.9}
            productDescription="Conjunto de cuidados com a pele contendo 3 cremes: hidratante facial, creme para as mãos e crememe anti-idade."
            category="Saúde & Beleza"
            status="anunciado"
          />
          <ProductItem
            imgSrc="picture-5.png"
            productName="Caderno de desenho"
            productPrice={56}
            productDescription="Caderno tamanho A4 com 120 páginas, gramatura de 180g/m², ideal para técnicas variadas como lápis, carvão e tinta."
            category="Papelaria"
            status="vendido"
          />
          <ProductItem
            imgSrc="picture-6.png"
            productName="Carro de brinquedo"
            productPrice={24.6}
            productDescription="Carrinho de brinquedo na cor amarela, feito de metal, com detalhes realistas."
            category="Brinquedo"
            status="desativado"
          />
        </div>
      </div>
    </div>
  )
}
