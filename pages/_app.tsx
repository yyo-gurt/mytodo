import "../styles/reset.scss";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import Layout from "components/layout/layout";
import Auth from "components/auth";

if (process.env.NODE_ENV === "development") {
  if (typeof window === undefined) {
    import("../mocks/server").then(({ worker }) => {
      worker.listen();
    });
  } else {
    import("../mocks").then(({ worker }) => {
      worker.start();
    });
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(new QueryClient());

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Auth>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Auth>
        <ReactQueryDevtools></ReactQueryDevtools>
      </QueryClientProvider>
    </Provider>
  );
}
