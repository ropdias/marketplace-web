import { Badge } from './ui/badge'

interface BadgeCategoryProps {
  category: string
}

export function BadgeCategory({ category }: BadgeCategoryProps) {
  return <Badge>{category}</Badge>
}
