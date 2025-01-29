import { AccessIcon, Mail02Icon, ViewIcon, ViewOffIcon } from 'hugeicons-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { Input } from '@/components/ui/input'
import { getTailwindClass } from '@/lib/tailwindUtils'

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
          <div>
            <h1 className={getTailwindClass('font-title-md')}>
              Acesse sua conta
            </h1>
            <p className={getTailwindClass('font-body-sm')}>
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
        </div>
        <div>teste</div>
      </div>
    </>
  )
}
