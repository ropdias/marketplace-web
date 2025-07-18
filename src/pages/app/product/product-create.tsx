import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

import { ProductImageUploader } from './product-image-uploader'

export function ProductCreate() {
  return (
    <>
      <Helmet title="Cadastro de Produto" />
      <div className="flex flex-col gap-2">
        <p className={cn('text-gray-500', getTailwindClass('font-title-md'))}>
          Novo produto
        </p>
        <p className={cn('text-gray-300', getTailwindClass('font-body-sm'))}>
          Cadastre um produto para venda no marketplace
        </p>
      </div>
      <div className="flex-start flex gap-6">
        <div className="flex-shrink-0">
          <ProductImageUploader />
        </div>
        <div className="flex w-full flex-col gap-8 rounded-[20px] bg-white p-8">
          <p className={cn('text-gray-300', getTailwindClass('font-title-sm'))}>
            Dados do produto
          </p>
          <form className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                <div className="w-full">
                  <Input
                    id="title"
                    placeholder="Nome do produto"
                    labelText="Título"
                    isFilled={false}
                  />
                </div>
                <div className="w-[12.5rem] flex-shrink-0">
                  <Input
                    id="value"
                    placeholder="0,00"
                    labelText="Valor"
                    isFilled={true}
                    iconLeft="R$"
                  />
                </div>
              </div>
              <Textarea
                id="description"
                placeholder="Escreva detalhes sobre o produto, tamanho, características"
                labelText="Descrição"
              />
              <div>Categoria aqui</div>
            </div>
            <div className="flex gap-3">
              <Button
                asChild
                variant="outline"
                className="h-12 flex-1 justify-center"
              >
                <Link to="/">Cancelar</Link>
              </Button>
              <Button className="h-12 flex-1 justify-center" type="submit">
                Salvar e publicar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
