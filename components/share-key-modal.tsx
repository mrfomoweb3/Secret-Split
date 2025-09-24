"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Download, QrCode, Users, Key } from "lucide-react"
import { useUi } from "@/lib/zustand/useUi"
import { useToast } from "@/hooks/use-toast"

export function ShareKeyModal() {
  const { shareKeyModalOpen, setShareKeyModalOpen } = useUi()
  const [step, setStep] = useState<"threshold" | "generate" | "reveal">("threshold")
  const { toast } = useToast()

  const requiredShares = 3
  const collectedShares = 1
  const progress = (collectedShares / requiredShares) * 100

  const generateShare = () => {
    // Mock share generation
    const mockShare = {
      address: "0x1234...5678",
      share: "share_data_here",
      threshold: requiredShares,
      timestamp: Date.now(),
    }

    const shareData = JSON.stringify(mockShare, null, 2)
    const blob = new Blob([shareData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "pot-share.json"
    a.click()

    toast({
      title: "Share generated",
      description: "Your share has been downloaded. Keep it safe!",
    })

    setStep("reveal")
  }

  const revealTotal = () => {
    toast({
      title: "Total revealed!",
      description: "The pot total has been revealed to all members.",
    })
    setShareKeyModalOpen(false)
    setStep("threshold")
  }

  return (
    <Dialog open={shareKeyModalOpen} onOpenChange={setShareKeyModalOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Reveal pot total</DialogTitle>
          <DialogDescription>Use group key shares to reveal the total amount saved by all members.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {step === "threshold" && (
            <>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-[#f59e0b]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Threshold Status</h3>
                      <p className="text-sm text-muted-foreground">
                        {collectedShares} of {requiredShares} shares collected
                      </p>
                    </div>
                  </div>

                  <Progress value={progress} className="mb-2" />
                  <p className="text-xs text-muted-foreground">
                    {requiredShares - collectedShares} more shares needed to reveal total
                  </p>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <h4 className="font-medium text-sm">Share Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-sm">Alice (You)</span>
                    <Badge variant="secondary">Generated</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-sm">Bob</span>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-sm">Charlie</span>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                </div>
              </div>

              <Button onClick={() => setStep("generate")} className="w-full">
                <Key className="w-4 h-4 mr-2" />
                Generate your share
              </Button>
            </>
          )}

          {step === "generate" && (
            <>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#6c5ce7]/10 flex items-center justify-center">
                  <Key className="w-8 h-8 text-[#6c5ce7]" />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Generate your share</h3>
                  <p className="text-sm text-muted-foreground">
                    Your share is part of the group key needed to reveal the pot total. Keep it safe!
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Button onClick={generateShare} className="w-full bg-[#6c5ce7] hover:bg-[#5a4fd4]">
                  <Download className="w-4 h-4 mr-2" />
                  Download share (JSON)
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <QrCode className="w-4 h-4 mr-2" />
                  Show QR code
                </Button>
              </div>

              <div className="bg-muted/30 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  Your share contains encrypted data that can only be used with other member shares to reveal the total.
                </p>
              </div>
            </>
          )}

          {step === "reveal" && (
            <>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#22c55e]/10 flex items-center justify-center">
                  <Key className="w-8 h-8 text-[#22c55e]" />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Ready to reveal</h3>
                  <p className="text-sm text-muted-foreground">
                    All required shares have been collected. You can now reveal the pot total.
                  </p>
                </div>
              </div>

              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-[#22c55e] mb-1">3/3 shares</p>
                  <p className="text-sm text-muted-foreground">Threshold reached</p>
                </CardContent>
              </Card>

              <Button onClick={revealTotal} className="w-full bg-[#22c55e] hover:bg-[#16a34a]">
                Reveal total amount
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
