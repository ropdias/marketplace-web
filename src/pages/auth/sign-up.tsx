import { zodResolver } from '@hookform/resolvers/zod'
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
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

import { ProfileImageUploader } from './profile-image-uploader'

const signUpFormSchema = z
  .object({
    name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
    phone: z
      .string()
      .regex(
        /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
        'Telefone inválido, use o formato (XX) XXXXX-XXXX',
      ),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z
      .string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type SignUpFormInputs = z.infer<typeof signUpFormSchema>

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev)
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpFormSchema),
  })

  const nameValue = watch('name')
  const phoneValue = watch('phone')
  const emailValue = watch('email')
  const passwordValue = watch('password')
  const confirmPasswordValue = watch('confirmPassword')

  const isNameFilled = !!nameValue
  const isPhoneFilled = !!phoneValue
  const isEmailFilled = !!emailValue
  const isPasswordFilled = !!passwordValue
  const isConfirmPasswordFilled = !!confirmPasswordValue

  async function handleSignUp(data: SignUpFormInputs) {
    console.log(data)
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="flex min-h-full flex-col justify-between gap-20 rounded-[32px] bg-white px-20 py-[4.5rem]">
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
          <form
            className="flex flex-col gap-12"
            onSubmit={handleSubmit(handleSignUp)}
          >
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
                isFilled={isNameFilled}
                {...register('name')}
                {...(errors.name && { errorMessage: errors.name.message })}
              />
              <Input
                id="phone"
                placeholder="(00) 00000-0000"
                iconLeft={CallIcon}
                labelText="Telefone"
                isFilled={isPhoneFilled}
                {...register('phone')}
                {...(errors.phone && { errorMessage: errors.phone.message })}
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
                isFilled={isEmailFilled}
                {...register('email')}
                {...(errors.email && { errorMessage: errors.email.message })}
              />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha de acesso"
                iconLeft={AccessIcon}
                iconRight={showPassword ? ViewOffIcon : ViewIcon}
                labelText="Senha"
                onClickIconRight={togglePasswordVisibility}
                isFilled={isPasswordFilled}
                {...register('password')}
                {...(errors.password && {
                  errorMessage: errors.password.message,
                })}
              />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Senha de acesso"
                iconLeft={AccessIcon}
                iconRight={showConfirmPassword ? ViewOffIcon : ViewIcon}
                labelText="Confirmar Senha"
                onClickIconRight={toggleConfirmPasswordVisibility}
                isFilled={isConfirmPasswordFilled}
                {...register('confirmPassword')}
                {...(errors.confirmPassword && {
                  errorMessage: errors.confirmPassword.message,
                })}
              />
            </div>
            <Button disabled={isSubmitting} type="submit">
              Cadastrar
              <ArrowRight02Icon />
            </Button>
          </form>
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
