import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import AuthProvider from './Context/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router';
import { router } from './Routes/Routes.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  </StrictMode>
);