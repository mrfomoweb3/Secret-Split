"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, X, CheckCircle, Copy, AlertCircle } from "lucide-react"
import { supportedChains, chainConfig } from "@/lib/chains"
import { CONTRACT_ADDRESSES, PotFactoryABI } from "@/lib/contracts"
import { useWallet } from "@/lib/zustand/useWallet"
import { useToast } from "@/hooks/use-toast"
import { formatAddress } from "@/lib/format"
import type { Address } from "viem"

const createPotSchema = z.object({
  name: z.string().min(1, "Pot name is required").max(50, "Name too long"),
  chainId: z.number().min(1, "Please select a network"),
  token: z.string().min(1, "Token address is required"),
  privacyMode: z.enum(["commit-prove"], { required_error: "Privacy mode is required" }),
  threshold: z.number().min(1, "Threshold must be at least 1").max(100, "Threshold too high"),
  members: z.array(z.string()).min(1, "At least one member is required"),
})

type CreatePotForm = z.infer<typeof createPotSchema>

export function CreatePotForm() {
  const { isConnected, chainId } = useWallet()
  const [createdPot, setCreatedPot] = useState<{ address: Address; name: string } | null>(null)
  const [memberInput, setMemberInput] = useState("")
  const { toast } = useToast()

  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const form = useForm<CreatePotForm>({
    resolver: zodResolver(createPotSchema),
    defaultValues: {
      name: "",
      chainId: chainId || 80002, // Polygon Amoy
      token: "0x0000000000000000000000000000000000000000", // Native token
      privacyMode: "commit-prove",
      threshold: 2,
      members: [],
    },
  })

  const { watch, setValue, getValues } = form
  const members = watch("members")

  const addMember = () => {
    if (!memberInput.trim()) return

    const currentMembers = getValues("members")
    if (currentMembers.includes(memberInput.trim())) {
      toast({
        title: "Member already added",
        description: "This address is already in the member list.",
        variant: "destructive",
      })
      return
    }

    setValue("members", [...currentMembers, memberInput.trim()])
    setMemberInput("")
  }

  const removeMember = (index: number) => {
    const currentMembers = getValues("members")
    setValue(
      "members",
      currentMembers.filter((_, i) => i !== index),
    )
  }

  const onSubmit = async (data: CreatePotForm) => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to create a pot.",
        variant: "destructive",
      })
      return
    }

    const contractAddress = CONTRACT_ADDRESSES[data.chainId]?.potFactory
    if (!contractAddress || contractAddress === "0x0000000000000000000000000000000000000000") {
      // Mock pot creation for demo
      const mockAddress = `0x${Math.random().toString(16).slice(2, 42)}` as Address
      setCreatedPot({
        address: mockAddress,
        name: data.name,
      })
      toast({
        title: "Pot created successfully!",
        description: "Your savings pot has been deployed (demo mode).",
      })
      return
    }

    try {
      writeContract({
        address: contractAddress,
        abi: PotFactoryABI,
        functionName: "createPot",
        args: [
          data.name,
          data.token as Address,
          data.privacyMode === "commit-prove" ? 1 : 0,
          BigInt(data.threshold),
          data.members as Address[],
        ],
      })
    } catch (error) {
      toast({
        title: "Failed to create pot",
        description: "There was an error creating your pot. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle successful transaction
  if (isSuccess && hash && !createdPot) {
    // In a real implementation, we'd parse the transaction receipt for the pot address
    const mockAddress = `0x${hash.slice(2, 42)}` as Address
    setCreatedPot({
      address: mockAddress,
      name: getValues("name"),
    })
  }

  const copyAddress = () => {
    if (createdPot) {
      navigator.clipboard.writeText(createdPot.address)
      toast({
        title: "Address copied",
        description: "Pot address copied to clipboard.",
      })
    }
  }

  if (!isConnected) {
    return (
      <div className="text-center space-y-4 py-8">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#f59e0b]/10 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-[#f59e0b]" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Wallet Required</h3>
          <p className="text-muted-foreground">Please connect your wallet to create a savings pot.</p>
        </div>
      </div>
    )
  }

  if (createdPot) {
    return (
      <div className="text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#22c55e]/10 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-[#22c55e]" />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Pot created successfully!</h3>
          <p className="text-muted-foreground">Your "{createdPot.name}" savings pot is now live.</p>
        </div>

        <Card className="p-4 bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <Label className="text-sm text-muted-foreground">Pot Address</Label>
              <p className="font-mono text-sm">{formatAddress(createdPot.address, 8)}</p>
            </div>
            <Button size="sm" variant="outline" onClick={copyAddress}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {hash && (
          <Card className="p-4 bg-muted/30">
            <div className="text-left">
              <Label className="text-sm text-muted-foreground">Transaction Hash</Label>
              <p className="font-mono text-xs break-all">{hash}</p>
            </div>
          </Card>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="bg-[#6c5ce7] hover:bg-[#5a4fd4]">
            <a href={`/pot/${createdPot.address}`}>View pot</a>
          </Button>
          <Button variant="outline" onClick={() => setCreatedPot(null)}>
            Create another pot
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Pot Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Pot Name</Label>
        <Input id="name" placeholder="e.g., Vacation Fund, Emergency Savings" {...form.register("name")} />
        {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
      </div>

      {/* Network Selection */}
      <div className="space-y-2">
        <Label>Network</Label>
        <Select
          value={watch("chainId")?.toString()}
          onValueChange={(value) => setValue("chainId", Number.parseInt(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select network" />
          </SelectTrigger>
          <SelectContent>
            {supportedChains.map((chain) => (
              <SelectItem key={chain.id} value={chain.id.toString()}>
                {chainConfig[chain.id]?.name || chain.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.chainId && (
          <p className="text-sm text-destructive">{form.formState.errors.chainId.message}</p>
        )}
      </div>

      {/* Token Selection */}
      <div className="space-y-2">
        <Label htmlFor="token">Token</Label>
        <Select value={watch("token")} onValueChange={(value) => setValue("token", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0x0000000000000000000000000000000000000000">Native Token (ETH/MATIC)</SelectItem>
            <SelectItem value="0xa0b86a33e6776e681c6c5b7f4b8b8b8b8b8b8b8b">USDC</SelectItem>
            <SelectItem value="0xb0b86a33e6776e681c6c5b7f4b8b8b8b8b8b8b8b">USDT</SelectItem>
          </SelectContent>
        </Select>
        {form.formState.errors.token && (
          <p className="text-sm text-destructive">{form.formState.errors.token.message}</p>
        )}
      </div>

      {/* Privacy Mode */}
      <div className="space-y-2">
        <Label>Privacy Mode</Label>
        <Select
          value={watch("privacyMode")}
          onValueChange={(value) => setValue("privacyMode", value as "commit-prove")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select privacy mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="commit-prove">Commit & Prove (Recommended)</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          Commit & Prove uses zero-knowledge proofs to keep deposits private while proving the total.
        </p>
      </div>

      {/* Reveal Threshold */}
      <div className="space-y-2">
        <Label htmlFor="threshold">Reveal Threshold</Label>
        <Input
          id="threshold"
          type="number"
          min="1"
          max="100"
          placeholder="Number of shares required to reveal total"
          {...form.register("threshold", { valueAsNumber: true })}
        />
        <p className="text-sm text-muted-foreground">Number of member shares required to reveal the pot total.</p>
        {form.formState.errors.threshold && (
          <p className="text-sm text-destructive">{form.formState.errors.threshold.message}</p>
        )}
      </div>

      {/* Members */}
      <div className="space-y-4">
        <Label>Members</Label>

        <div className="flex gap-2">
          <Input
            placeholder="Enter wallet address or ENS name"
            value={memberInput}
            onChange={(e) => setMemberInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addMember()
              }
            }}
          />
          <Button type="button" variant="outline" onClick={addMember}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {members.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{members.length} member(s) added:</p>
            <div className="flex flex-wrap gap-2">
              {members.map((member, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-2">
                  {member.includes(".eth") ? member : formatAddress(member as Address)}
                  <button type="button" onClick={() => removeMember(index)} className="hover:text-destructive">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {form.formState.errors.members && (
          <p className="text-sm text-destructive">{form.formState.errors.members.message}</p>
        )}
      </div>

      {error && (
        <Card className="p-4 border-destructive/20 bg-destructive/5">
          <p className="text-sm text-destructive">Transaction failed: {error.message || "Unknown error occurred"}</p>
        </Card>
      )}

      <Button type="submit" className="w-full bg-[#6c5ce7] hover:bg-[#5a4fd4]" disabled={isPending || isConfirming}>
        {isPending || isConfirming ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {isPending ? "Confirming..." : "Creating pot..."}
          </>
        ) : (
          "Create pot"
        )}
      </Button>
    </form>
  )
}
