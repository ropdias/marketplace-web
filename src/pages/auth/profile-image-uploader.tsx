import { AlertCircleIcon, ImageUploadIcon } from 'hugeicons-react'
import { useEffect, useState } from 'react'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Label } from '@/components/ui/label'
import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

type ProfileImageUploaderProps = {
  onChange?: (file: File | null) => void
  errorMessage?: string
  id: string
}

export function ProfileImageUploader({
  onChange,
  errorMessage,
  id,
}: ProfileImageUploaderProps) {
  const [image, setImage] = useState<string | null>(null)

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
      <div className="h-[7.5rem] w-[7.5rem] rounded-[12px] bg-shape">
        <input
          type="file"
          id={id}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <Label htmlFor={id} className="group relative cursor-pointer">
          <ImageUploadIcon
            size={32}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-base"
          ></ImageUploadIcon>
          <AspectRatio ratio={1}>
            {image && (
              <>
                <img
                  src={image}
                  alt="Imagem Carregada"
                  className="h-full w-full rounded-[12px] object-cover"
                />
                <div className="absolute inset-0 rounded-[12px] bg-black opacity-0 group-hover:opacity-60" />
                <ImageUploadIcon
                  size={32}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition duration-100 group-hover:opacity-100"
                ></ImageUploadIcon>
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
