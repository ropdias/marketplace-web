import { isAxiosError } from 'axios'

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

export function mapCreateSellerErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const status = error.response?.status

    if (status === 404) return 'Erro: O avatar não foi encontrado.'

    if (status === 409) return 'Erro: O e-mail ou telefone já existe.'
  }

  return ''
}
