import { AccessIcon, Mail02Icon, ViewIcon } from 'hugeicons-react'
import { Helmet } from 'react-helmet-async'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getTailwindClass } from '@/lib/tailwindUtils'

export function SignIn() {
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
          <div>
            <Label
              htmlFor="email"
              className={getTailwindClass('font-label-md')}
            >
              E-mail
            </Label>
            <Input
              id="email"
              placeholder="Seu e-mail cadastrado"
              iconBefore={Mail02Icon}
            />
            <Input
              id="password"
              type="password"
              placeholder="Sua senha de acesso"
              iconBefore={AccessIcon}
              iconAfter={ViewIcon}
            />
          </div>
        </div>
        <div>teste</div>
      </div>
    </>
  )
}
