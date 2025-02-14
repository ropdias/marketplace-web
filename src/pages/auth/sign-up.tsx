import {
  AccessIcon,
  ArrowRight02Icon,
  CallIcon,
  Mail02Icon,
  UserIcon,
  ViewIcon,
  ViewOffIcon,
} from 'hugeicons-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

import { ProfileImageUploader } from './profile-image-uploader'

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev)
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="flex min-h-full flex-col justify-between gap-20 rounded-[32px] bg-white px-20 py-[72px]">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h1
              className={cn('text-gray-500', getTailwindClass('font-title-md'))}
            >
              Crie sua conta
            </h1>
            <p
              className={cn('text-gray-300', getTailwindClass('font-body-sm'))}
            >
              Informe os seus dados pessoais e de acesso
            </p>
          </div>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-5">
              <p
                className={cn(
                  getTailwindClass('font-title-sm'),
                  'text-gray-500',
                )}
              >
                Perfil
              </p>
              <ProfileImageUploader />
              <Input
                id="name"
                placeholder="Seu nome completo"
                iconLeft={UserIcon}
                labelText="Nome"
                isFilled={false}
              />
              <Input
                id="phone"
                placeholder="(00) 00000-0000"
                iconLeft={CallIcon}
                labelText="Telefone"
                isFilled={false}
              />
            </div>
            <div className="flex flex-col gap-5">
              <p
                className={cn(
                  getTailwindClass('font-title-sm'),
                  'text-gray-500',
                )}
              >
                Acesso
              </p>
              <Input
                id="email"
                placeholder="Seu e-mail de acesso"
                iconLeft={Mail02Icon}
                labelText="E-mail"
                isFilled={false}
              />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha de acesso"
                iconLeft={AccessIcon}
                iconRight={showPassword ? ViewOffIcon : ViewIcon}
                labelText="Senha"
                isFilled={false}
                onClickIconRight={togglePasswordVisibility}
              />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Senha de acesso"
                iconLeft={AccessIcon}
                iconRight={showConfirmPassword ? ViewOffIcon : ViewIcon}
                labelText="Confirmar Senha"
                isFilled={false}
                onClickIconRight={toggleConfirmPasswordVisibility}
              />
            </div>
            <Button>
              Cadastrar
              <ArrowRight02Icon />
            </Button>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-5">
          <p className={cn('text-gray-300', getTailwindClass('font-body-md'))}>
            Já tem uma conta
          </p>
          <Button asChild variant="outline">
            <Link to="/sign-in">
              Acessar
              <ArrowRight02Icon />
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
