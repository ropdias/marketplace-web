import { zodResolver } from '@hookform/resolvers/zod'
import {
  AccessIcon,
  ArrowRight02Icon,
  Mail02Icon,
  ViewIcon,
  ViewOffIcon,
} from 'hugeicons-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSignIn } from '@/hooks/mutations/use-sign-in'
import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

const signInFormSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

type SignInFormInputs = z.infer<typeof signInFormSchema>

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormInputs>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const emailValue = watch('email')
  const passwordValue = watch('password')

  const isEmailFilled = !!emailValue
  const isPasswordFilled = !!passwordValue

  const { mutateAsync: authenticate } = useSignIn()

  const handleSignIn = async (data: SignInFormInputs) => {
    try {
      await authenticate({ email: data.email, password: data.password })

      navigate('/')
    } catch {
      // Error already handled in onError
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="flex min-h-full flex-col justify-between gap-20 rounded-[32px] bg-white px-20 py-[4.5rem]">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-2">
            <h1
              className={cn('text-gray-500', getTailwindClass('font-title-md'))}
            >
              Acesse sua conta
            </h1>
            <p
              className={cn('text-gray-300', getTailwindClass('font-body-sm'))}
            >
              Informe seu e-mail e senha para entrar
            </p>
          </div>
          <form id="sign-in-form" onSubmit={handleSubmit(handleSignIn)}>
            <div className="flex flex-col gap-5">
              <Input
                id="email"
                placeholder="Seu e-mail cadastrado"
                iconLeft={Mail02Icon}
                labelText="E-mail"
                isFilled={isEmailFilled}
                {...register('email')}
                {...(errors.email && { errorMessage: errors.email.message })}
              />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Sua senha de acesso"
                iconLeft={AccessIcon}
                iconRight={showPassword ? ViewOffIcon : ViewIcon}
                labelText="Senha"
                isFilled={isPasswordFilled}
                onClickIconRight={togglePasswordVisibility}
                {...register('password')}
                {...(errors.password && {
                  errorMessage: errors.password.message,
                })}
              />
            </div>
          </form>
          <Button disabled={isSubmitting} type="submit" form="sign-in-form">
            Acessar
            <ArrowRight02Icon />
          </Button>
        </div>
        <div className="flex flex-col justify-between gap-5">
          <p className={cn('text-gray-300', getTailwindClass('font-body-md'))}>
            Ainda não tem uma conta?
          </p>
          <Button asChild variant="outline">
            <Link to="/sign-up">
              Cadastrar
              <ArrowRight02Icon />
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
