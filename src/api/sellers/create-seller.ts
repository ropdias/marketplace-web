import { api } from '@/lib/axios'
import { Seller } from '@/types/seller'

export interface CreateSellerBody {
  name: string
  phone: string
  email: string
  avatarId: string | null
  password: string
  passwordConfirmation: string
}

export interface CreateSellerResponse {
  seller: Seller
}

export async function createSeller({
  name,
  phone,
  email,
  avatarId,
  password,
  passwordConfirmation,
}: CreateSellerBody) {
  const response = await api.post<CreateSellerResponse>('/sellers', {
    name,
    phone,
    email,
    avatarId,
    password,
    passwordConfirmation,
  })
  return response.data
}
