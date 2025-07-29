import { useQuery } from '@tanstack/react-query'

import { getSellerProfile } from '@/api/sellers/get-seller-profile'

export function useSellerProfile() {
  return useQuery({
    queryKey: ['seller-profile'],
    queryFn: getSellerProfile,
    staleTime: Infinity,
  })
}
