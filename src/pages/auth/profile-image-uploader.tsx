import { ImageUploadIcon } from 'hugeicons-react'
import { useState } from 'react'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Label } from '@/components/ui/label'

export function ProfileImageUploader() {
  const [image, setImage] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file) // Creates a temporary url for the image
      setImage(imageUrl)
    }
  }

  return (
    <div className="h-[7.5rem] w-[7.5rem] rounded-[12px] bg-shape">
      <input
        type="file"
        id="profilePicture"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <Label htmlFor="profilePicture" className="group relative cursor-pointer">
        <ImageUploadIcon
          size={32}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-base"
        ></ImageUploadIcon>
        <AspectRatio ratio={1} className="">
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
  )
}
