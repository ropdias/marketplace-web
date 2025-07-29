import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Logout01Icon, UserIcon } from 'hugeicons-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

import { signOut } from '@/api/sessions/sign-out'
import { useSellerProfile } from '@/hooks/queries/use-seller-profile'
import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function UserMenu() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: profile, isError, error } = useSellerProfile()

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
  })

  const handleSignOut = async () => {
    try {
      await signOutFn()
      toast.success('Logout realizado com sucesso.')
    } catch {
      toast.error('Não foi possível realizar o logout no servidor.')
    } finally {
      queryClient.clear()
      navigate('/sign-in', { replace: true })
    }
  }

  useEffect(() => {
    if (isError && error) {
      toast.error(
        'Erro: Não foi possível pegar os dados do perfil do vendedor.',
      )
    }
  }, [error, isError])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-12 w-12 items-center justify-center rounded-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-base focus-visible:ring-offset-2">
        {profile?.seller.avatar?.url ? (
          <img
            src={profile?.seller.avatar?.url}
            alt="User Profile"
            className="h-12 w-12 rounded-[12px] object-cover"
          />
        ) : (
          <UserIcon size={32} className="text-orange-base" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={12}
        className="flex w-[10.5rem] flex-col gap-5"
      >
        <DropdownMenuLabel className="flex items-center gap-3 p-0">
          {profile?.seller.avatar?.url ? (
            <img
              src={profile?.seller.avatar?.url}
              alt="User Profile"
              className="h-8 w-8 rounded-[12px] object-cover"
            />
          ) : (
            <UserIcon size={28} className="text-orange-base" />
          )}
          <span
            className={cn(
              'line-clamp-2 max-w-[5.75rem] text-gray-300',
              getTailwindClass('font-body-sm'),
            )}
          >
            {profile?.seller.name}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-shape" />
        <DropdownMenuItem
          className="flex items-center justify-between gap-2 p-0.5 text-orange-base [&_svg]:size-5"
          disabled={isSigningOut}
          onClick={handleSignOut}
        >
          <span className={cn(getTailwindClass('font-action-sm'))}>Sair</span>
          <Logout01Icon />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
