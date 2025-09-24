"use client"

import { create } from "zustand"
import type { Address } from "viem"

interface WalletState {
  address: Address | null
  chainId: number | null
  isConnected: boolean
  setWallet: (address: Address | null, chainId: number | null) => void
  setConnected: (connected: boolean) => void
}

export const useWallet = create<WalletState>((set) => ({
  address: null,
  chainId: null,
  isConnected: false,
  setWallet: (address, chainId) => set({ address, chainId }),
  setConnected: (isConnected) => set({ isConnected }),
}))
