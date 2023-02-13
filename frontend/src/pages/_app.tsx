import { client } from '../graphql/apollo-client';
import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ApolloProvider>
  );
}
