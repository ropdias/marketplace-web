import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

import { uploadImages } from '@/api/attachments/upload-images'
import { createProduct } from '@/api/products/create-product'
import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'
import { unmaskCurrencyToCents } from '@/utils/unmask-currency-to-cents'

import { ProductForm } from './product-form'
import { productFormInputs } from './product-form.schema'

export function CreateProduct() {
  const navigate = useNavigate()

  const { mutateAsync: uploadImagesFn } = useMutation({
    mutationFn: uploadImages,
  })

  const { mutateAsync: createProductFn } = useMutation({
    mutationFn: createProduct,
  })

  async function handleProductFormSubmit(data: productFormInputs) {
    const priceInCents = unmaskCurrencyToCents(data.priceInCents)
    let attachmentsIds: string[] = []

    if (data.image) {
      const files = new FormData()
      files.append('files', data.image)

      try {
        const uploadImagesResponse = await uploadImagesFn({ files })
        attachmentsIds = uploadImagesResponse.attachments.map(
          (attachment) => attachment.id,
        )
      } catch {
        toast.error('Erro ao enviar imagem de perfil. Tente novamente.')
        return
      }
    }

    try {
      await createProductFn({
        title: data.title,
        categoryId: data.categoryId,
        description: data.description,
        priceInCents,
        attachmentsIds,
      })

      toast.success('Produto cadastrado com sucesso!')
      navigate(`/products`)
    } catch {
      toast.error(
        'Erro ao cadastrar o produto. Verifique os dados e tente novamente.',
      )
    }
  }

  return (
    <>
      <Helmet title="Cadastro de Produto" />
      <div className="flex flex-col gap-2">
        <div className="h-6"></div>
        <p className={cn('text-gray-500', getTailwindClass('font-title-md'))}>
          Novo produto
        </p>
        <p className={cn('text-gray-300', getTailwindClass('font-body-sm'))}>
          Cadastre um produto para venda no marketplace
        </p>
      </div>
      <ProductForm
        handleProductFormSubmit={handleProductFormSubmit}
        action="create"
      />
    </>
  )
}
