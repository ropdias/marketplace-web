import './index.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router'

import { AppRoutes } from './routes'

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Marketplace">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>
  )
}
