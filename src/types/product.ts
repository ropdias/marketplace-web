import { Seller } from './seller'

export enum ProductStatus {
  AVAILABLE = 'available',
  SOLD = 'sold',
  CANCELLED = 'cancelled',
}

export interface Category {
  id: string
  title: string
  slug: string
}

export interface Attachment {
  id: string
  url: string
}

export interface Product {
  id: string
  title: string
  description: string
  priceInCents: number
  status: ProductStatus
  owner: Seller
  category: Category
  attachments: Attachment[]
}

export interface ChangeProductStatusResponse {
  product: Product
}

export interface GetCategoriesResponse {
  categories: Category[]
}

export const mockCategories = [
  {
    id: 'd6c53c7e-b6e5-4c0c-96b6-b7b3913dc92c',
    title: 'Brinquedo',
    slug: 'brinquedo',
  },
  {
    id: 'a1f04d7a-6d7a-41d0-b527-9b1234f1a123',
    title: 'Móvel',
    slug: 'movel',
  },
  {
    id: 'b2a39ef1-46c2-4b09-b1ce-84596f7c83ea',
    title: 'Papelaria',
    slug: 'papelaria',
  },
  {
    id: '39e6818d-9615-476b-a1c2-df2d153b441e',
    title: 'Saúde & Beleza',
    slug: 'saude-e-beleza',
  },
  {
    id: '2cd32127-cf69-4892-84b6-70f54f258d58',
    title: 'Utensílio',
    slug: 'utensilio',
  },
  {
    id: '19f41399-109c-42a9-8e10-86dbdf8c4f89',
    title: 'Vestuário',
    slug: 'vestuario',
  },
]

export const mockOwner = {
  id: 'owner-1',
  name: 'John Doe',
  phone: '11999999999',
  email: 'john@example.com',
  avatar: {
    id: 'avatar-1',
    url: '/avatars/avatar-1.png',
  },
}

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Sofá',
    description:
      'Sofá revestido em couro legítimo, com estrutura em madeira maciça e pés em metal cromado.',
    priceInCents: 120090,
    status: ProductStatus.AVAILABLE,
    category: mockCategories[1],
    owner: mockOwner,
    attachments: [
      {
        id: 'img-1',
        url: '/picture-1.png',
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
    category: mockCategories[5],
    owner: mockOwner,
    attachments: [
      {
        id: 'img-2',
        url: '/picture-2.png',
      },
    ],
  },
  {
    id: '3',
    title: 'Kit utensílios',
    description: 'Conjunto com 10 de cozinha, feitos madeira de bambu.',
    priceInCents: 8679,
    status: ProductStatus.AVAILABLE,
    category: mockCategories[4],
    owner: mockOwner,
    attachments: [
      {
        id: 'img-3',
        url: '/picture-3.png',
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
    category: mockCategories[3],
    owner: mockOwner,
    attachments: [
      {
        id: 'img-4',
        url: '/picture-4.png',
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
    category: mockCategories[2],
    owner: mockOwner,
    attachments: [
      {
        id: 'img-5',
        url: '/picture-5.png',
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
    category: mockCategories[0],
    owner: mockOwner,
    attachments: [
      {
        id: 'img-6',
        url: '/picture-6.png',
      },
    ],
  },
]
