"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Loader2, Shield, CheckCircle, AlertCircle, Settings, Upload } from "lucide-react"
import { useZk } from "@/lib/zustand/useZk"
import { generateMockProof, verifyMockProof } from "@/zk/mock/mockProver"
import { useToast } from "@/hooks/use-toast"

export function ProofPanel() {
  const { mode, lastProof, verifyStatus, setMode, setLastProof, setVerifyStatus, setError } = useZk()
  const [deposits, setDeposits] = useState<string[]>([""])
  const [claimedTotal, setClaimedTotal] = useState("")
  const [proofInput, setProofInput] = useState("")
  const [revealShares, setRevealShares] = useState<string[]>([""])
  const { toast } = useToast()

  const addDepositField = () => {
    setDeposits([...deposits, ""])
  }

  const updateDeposit = (index: number, value: string) => {
    const newDeposits = [...deposits]
    newDeposits[index] = value
    setDeposits(newDeposits)
  }

  const removeDeposit = (index: number) => {
    if (deposits.length > 1) {
      setDeposits(deposits.filter((_, i) => i !== index))
    }
  }

  const generateProof = async () => {
    setVerifyStatus("generating")
    setError(null)

    try {
      const depositNumbers = deposits.map((d) => Number.parseFloat(d) || 0).filter((d) => d > 0)
      const total = Number.parseFloat(claimedTotal) || 0

      if (depositNumbers.length === 0) {
        throw new Error("Please enter at least one deposit amount")
      }

      if (total <= 0) {
        throw new Error("Please enter a valid claimed total")
      }

      const actualTotal = depositNumbers.reduce((sum, d) => sum + d, 0)
      if (Math.abs(actualTotal - total) > 0.001) {
        throw new Error("Claimed total doesn't match sum of deposits")
      }

      const proof = await generateMockProof(depositNumbers, total)
      setLastProof(proof)
      setVerifyStatus("success")

      toast({
        title: "Proof generated successfully!",
        description: `Generated ${mode === "mock" ? "mock" : "Noir"} proof for ${depositNumbers.length} deposits.`,
      })
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to generate proof")
      setVerifyStatus("error")
      toast({
        title: "Proof generation failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      })
    }
  }

  const verifyProof = async () => {
    if (!lastProof && !proofInput) {
      toast({
        title: "No proof to verify",
        description: "Please generate a proof first or paste one to verify.",
        variant: "destructive",
      })
      return
    }

    setVerifyStatus("verifying")

    try {
      const proofToVerify = lastProof || JSON.parse(proofInput)
      const isValid = await verifyMockProof(proofToVerify)

      if (isValid) {
        setVerifyStatus("success")
        toast({
          title: "Proof verified!",
          description: "The proof is valid and can be submitted to the blockchain.",
        })
      } else {
        setVerifyStatus("error")
        toast({
          title: "Proof verification failed",
          description: "The proof is invalid or corrupted.",
          variant: "destructive",
        })
      }
    } catch (error) {
      setVerifyStatus("error")
      setError("Invalid proof format")
      toast({
        title: "Verification error",
        description: "Could not parse or verify the proof.",
        variant: "destructive",
      })
    }
  }

  const submitProof = async () => {
    if (!lastProof) return

    try {
      // Simulate blockchain submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Proof submitted!",
        description: "Your proof has been submitted to the blockchain.",
      })
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Failed to submit proof to blockchain.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Zero-Knowledge Proofs
            </CardTitle>
            <CardDescription>Generate, verify, and submit privacy-preserving proofs</CardDescription>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="mode-toggle" className="text-sm">
                Mock
              </Label>
              <Switch
                id="mode-toggle"
                checked={mode === "noir"}
                onCheckedChange={(checked) => setMode(checked ? "noir" : "mock")}
              />
              <Label htmlFor="mode-toggle" className="text-sm">
                Noir
              </Label>
            </div>
            <Badge variant={mode === "mock" ? "secondary" : "default"}>{mode.toUpperCase()}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="verify">Verify</TabsTrigger>
            <TabsTrigger value="reveal">Reveal</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Deposit Amounts</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Enter the amounts you want to prove without revealing individual values
                </p>

                <div className="space-y-2">
                  {deposits.map((deposit, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="0.0"
                        value={deposit}
                        onChange={(e) => updateDeposit(index, e.target.value)}
                        type="number"
                        step="0.001"
                      />
                      {deposits.length > 1 && (
                        <Button variant="outline" size="sm" onClick={() => removeDeposit(index)}>
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <Button variant="outline" size="sm" onClick={addDepositField} className="mt-2 bg-transparent">
                  Add deposit
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="claimed-total">Claimed Total</Label>
                <Input
                  id="claimed-total"
                  placeholder="0.0"
                  value={claimedTotal}
                  onChange={(e) => setClaimedTotal(e.target.value)}
                  type="number"
                  step="0.001"
                />
                <p className="text-sm text-muted-foreground">The total amount you claim these deposits sum to</p>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Proof Generation</h4>
                  {verifyStatus === "generating" && (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Generating...</span>
                    </div>
                  )}
                </div>

                {verifyStatus === "generating" && <Progress value={33} className="w-full" />}

                <Button
                  onClick={generateProof}
                  disabled={verifyStatus === "generating"}
                  className="w-full bg-[#6c5ce7] hover:bg-[#5a4fd4]"
                >
                  {verifyStatus === "generating" ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating proof...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Generate proof
                    </>
                  )}
                </Button>

                {lastProof && (
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                        <span className="font-medium text-sm">Proof Generated</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Commitment:</span>
                          <p className="font-mono text-xs break-all">{lastProof.commitment}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Nullifier:</span>
                          <p className="font-mono text-xs break-all">{lastProof.nullifier}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="verify" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Proof Verification</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Verify a proof locally before submitting to the blockchain
                </p>
              </div>

              {lastProof ? (
                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-[#6c5ce7]" />
                      <span className="font-medium text-sm">Current Proof</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Using proof from Generate tab</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="proof-input">Paste Proof JSON</Label>
                  <textarea
                    id="proof-input"
                    className="w-full h-32 p-3 border rounded-md resize-none font-mono text-sm"
                    placeholder="Paste proof JSON here..."
                    value={proofInput}
                    onChange={(e) => setProofInput(e.target.value)}
                  />
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={verifyProof}
                  disabled={verifyStatus === "verifying"}
                  className="flex-1 bg-[#00d1b2] hover:bg-[#00b8a0]"
                >
                  {verifyStatus === "verifying" ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Verify proof
                    </>
                  )}
                </Button>

                {verifyStatus === "success" && lastProof && (
                  <Button onClick={submitProof} className="flex-1 bg-[#22c55e] hover:bg-[#16a34a]">
                    Submit to chain
                  </Button>
                )}
              </div>

              {verifyStatus === "success" && (
                <Card className="border-[#22c55e]/20 bg-[#22c55e]/5">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                      <span className="font-medium text-sm text-[#22c55e]">Proof Valid</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      The proof is mathematically valid and ready for submission
                    </p>
                  </CardContent>
                </Card>
              )}

              {verifyStatus === "error" && (
                <Card className="border-[#ef4444]/20 bg-[#ef4444]/5">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-[#ef4444]" />
                      <span className="font-medium text-sm text-[#ef4444]">Verification Failed</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">The proof could not be verified or is invalid</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="reveal" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Group Reveal</Label>
                <p className="text-sm text-muted-foreground mb-3">Combine member shares to reveal the pot total</p>
              </div>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium">Threshold Status</h4>
                      <p className="text-sm text-muted-foreground">2 of 3 shares collected</p>
                    </div>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  <Progress value={66} className="mb-2" />
                  <p className="text-xs text-muted-foreground">1 more share needed</p>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Label>Member Shares</Label>
                {revealShares.map((share, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Paste member share JSON..."
                      value={share}
                      onChange={(e) => {
                        const newShares = [...revealShares]
                        newShares[index] = e.target.value
                        setRevealShares(newShares)
                      }}
                    />
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRevealShares([...revealShares, ""])}
                  className="mt-2"
                >
                  Add share
                </Button>
              </div>

              <Button disabled className="w-full bg-muted text-muted-foreground">
                Reveal Total (Threshold not met)
              </Button>

              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="w-4 h-4" />
                    <span className="font-medium text-sm">How it works</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Each member generates a secret share. When enough shares are combined (threshold), the total can be
                    revealed without exposing individual contributions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
