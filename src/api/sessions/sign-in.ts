import { isAxiosError } from 'axios'

import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
  password: string
}

export async function signIn({ email, password }: SignInBody) {
  await api.post('/sellers/sessions', { email, password })
}

export function mapSignInErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const status = error.response?.status

    if (status === 403) return 'Erro: Credenciais inválidas.'
  }

  return ''
}
