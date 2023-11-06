import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header';  // Adjust the path based on your actual directory structure

import fetch, { Headers, Request, Response } from 'node-fetch';

// Check if fetch is a function in the current global scope
if (typeof globalThis.fetch !== 'function') {
  // Assign fetch and related classes to the appropriate global properties
  (globalThis as any).fetch = fetch;
  (globalThis as any).Headers = Headers;
  (globalThis as any).Request = Request;
  (globalThis as any).Response = Response;
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="App">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
