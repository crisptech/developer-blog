import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../app/store";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
