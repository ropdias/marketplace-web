import { Product } from '@/types/product'

import { productFormInputs } from './product-form.schema'

export function getProductFormDefaultValues(
  product?: Product,
): productFormInputs {
  if (!product) {
    return {
      title: '',
      price: '',
      description: '',
      category: '',
      productImage: undefined,
    }
  }

  return {
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    productImage: undefined,
  }
}
