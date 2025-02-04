import {
  AccessIcon,
  ArrowRight02Icon,
  CallIcon,
  ImageUploadIcon,
  Mail02Icon,
  UserIcon,
  ViewIcon,
  ViewOffIcon,
} from 'hugeicons-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [image, setImage] = useState<string | null>(null)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file) // Creates a temporary url for the image
      setImage(imageUrl)
    }
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
              <div className="h-[120px] w-[120px] rounded-[12px] bg-shape">
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Label
                  htmlFor="profilePicture"
                  className="group relative cursor-pointer"
                >
                  <ImageUploadIcon
                    size={32}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-base"
                  ></ImageUploadIcon>
                  <AspectRatio ratio={1} className="">
                    {image && (
                      <>
                        <img
                          src={image}
                          alt="Imagem Carregada"
                          className="h-full w-full rounded-[12px] object-cover transition duration-100 group-hover:brightness-50"
                        />
                        <ImageUploadIcon
                          size={32}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition duration-100 group-hover:opacity-100"
                        ></ImageUploadIcon>
                      </>
                    )}
                  </AspectRatio>
                </Label>
              </div>
              <Input
                id="name"
                placeholder="Seu nome completo"
                iconBefore={UserIcon}
                labelText="Nome"
                isFilled={false}
              />
              <Input
                id="phone"
                placeholder="(00) 00000-0000"
                iconBefore={CallIcon}
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
                iconBefore={Mail02Icon}
                labelText="E-mail"
                isFilled={false}
              />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha de acesso"
                iconBefore={AccessIcon}
                iconAfter={showPassword ? ViewOffIcon : ViewIcon}
                labelText="Senha"
                isFilled={false}
                onClickIconAfter={togglePasswordVisibility}
              />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Senha de acesso"
                iconBefore={AccessIcon}
                iconAfter={showConfirmPassword ? ViewOffIcon : ViewIcon}
                labelText="Confirmar Senha"
                isFilled={false}
                onClickIconAfter={toggleConfirmPasswordVisibility}
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
