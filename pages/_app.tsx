import '../styles/globals.css'
import "../styles/reset.scss"
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../store'
import { QueryClientProvider, QueryClient,  } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import Layout from 'components/layout/layout'

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(new QueryClient());

  return  (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools></ReactQueryDevtools>
      </QueryClientProvider>
    </Provider>
  )
}
