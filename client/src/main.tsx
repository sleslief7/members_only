import { Provider as ChakraProvider } from '@/components/ui/provider';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import AuthProvider from './providers/AuthProvider';

createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </ChakraProvider>
);
