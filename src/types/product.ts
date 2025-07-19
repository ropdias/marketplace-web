export interface Product {
  id: string
  title: string
  price: string
  description: string
  category:
    | 'toy'
    | 'furniture'
    | 'stationery'
    | 'healthAndBeauty'
    | 'utensil'
    | 'clothing'
  status: 'anunciado' | 'vendido' | 'desativado'
}
