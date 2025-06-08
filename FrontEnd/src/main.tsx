import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import { AppProvider } from './contexts/app.context.tsx'
import { UserProvider } from './contexts/user.context.tsx'
import { HelmetProvider } from 'react-helmet-async'
import './i18n/i18n.ts'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AppProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </AppProvider>
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    <ToastContainer />
  </BrowserRouter>
)
