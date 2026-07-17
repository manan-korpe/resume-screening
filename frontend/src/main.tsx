import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from "@/components/ui/sonner"
import AppProviders from "./providers/AppProviders.tsx";
import AppRouter from './routes/AppRouter.tsx';
import { ThemeProvider } from './providers/theme-provider.tsx';
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <AppProviders>
    <AppRouter/>
    <Toaster richColors position="top-center"/>
    </AppProviders>
    </ThemeProvider>
  </StrictMode>,
)
