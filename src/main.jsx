import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { router } from './Routes/Routes';
import AuthProvider from './Providers/AuthProvider';

import {

  QueryClient,
  QueryClientProvider,
} from 'react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>





    <AuthProvider>
      <HelmetProvider>

        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>


      </HelmetProvider>
    </AuthProvider>



  </React.StrictMode>

)
