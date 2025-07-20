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
import { Product, ProductStatus } from '@/types/product'

import { ProductItem } from './product-item'

const mockOwner = {
  id: 'owner-1',
  name: 'John Doe',
  phone: '11999999999',
  email: 'john@example.com',
  avatar: {
    id: 'avatar-1',
    url: '/avatars/avatar-1.png',
  },
}

const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Sofá',
    description:
      'Sofá revestido em couro legítimo, com estrutura em madeira maciça e pés em metal cromado.',
    priceInCents: 120090,
    status: ProductStatus.AVAILABLE,
    category: {
      id: 'cat-1',
      title: 'Móvel',
      slug: 'movel',
    },
    owner: mockOwner,
    attachments: [
      {
        id: 'img-1',
        url: 'picture-1.png',
      },
    ],
  },
  {
    id: '2',
    title: 'Camiseta masculina',
    description:
      'Camiseta básica cinza, confeccionada em algodão 100%, com corte slim fit e gola redonda.',
    priceInCents: 3589,
    status: ProductStatus.AVAILABLE,
    category: {
      id: 'cat-2',
      title: 'Vestuário',
      slug: 'vestuario',
    },
    owner: mockOwner,
    attachments: [
      {
        id: 'img-2',
        url: 'picture-2.png',
      },
    ],
  },
  {
    id: '3',
    title: 'Kit utensílios',
    description: 'Conjunto com 10 de cozinha, feitos madeira de bambu.',
    priceInCents: 8679,
    status: ProductStatus.AVAILABLE,
    category: {
      id: 'cat-3',
      title: 'Utensílio',
      slug: 'utensilio',
    },
    owner: mockOwner,
    attachments: [
      {
        id: 'img-3',
        url: 'picture-3.png',
      },
    ],
  },
  {
    id: '4',
    title: 'Kit de cremes',
    description:
      'Conjunto de cuidados com a pele contendo 3 cremes: hidratante facial, creme para as mãos e creme anti-idade.',
    priceInCents: 15990,
    status: ProductStatus.AVAILABLE,
    category: {
      id: 'cat-4',
      title: 'Saúde & Beleza',
      slug: 'saude-beleza',
    },
    owner: mockOwner,
    attachments: [
      {
        id: 'img-4',
        url: 'picture-4.png',
      },
    ],
  },
  {
    id: '5',
    title: 'Caderno de desenho',
    description:
      'Caderno tamanho A4 com 120 páginas, gramatura de 180g/m², ideal para técnicas variadas como lápis, carvão e tinta.',
    priceInCents: 5600,
    status: ProductStatus.SOLD,
    category: {
      id: 'cat-5',
      title: 'Papelaria',
      slug: 'papelaria',
    },
    owner: mockOwner,
    attachments: [
      {
        id: 'img-5',
        url: 'picture-5.png',
      },
    ],
  },
  {
    id: '6',
    title: 'Carro de brinquedo',
    description:
      'Carrinho de brinquedo na cor amarela, feito de metal, com detalhes realistas.',
    priceInCents: 2460,
    status: ProductStatus.CANCELLED,
    category: {
      id: 'cat-6',
      title: 'Brinquedo',
      slug: 'brinquedo',
    },
    owner: mockOwner,
    attachments: [
      {
        id: 'img-6',
        url: 'picture-6.png',
      },
    ],
  },
]

export function Products() {
  const [selectedValue, setSelectedValue] = useState<string>('')

  const clearSelection = () => {
    setSelectedValue('')
  }

  return (
    <>
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
          {mockProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  )
}
