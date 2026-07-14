import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from "@/components/ui/sonner"
import AppProviders from "./providers/AppProviders.tsx";
import AppRouter from './routes/AppRouter.tsx';
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
    <AppRouter/>
    <Toaster richColors position="top-center"/>
    </AppProviders>
  </StrictMode>,
)
