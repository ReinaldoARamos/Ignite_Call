import type { AppProps } from "next/app";
import { globalStyles } from "./pages/styles/global";

globalStyles()

export default function App({Component, pageProps} : AppProps) {
    return <Component {...pageProps} />
}