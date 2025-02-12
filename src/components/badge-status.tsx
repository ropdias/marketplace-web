import { Badge } from './ui/badge'

interface BadgeStatusProps {
  status: 'anunciado' | 'vendido' | 'desativado'
}

export function BadgeStatus({ status }: BadgeStatusProps) {
  return (
    <Badge status={status}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}
