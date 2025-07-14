import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import AuthProvider from './Context/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router';
import { router } from './Routes/Routes.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// create Query Client
const queryClient=new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);