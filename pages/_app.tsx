import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header';  // Adjust the path based on your actual directory structure


const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="App">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
