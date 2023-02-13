import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {ApolloProvider} from "@apollo/client";
import client from "apollo-client";
import MainLayout from "@/components/layout/main-layout";

export default function App({Component, pageProps}: AppProps) {
  return (
    <ApolloProvider client={client}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ApolloProvider>
  );
}
