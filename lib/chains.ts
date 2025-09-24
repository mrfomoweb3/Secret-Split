import { polygonAmoy, sepolia, baseSepolia } from "wagmi/chains"

export const supportedChains = [polygonAmoy, sepolia, baseSepolia]

export const chainConfig = {
  [polygonAmoy.id]: {
    name: "Polygon Amoy",
    blockExplorer: "https://amoy.polygonscan.com",
    rpcUrl: "https://rpc-amoy.polygon.technology",
  },
  [sepolia.id]: {
    name: "Sepolia",
    blockExplorer: "https://sepolia.etherscan.io",
    rpcUrl: "https://sepolia.infura.io/v3/",
  },
  [baseSepolia.id]: {
    name: "Base Sepolia",
    blockExplorer: "https://sepolia.basescan.org",
    rpcUrl: "https://sepolia.base.org",
  },
}
