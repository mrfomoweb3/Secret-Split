"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Users, Key } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { useWallet } from "@/lib/zustand/useWallet"

export function Hero() {
  const { isConnected } = useWallet()

  return (
    <div className="relative">
      <Navigation />

      <section className="container py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-fade-in">
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6">
              Private group <span className="text-[#6c5ce7]">savings</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground text-balance mb-12 max-w-2xl mx-auto leading-relaxed">
              Save together without exposing balances. Zero-knowledge proofs keep your deposits private until the group
              decides to reveal.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button asChild size="lg" className="bg-[#6c5ce7] hover:bg-[#5a4fd4] text-white px-8 py-6 text-lg">
                <Link href={isConnected ? "/create" : "#"}>
                  {isConnected ? "Create a pot" : "Connect wallet to start"}
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg bg-transparent">
                <Link href="/pot/demo">View a demo pot</Link>
              </Button>
            </div>
          </div>

          {/* Hero illustration card */}
          <Card className="p-8 md:p-12 card-shadow-lg animate-fade-in bg-gradient-to-br from-slate-50 to-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#6c5ce7]/10 flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-[#6c5ce7]" />
                </div>
                <h3 className="font-semibold mb-2">Friends join</h3>
                <p className="text-sm text-muted-foreground">Invite friends to your savings pot</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#00d1b2]/10 flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-[#00d1b2]" />
                </div>
                <h3 className="font-semibold mb-2">Private deposits</h3>
                <p className="text-sm text-muted-foreground">Amounts stay hidden with ZK proofs</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#f59e0b]/10 flex items-center justify-center mb-4">
                  <Key className="w-8 h-8 text-[#f59e0b]" />
                </div>
                <h3 className="font-semibold mb-2">Group reveal</h3>
                <p className="text-sm text-muted-foreground">Unlock total when everyone agrees</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
