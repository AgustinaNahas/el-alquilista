import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import CabaMap from "@/src/components/map";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/src/utils/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "El Alquilista",
  description: 'Tu asistente personal para saber dónde alquilar en CABA según tu sueldo',
}

export default function Home() {
  return (
    <>
      <Head>
        <title>El Alquilista</title>
        <meta name="description" content="Tu asistente personal para saber dónde alquilar en CABA según tu sueldo." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap" rel="stylesheet" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <ThemeProvider theme={theme}>
          <CabaMap/>
        </ThemeProvider>
      </main>
    </>
  );
}
