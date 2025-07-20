export enum ProductStatus {
  AVAILABLE = 'available',
  SOLD = 'sold',
  CANCELLED = 'cancelled',
}

export interface Avatar {
  id: string
  url: string
}

export interface Owner {
  id: string
  name: string
  phone: string
  email: string
  avatar: Avatar | null
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
  owner: Owner
  category: Category
  attachments: Attachment[]
}

export interface CreateProductBody {
  title: string
  categoryId: string
  description: string
  priceInCents: number
  attachmentsIds: string[]
}

export interface CreateProductResponse {
  product: Product
}

export interface ListAllProductsResponse {
  products: Product[]
}

export interface GetProductResponse {
  product: Product
}

export interface EditProductRequestBody {
  title: string
  categoryId: string
  description: string
  priceInCents: number
  attachmentsIds: string[]
}

export interface EditProductResponse {
  product: Product
}

export interface ChangeProductStatusResponse {
  product: Product
}

export interface GetCategoriesResponse {
  categories: Category[]
}
