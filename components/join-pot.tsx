"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Loader2, Users, Shield, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"
import { PotABI } from "@/lib/contracts"
import { useWallet } from "@/lib/zustand/useWallet"
import { formatAddress } from "@/lib/format"
import { useToast } from "@/hooks/use-toast"
import type { Address } from "viem"

const joinSchema = z.object({
  nickname: z.string().max(20, "Nickname too long").optional(),
})

type JoinForm = z.infer<typeof joinSchema>

interface PotInfo {
  name: string
  memberCount: number
  owner: Address
  token: Address
  isAlreadyMember: boolean
}

interface JoinPotProps {
  address: Address
}

export function JoinPot({ address }: JoinPotProps) {
  const { isConnected, address: walletAddress } = useWallet()
  const [potInfo, setPotInfo] = useState<PotInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const form = useForm<JoinForm>({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      nickname: "",
    },
  })

  useEffect(() => {
    // Load pot information (mock implementation)
    const loadPotInfo = async () => {
      setLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock pot info
      const mockPotInfo: PotInfo = {
        name: address === "demo" ? "Demo Vacation Fund" : "Savings Pot",
        memberCount: 3,
        owner: "0x1234567890123456789012345678901234567890" as Address,
        token: "0x0000000000000000000000000000000000000000" as Address,
        isAlreadyMember: walletAddress === "0x1234567890123456789012345678901234567890",
      }

      setPotInfo(mockPotInfo)
      setLoading(false)
    }

    loadPotInfo()
  }, [address, walletAddress])

  const onSubmit = async (data: JoinForm) => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to join the pot.",
        variant: "destructive",
      })
      return
    }

    try {
      // In a real implementation, we'd call the join function
      writeContract({
        address,
        abi: PotABI,
        functionName: "join",
        value: BigInt(0), // No entry fee for demo
      })
    } catch (error) {
      toast({
        title: "Failed to join pot",
        description: "There was an error joining the pot. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle successful transaction
  if (isSuccess && hash) {
    toast({
      title: "Successfully joined!",
      description: "You are now a member of this savings pot.",
    })
  }

  if (loading) {
    return (
      <main className="container py-12">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  if (!potInfo) {
    return (
      <main className="container py-12">
        <div className="mx-auto max-w-2xl text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#ef4444]/10 flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-[#ef4444]" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Pot not found</h1>
          <p className="text-muted-foreground">
            The pot you're trying to join doesn't exist or hasn't been deployed yet.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="container py-12">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">Join savings pot</h1>
          <p className="text-lg text-muted-foreground">You've been invited to join a private group savings pot.</p>
        </div>

        <Card className="card-shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#6c5ce7]/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#6c5ce7]" />
              </div>
              <div>
                <CardTitle>{potInfo.name}</CardTitle>
                <CardDescription>Private group savings with zero-knowledge privacy</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Pot Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/30">
                <div className="w-8 h-8 mx-auto rounded-full bg-[#6c5ce7]/10 flex items-center justify-center mb-2">
                  <Users className="w-4 h-4 text-[#6c5ce7]" />
                </div>
                <p className="text-sm text-muted-foreground">Members</p>
                <p className="font-semibold">{potInfo.memberCount}</p>
              </div>

              <div className="text-center p-4 rounded-lg bg-muted/30">
                <div className="w-8 h-8 mx-auto rounded-full bg-[#00d1b2]/10 flex items-center justify-center mb-2">
                  <Shield className="w-4 h-4 text-[#00d1b2]" />
                </div>
                <p className="text-sm text-muted-foreground">Privacy</p>
                <p className="font-semibold">ZK Proofs</p>
              </div>

              <div className="text-center p-4 rounded-lg bg-muted/30">
                <div className="w-8 h-8 mx-auto rounded-full bg-[#f59e0b]/10 flex items-center justify-center mb-2">
                  <ExternalLink className="w-4 h-4 text-[#f59e0b]" />
                </div>
                <p className="text-sm text-muted-foreground">Token</p>
                <p className="font-semibold">MATIC</p>
              </div>
            </div>

            <Separator />

            {/* Pot Details */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Pot Address</span>
                <span className="font-mono text-sm">{formatAddress(address, 6)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Owner</span>
                <span className="font-mono text-sm">{formatAddress(potInfo.owner, 6)}</span>
              </div>
            </div>

            <Separator />

            {potInfo.isAlreadyMember ? (
              /* Already a member */
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#22c55e]/10 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-[#22c55e]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">You're already a member!</h3>
                  <p className="text-muted-foreground">
                    You can access the pot dashboard to make deposits and view activity.
                  </p>
                </div>
                <Button asChild className="bg-[#6c5ce7] hover:bg-[#5a4fd4]">
                  <a href={`/pot/${address}`}>Go to pot dashboard</a>
                </Button>
              </div>
            ) : !isConnected ? (
              /* Wallet not connected */
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#f59e0b]/10 flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-[#f59e0b]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Connect your wallet</h3>
                  <p className="text-muted-foreground">Please connect your wallet to join this savings pot.</p>
                </div>
              </div>
            ) : (
              /* Join form */
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nickname">Nickname (Optional)</Label>
                  <Input
                    id="nickname"
                    placeholder="How others will see you in the pot"
                    {...form.register("nickname")}
                  />
                  <p className="text-sm text-muted-foreground">
                    Choose a friendly name or leave blank to use your wallet address.
                  </p>
                  {form.formState.errors.nickname && (
                    <p className="text-sm text-destructive">{form.formState.errors.nickname.message}</p>
                  )}
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">What happens when you join?</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• You become a member of this private savings pot</li>
                    <li>• You can make deposits that remain completely private</li>
                    <li>• You'll receive a share key for revealing the total later</li>
                    <li>• No entry fee required</li>
                  </ul>
                </div>

                {error && (
                  <Card className="p-4 border-destructive/20 bg-destructive/5">
                    <p className="text-sm text-destructive">
                      Transaction failed: {error.message || "Unknown error occurred"}
                    </p>
                  </Card>
                )}

                <Button
                  type="submit"
                  className="w-full bg-[#6c5ce7] hover:bg-[#5a4fd4]"
                  disabled={isPending || isConfirming}
                >
                  {isPending || isConfirming ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {isPending ? "Confirming..." : "Joining pot..."}
                    </>
                  ) : (
                    "Join pot"
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
