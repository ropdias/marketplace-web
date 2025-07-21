import { AlertCircleIcon, ImageUploadIcon } from 'hugeicons-react'
import { useEffect, useState } from 'react'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Label } from '@/components/ui/label'
import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

interface ProductImageUploaderProps {
  onChange?: (file: File | null) => void
  errorMessage?: string
  id: string
  defaultImageUrl?: string
}

export function ProductImageUploader({
  onChange,
  errorMessage,
  id,
  defaultImageUrl,
}: ProductImageUploaderProps) {
  const [image, setImage] = useState<string | null>(defaultImageUrl ?? null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    if (file) {
      const imageUrl = URL.createObjectURL(file) // Creates a temporary url for the image
      setImage(imageUrl)
      onChange?.(file) // RHF will capture this file
    }
  }

  // Clean up object URL to free memory when component unmounts or image changes
  useEffect(() => {
    if (!image) return
    const url = image
    return () => {
      URL.revokeObjectURL(url)
    }
  }, [image])

  return (
    <div className="flex flex-col">
      <div className="h-[21.25rem] w-[25.9375rem] rounded-[20px] bg-shape">
        <input
          type="file"
          id={id}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <Label htmlFor={id} className="group relative cursor-pointer">
          <div className="absolute left-1/2 top-1/2 flex w-[9.9375rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 overflow-hidden">
            <ImageUploadIcon
              size={40}
              className="text-orange-base"
            ></ImageUploadIcon>
            <p
              className={cn(
                'text-center text-gray-300',
                getTailwindClass('font-body-sm'),
              )}
            >
              Selecione a imagem do produto
            </p>
          </div>

          <AspectRatio ratio={1.22} className="w-full">
            {image && (
              <>
                <img
                  src={image}
                  alt="Imagem Carregada"
                  className="h-full w-full rounded-[20px] object-contain"
                />
                <div className="absolute inset-0 rounded-[20px] bg-black opacity-0 group-hover:opacity-60" />
                <div className="absolute left-1/2 top-1/2 flex w-[9.9375rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 overflow-hidden opacity-0 transition duration-100 group-hover:opacity-100">
                  <ImageUploadIcon
                    size={40}
                    className="text-white"
                  ></ImageUploadIcon>
                  <p
                    className={cn(
                      'text-center text-white',
                      getTailwindClass('font-body-sm'),
                    )}
                  >
                    Selecione a imagem do produto
                  </p>
                </div>
              </>
            )}
          </AspectRatio>
        </Label>
      </div>
      {errorMessage && (
        <div className="flex h-7 items-center gap-1 py-1.5">
          <AlertCircleIcon size={16} className="flex-shrink-0 text-danger" />
          <span className={cn('text-danger', getTailwindClass('font-body-xs'))}>
            {errorMessage}
          </span>
        </div>
      )}
    </div>
  )
}
