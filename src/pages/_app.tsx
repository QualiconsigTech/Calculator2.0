import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react"

import { ChakraProvider } from '@chakra-ui/react'
import { MathInbursa } from "@/Context/InbursaContext";


export default function App({ Component, pageProps }: AppProps) {
  return  <ChakraProvider> <Analytics /><MathInbursa><Component {...pageProps} /></MathInbursa></ChakraProvider>
}
