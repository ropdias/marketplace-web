import { Product } from '@/types/product'
import { currencyApplyMask } from '@/utils/currency-apply-mask'

import { productFormInputs } from './product-form.schema'

export function getProductFormDefaultValues(
  product?: Product,
): productFormInputs {
  if (!product) {
    return {
      title: '',
      categoryId: '',
      description: '',
      priceInCents: '',
      image: undefined,
    }
  }

  return {
    title: product.title,
    priceInCents: currencyApplyMask(String(product.priceInCents)),
    description: product.description,
    categoryId: product.category.id,
    image: undefined,
  }
}
