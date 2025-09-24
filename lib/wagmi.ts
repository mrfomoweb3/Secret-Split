import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { polygonAmoy, sepolia, baseSepolia } from "wagmi/chains"

export const config = getDefaultConfig({
  appName: "Secret Split",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "demo",
  chains: [polygonAmoy, sepolia, baseSepolia],
  ssr: true,
})
