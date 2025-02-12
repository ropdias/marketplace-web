import { Badge } from './ui/badge'

interface TagStatusProps {
  status: 'anunciado' | 'vendido' | 'desativado'
}

export function TagStatus({ status }: TagStatusProps) {
  return (
    <Badge status={status}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}
