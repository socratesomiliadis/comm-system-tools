import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { Manrope } from "next/font/google";
import Link from "next/link";
import Layout from "@/components/Layout";

export const manrope = Manrope({ subsets: ["latin"], display: "swap" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${manrope.className}`}>
      <NextUIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </div>
  );
}
