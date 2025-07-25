import { useMutation, useQuery } from '@tanstack/react-query'
import { Logout01Icon } from 'hugeicons-react'
import { useNavigate } from 'react-router'

import { getSellerProfile } from '@/api/sellers/get-seller-profile'
import { signOut } from '@/api/sessions/sign-out'
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

  const { data: profile } = useQuery({
    queryKey: ['seller-profile'],
    queryFn: getSellerProfile,
    staleTime: Infinity,
  })

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate('/sign-in', { replace: true })
    },
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-12 w-12 rounded-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-base focus-visible:ring-offset-2">
        <img
          src={profile?.seller.avatar?.url}
          alt="User Profile"
          className="h-12 w-12 rounded-[12px] object-cover"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={12}
        className="flex w-[10.5rem] flex-col gap-5"
      >
        <DropdownMenuLabel className="flex items-center justify-center gap-3 p-0">
          <img
            src={profile?.seller.avatar?.url}
            alt="User Profile"
            className="h-8 w-8 rounded-[12px] object-cover"
          />
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
          onClick={() => signOutFn()}
        >
          <span className={cn(getTailwindClass('font-action-sm'))}>Sair</span>
          <Logout01Icon />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
