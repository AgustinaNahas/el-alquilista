import "@/styles/globals.css";
import { GoogleAnalytics } from "nextjs-google-analytics";

const GA_MEASUREMENT_ID = "G-C3YJ4SEDJP";

export default function App({ Component, pageProps }) {

  return <>
    <GoogleAnalytics trackPageViews gaMeasurementId={GA_MEASUREMENT_ID}/>
    <Component {...pageProps} />
  </>;
}
