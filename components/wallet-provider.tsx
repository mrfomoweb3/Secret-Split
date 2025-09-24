"use client"

import type React from "react"

import { useEffect } from "react"
import { useAccount, useChainId } from "wagmi"
import { useWallet } from "@/lib/zustand/useWallet"

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { setWallet, setConnected } = useWallet()

  useEffect(() => {
    setWallet(address || null, chainId || null)
    setConnected(isConnected)
  }, [address, chainId, isConnected, setWallet, setConnected])

  return <>{children}</>
}
