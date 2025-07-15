import { createBrowserRouter } from 'react-router'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { Dashboard } from './pages/app/dashboard/dashboard'
import { ProductCreate } from './pages/app/product/product-create'
import { ProductEdit } from './pages/app/product/product-edit'
import { Products } from './pages/app/products/products'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { NotFound } from './pages/not-found'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: '/products', Component: Products },
      { path: '/product/create', Component: ProductCreate },
      { path: '/product/:id/edit', Component: ProductEdit },
    ],
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      { path: '/sign-in', Component: SignIn },
      { path: '/sign-up', Component: SignUp },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
])
