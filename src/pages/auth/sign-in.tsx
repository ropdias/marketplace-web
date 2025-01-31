import {
  AccessIcon,
  ArrowRight02Icon,
  Mail02Icon,
  ViewIcon,
  ViewOffIcon,
} from 'hugeicons-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="flex min-h-full flex-col justify-between gap-4 rounded-[32px] bg-white px-20 py-[72px]">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-2">
            <h1 className={getTailwindClass('font-title-md')}>
              Acesse sua conta
            </h1>
            <p
              className={cn('text-gray-300', getTailwindClass('font-body-sm'))}
            >
              Informe seu e-mail e senha para entrar
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <Input
              id="email"
              placeholder="Seu e-mail cadastrado"
              iconBefore={Mail02Icon}
              labelText="E-mail"
              isFilled
              errorMessage="Helper text"
            />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Sua senha de acesso"
              iconBefore={AccessIcon}
              iconAfter={showPassword ? ViewOffIcon : ViewIcon}
              labelText="Senha"
              isFilled={false}
              onClickIconAfter={togglePasswordVisibility}
            />
          </div>
          <Button>
            Acessar
            <ArrowRight02Icon />
          </Button>
        </div>
        <div className="flex flex-col justify-between gap-5">
          <p className={cn('text-gray-300', getTailwindClass('font-body-md'))}>
            Ainda não tem uma conta?
          </p>
          <Button variant="outline">
            Cadastrar
            <ArrowRight02Icon />
          </Button>
        </div>
      </div>
    </>
  )
}
