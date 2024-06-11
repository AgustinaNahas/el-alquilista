import "@/styles/globals.css";
// import { GoogleAnalytics } from "nextjs-google-analytics";
import { GoogleAnalytics } from '@next/third-parties/google'
 
// const GA_MEASUREMENT_ID = "G-C3YJ4SEDJP";

export default function App({ Component, pageProps }) {
  return <>
    <GoogleAnalytics gaId="G-C3YJ4SEDJP"/>
    <Component {...pageProps} />
  </>;
}
