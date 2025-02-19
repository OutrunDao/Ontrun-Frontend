"use client";
import { HeroUIProvider } from "@heroui/react";
import { connectorsForWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  metaMaskWallet,
  okxWallet,
  oneKeyWallet,
  phantomWallet,
  rabbyWallet,
  tokenaryWallet,
  tokenPocketWallet,
  trustWallet,
  uniswapWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { baseSepolia, blastSepolia, bscTestnet } from "viem/chains";

import { createConfig, http, WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

const connectors = connectorsForWallets(
  [
    {
      groupName: "Suggested",
      wallets: [walletConnectWallet, metaMaskWallet, okxWallet, coinbaseWallet],
    },
    {
      groupName: "More",
      wallets: [
        uniswapWallet,
        trustWallet,
        oneKeyWallet,
        phantomWallet,
        tokenPocketWallet,
        tokenaryWallet,
        rabbyWallet,
      ],
    },
  ],
  { appName: "Outrun", projectId: "ff83fe2d7625c2fe20a16714dee5fb7b" },
);

const config = createConfig(
  {
  connectors,
  chains: [bscTestnet,baseSepolia],
  transports: {
    [bscTestnet.id]: http(),
    [baseSepolia.id]: http(),
  },
  ssr: true,
});

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // useEffect(() => {
  //   setFontSize();
  //   // Add event listener to update font size on resize
  //   window.addEventListener("resize", setFontSize);

  //   // Cleanup event listener on unmount
  //   return () => {
  //     window.removeEventListener("resize", setFontSize);
  //   };
  // }, []);

  return (
    <HeroUIProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider modalSize="compact">{children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </HeroUIProvider>
  );
}
