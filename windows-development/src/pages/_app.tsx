import "../styles/globals.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProps } from "next/app";
import { AuthGuard } from "@components/AuthGuard";

export type PageProps = {
  isPublic?: boolean;
};

function MyApp({ Component, pageProps }: AppProps<PageProps>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {!Component?.defaultProps?.isPublic ? (
        <AuthGuard>
          <Component {...pageProps} />
        </AuthGuard>
      ) : (
        <Component {...pageProps} />
      )}
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  );
}

export default MyApp;
