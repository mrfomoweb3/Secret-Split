"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { parseEther } from "viem"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Loader2, AlertCircle } from "lucide-react"
import { useUi } from "@/lib/zustand/useUi"
import { useWallet } from "@/lib/zustand/useWallet"
import { usePot } from "@/lib/zustand/usePot"
import { PotABI } from "@/lib/contracts"
import { useToast } from "@/hooks/use-toast"

const depositSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  token: z.string().min(1, "Token is required"),
})

type DepositForm = z.infer<typeof depositSchema>

export function DepositSheet() {
  const { depositSheetOpen, setDepositSheetOpen } = useUi()
  const { isConnected } = useWallet()
  const { currentPot } = usePot()
  const { toast } = useToast()

  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const form = useForm<DepositForm>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      amount: "",
      token: "native",
    },
  })

  const onSubmit = async (data: DepositForm) => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to make a deposit.",
        variant: "destructive",
      })
      return
    }

    if (!currentPot) {
      toast({
        title: "No pot selected",
        description: "Please select a pot to deposit into.",
        variant: "destructive",
      })
      return
    }

    try {
      const amount = parseEther(data.amount)
      const commitment = BigInt(Math.floor(Math.random() * 1000000)) // Mock commitment

      writeContract({
        address: currentPot.address,
        abi: PotABI,
        functionName: "deposit",
        args: [commitment],
        value: data.token === "native" ? amount : undefined,
      })
    } catch (error) {
      toast({
        title: "Deposit failed",
        description: "There was an error processing your deposit. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle successful transaction
  if (isSuccess && hash) {
    toast({
      title: "Deposit successful!",
      description: `Deposited ${form.getValues("amount")} tokens to the pot.`,
    })
    setDepositSheetOpen(false)
    form.reset()
  }

  if (!isConnected) {
    return (
      <Sheet open={depositSheetOpen} onOpenChange={setDepositSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Wallet Required</SheetTitle>
            <SheetDescription>Please connect your wallet to make a deposit.</SheetDescription>
          </SheetHeader>
          <div className="flex items-center justify-center py-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#f59e0b]/10 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-[#f59e0b]" />
              </div>
              <p className="text-muted-foreground">Connect your wallet to continue</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Sheet open={depositSheetOpen} onOpenChange={setDepositSheetOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Make a deposit</SheetTitle>
          <SheetDescription>Add funds to the savings pot. Your deposit amount will remain private.</SheetDescription>
        </SheetHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" placeholder="0.0" {...form.register("amount")} />
            {form.formState.errors.amount && (
              <p className="text-sm text-destructive">{form.formState.errors.amount.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Token</Label>
            <Select value={form.watch("token")} onValueChange={(value) => form.setValue("token", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="native">MATIC (Native)</SelectItem>
                <SelectItem value="usdc">USDC</SelectItem>
                <SelectItem value="usdt">USDT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium text-sm mb-2">Privacy Protection</h4>
            <p className="text-sm text-muted-foreground">
              Your deposit amount will be hidden using zero-knowledge proofs. Only you will know how much you deposited.
            </p>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium text-sm mb-2">Estimated Network Fee</h4>
            <p className="text-sm text-muted-foreground">~0.001 MATIC ($0.02)</p>
          </div>

          {error && (
            <Card className="p-4 border-destructive/20 bg-destructive/5">
              <p className="text-sm text-destructive">
                Transaction failed: {error.message || "Unknown error occurred"}
              </p>
            </Card>
          )}

          <Button type="submit" className="w-full bg-[#6c5ce7] hover:bg-[#5a4fd4]" disabled={isPending || isConfirming}>
            {isPending || isConfirming ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {isPending ? "Confirming..." : "Processing deposit..."}
              </>
            ) : (
              "Confirm deposit"
            )}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
