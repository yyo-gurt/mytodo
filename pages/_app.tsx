import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../store'
import { QueryClientProvider, QueryClient,  } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(new QueryClient());

  return  (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools></ReactQueryDevtools>
      </QueryClientProvider>
    </Provider>
  )
}
