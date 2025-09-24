"use client"

import Link from "next/link"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { NetworkSelector } from "@/components/network-selector"

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6c5ce7] text-white font-bold">
              S
            </div>
            <span className="font-serif text-xl font-semibold">Secret Split</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/learn"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Learn
            </Link>
            <Link
              href="/pot/demo"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Demo
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <NetworkSelector />
          <WalletConnectButton />
        </div>
      </div>
    </nav>
  )
}
