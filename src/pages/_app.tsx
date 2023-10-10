import "src/styles/style.scss";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";
import { wagmiConfig } from "@/api/web3.config";
import WalletProvider from "@/context/wallet-data.provider";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      defaultTheme="system"
      enableSystem={true}
      attribute="class"
      storageKey="theme"
    >
      <QueryClientProvider client={queryClient}>
        <WalletProvider>
          <WagmiConfig config={wagmiConfig}>
            <Toaster
              toastOptions={{
                style: {
                  fontFamily: "var(--font-lexend)",
                  backgroundColor: "var(--textDefaultColor)",
                  color: "var(--backgroundMainColor)",
                },
              }}
              containerStyle={{
                top: "10%",
                bottom: "0",
              }}
            />
            <Component {...pageProps} />
          </WagmiConfig>
        </WalletProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
