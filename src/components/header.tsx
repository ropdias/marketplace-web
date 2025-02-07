import { ChartHistogramIcon, PackageIcon, PlusSignIcon } from 'hugeicons-react'

import { MenuLink } from './menu-link'
import { Button } from './ui/button'

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
      <div className="flex h-auto w-[221px] items-center justify-between">
        <Button variant={'solid'} size={'small'}>
          <PlusSignIcon />
          Novo Produto
        </Button>
        User
      </div>
    </div>
  )
}
