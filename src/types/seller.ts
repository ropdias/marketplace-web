export interface SellerAvatar {
  id: string
  url: string
}

export interface Seller {
  id: string
  name: string
  phone: string
  email: string
  avatar: SellerAvatar | null
}
