import { ChartHistogramIcon, PackageIcon, PlusSignIcon } from 'hugeicons-react'
import { Link } from 'react-router'

import { MenuLink } from './menu-link'
import { Button } from './ui/button'
import { UserMenu } from './user-menu'

export function Header() {
  return (
    <div className="flex h-20 w-full items-center justify-between border-b border-shape px-5">
      <img src="/logo.svg" alt="Logo" className="h-10 w-14" />
      <nav className="flex items-center gap-2">
        <MenuLink to="/">
          <ChartHistogramIcon className="h-5 w-5" />
          Dashboard
        </MenuLink>
        <MenuLink to="/products">
          <PackageIcon className="h-5 w-5" />
          Produtos
        </MenuLink>
      </nav>
      <div className="flex h-auto w-auto items-center justify-between gap-4">
        <Button asChild variant={'solid'} size={'small'}>
          <Link to="/product/create">
            <PlusSignIcon />
            Novo Produto
          </Link>
        </Button>
        <UserMenu />
      </div>
    </div>
  )
}
