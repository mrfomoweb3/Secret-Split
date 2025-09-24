import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Users, Key, Lock, Eye, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function LearnPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container py-12">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              How <span className="text-[#6c5ce7]">Secret Split</span> works
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Learn how zero-knowledge proofs enable private group savings without compromising on transparency.
            </p>
          </div>

          {/* Step-by-step process */}
          <div className="space-y-16">
            {/* Step 1: Commit deposits locally */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#6c5ce7]/10 flex items-center justify-center">
                    <span className="font-bold text-[#6c5ce7]">1</span>
                  </div>
                  <h2 className="text-2xl font-bold">Commit deposits locally</h2>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  When you make a deposit, your wallet creates a cryptographic commitment to the amount. This commitment
                  is posted to the blockchain, but the actual amount remains completely private.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-[#22c55e]" />
                    <span className="text-sm">Your deposit amount is encrypted locally</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-[#22c55e]" />
                    <span className="text-sm">Only a commitment hash is stored on-chain</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-[#22c55e]" />
                    <span className="text-sm">No one can see individual amounts</span>
                  </div>
                </div>
              </div>

              <Card className="card-shadow-lg">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-[#6c5ce7]/5 border border-[#6c5ce7]/20">
                      <span className="font-medium">Your deposit</span>
                      <span className="font-mono text-[#6c5ce7]">100 MATIC</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-[#6c5ce7] flex items-center justify-center">
                        <Lock className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30 border">
                      <span className="text-sm text-muted-foreground">Blockchain commitment</span>
                      <p className="font-mono text-xs break-all mt-1">
                        0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c5f...
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Step 2: Prove relationship without revealing amounts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Card className="card-shadow-lg lg:order-1">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-[#00d1b2]/10 flex items-center justify-center mb-3">
                        <Shield className="w-8 h-8 text-[#00d1b2]" />
                      </div>
                      <h3 className="font-semibold">Zero-Knowledge Proof</h3>
                    </div>

                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-muted/30">
                        <span className="text-sm">Alice: Hidden amount</span>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/30">
                        <span className="text-sm">Bob: Hidden amount</span>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/30">
                        <span className="text-sm">Charlie: Hidden amount</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="w-8 h-1 bg-[#00d1b2] mx-auto mb-2"></div>
                      <div className="p-3 rounded-lg bg-[#00d1b2]/10 border border-[#00d1b2]/20">
                        <span className="font-semibold text-[#00d1b2]">Proven total: 500 MATIC</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6 lg:order-2">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#00d1b2]/10 flex items-center justify-center">
                    <span className="font-bold text-[#00d1b2]">2</span>
                  </div>
                  <h2 className="text-2xl font-bold">Prove relationship without revealing amounts</h2>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Using zero-knowledge proofs, you can prove that your deposits sum to a specific total without
                  revealing individual amounts. The math is verified cryptographically.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#22c55e]" />
                    <span className="text-sm">Proves the sum is correct</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#22c55e]" />
                    <span className="text-sm">Individual amounts stay private</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#22c55e]" />
                    <span className="text-sm">Mathematically verifiable</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Reveal only when group shares reach threshold */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#f59e0b]/10 flex items-center justify-center">
                    <span className="font-bold text-[#f59e0b]">3</span>
                  </div>
                  <h2 className="text-2xl font-bold">Reveal only when group shares reach threshold</h2>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  The pot total can only be revealed when enough members agree. Each member holds a secret share, and
                  combining enough shares unlocks the total for everyone.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-[#22c55e]" />
                    <span className="text-sm">Democratic decision making</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Key className="w-5 h-5 text-[#22c55e]" />
                    <span className="text-sm">Threshold-based reveal</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-[#22c55e]" />
                    <span className="text-sm">No single point of control</span>
                  </div>
                </div>
              </div>

              <Card className="card-shadow-lg">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <h3 className="font-semibold mb-3">Group Key Shares</h3>
                      <p className="text-sm text-muted-foreground">3 of 5 shares needed</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/20">
                        <span className="text-sm">Alice</span>
                        <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/20">
                        <span className="text-sm">Bob</span>
                        <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/20">
                        <span className="text-sm">Charlie</span>
                        <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <span className="text-sm text-muted-foreground">David</span>
                        <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30"></div>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <span className="text-sm text-muted-foreground">Eve</span>
                        <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30"></div>
                      </div>
                    </div>

                    <div className="text-center pt-4 border-t">
                      <div className="p-3 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/20">
                        <span className="font-semibold text-[#f59e0b]">Total: 1,250 MATIC</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Benefits section */}
          <div className="mt-24 text-center">
            <h2 className="text-3xl font-bold mb-8">Why use Secret Split?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="card-shadow hover:card-shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#6c5ce7]/10 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-[#6c5ce7]" />
                  </div>
                  <h3 className="font-semibold mb-2">Complete Privacy</h3>
                  <p className="text-sm text-muted-foreground">
                    Your deposit amounts remain completely private until the group decides to reveal.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-shadow hover:card-shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#00d1b2]/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-[#00d1b2]" />
                  </div>
                  <h3 className="font-semibold mb-2">Group Control</h3>
                  <p className="text-sm text-muted-foreground">
                    Democratic decision making with threshold-based reveals. No single point of control.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-shadow hover:card-shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#f59e0b]/10 flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-[#f59e0b]" />
                  </div>
                  <h3 className="font-semibold mb-2">Cryptographically Secure</h3>
                  <p className="text-sm text-muted-foreground">
                    Built on proven zero-knowledge cryptography. Mathematically verifiable privacy.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#6c5ce7] hover:bg-[#5a4fd4]">
                <Link href="/create">Create your first pot</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent">
                <Link href="/pot/demo">Try the demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
