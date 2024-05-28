import "@/styles/globals.css";
import { GoogleAnalytics } from "nextjs-google-analytics";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function App({ Component, pageProps }) {
  console.log(process.env.NEXT_PUBLIC_GANALYTICS)
  console.log(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID)
  console.log(GA_MEASUREMENT_ID)

  return <>
    <GoogleAnalytics trackPageViews gaMeasurementId={GA_MEASUREMENT_ID}/>
    <Component {...pageProps} />
  </>;
}
