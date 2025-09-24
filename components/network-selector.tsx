"use client"

import { useSwitchChain, useChainId } from "wagmi"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { supportedChains, chainConfig } from "@/lib/chains"

export function NetworkSelector() {
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  const currentChain = supportedChains.find((chain) => chain.id === chainId)
  const currentConfig = chainId ? chainConfig[chainId] : null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
          {currentConfig?.name || "Select Network"}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {supportedChains.map((chain) => (
          <DropdownMenuItem
            key={chain.id}
            onClick={() => switchChain({ chainId: chain.id })}
            className={chainId === chain.id ? "bg-muted" : ""}
          >
            {chainConfig[chain.id]?.name || chain.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
