import { Badge } from './ui/badge'

interface TagCategoryProps {
  category: string
}

export function TagCategory({ category }: TagCategoryProps) {
  return <Badge>{category}</Badge>
}
