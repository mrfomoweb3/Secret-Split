"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Copy, Share, Users, Calendar, TrendingUp, Shield } from "lucide-react"
import { HealthMeter } from "@/components/health-meter"
import { MembersAvatars } from "@/components/members-avatars"
import { ActivityList } from "@/components/activity-list"
import { DepositSheet } from "@/components/deposit-sheet"
import { ShareKeyModal } from "@/components/share-key-modal"
import { ProofPanel } from "@/components/proof-panel"
import { usePot, type PotData } from "@/lib/zustand/usePot"
import { useUi } from "@/lib/zustand/useUi"
import { formatAddress } from "@/lib/format"
import { useToast } from "@/hooks/use-toast"
import type { Address } from "viem"

interface PotDashboardProps {
  address: Address
}

export function PotDashboard({ address }: PotDashboardProps) {
  const { currentPot, loading, setPot, setLoading } = usePot()
  const { setDepositSheetOpen, setShareKeyModalOpen, proofPanelOpen, setProofPanelOpen } = useUi()
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Load pot data (mock implementation)
    const loadPotData = async () => {
      setLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock pot data
      const mockPot: PotData = {
        address,
        name: address === "demo" ? "Demo Vacation Fund" : "Savings Pot",
        owner: "0x1234567890123456789012345678901234567890" as Address,
        token: "0x0000000000000000000000000000000000000000" as Address,
        privacyMode: 1,
        threshold: 3,
        createdAt: Math.floor(Date.now() / 1000) - 86400 * 7, // 7 days ago
        memberCount: 5,
        healthScore: 85,
        daysActive: 7,
        proofsSubmitted: 12,
        members: [
          {
            address: "0x1234567890123456789012345678901234567890" as Address,
            joinedAt: Math.floor(Date.now() / 1000) - 86400 * 7,
            nickname: "Alice",
            participationStreak: 7,
          },
          {
            address: "0x2345678901234567890123456789012345678901" as Address,
            joinedAt: Math.floor(Date.now() / 1000) - 86400 * 6,
            nickname: "Bob",
            participationStreak: 6,
          },
          {
            address: "0x3456789012345678901234567890123456789012" as Address,
            joinedAt: Math.floor(Date.now() / 1000) - 86400 * 5,
            nickname: "Charlie",
            participationStreak: 5,
          },
          {
            address: "0x4567890123456789012345678901234567890123" as Address,
            joinedAt: Math.floor(Date.now() / 1000) - 86400 * 4,
            nickname: "David",
            participationStreak: 4,
          },
          {
            address: "0x5678901234567890123456789012345678901234" as Address,
            joinedAt: Math.floor(Date.now() / 1000) - 86400 * 3,
            nickname: "Eve",
            participationStreak: 3,
          },
        ],
        activities: [
          {
            id: "1",
            type: "proof_submitted",
            member: "0x1234567890123456789012345678901234567890" as Address,
            timestamp: Math.floor(Date.now() / 1000) - 3600,
            txHash: "0xabcd1234",
          },
          {
            id: "2",
            type: "committed",
            member: "0x2345678901234567890123456789012345678901" as Address,
            timestamp: Math.floor(Date.now() / 1000) - 7200,
            txHash: "0xefgh5678",
          },
          {
            id: "3",
            type: "joined",
            member: "0x5678901234567890123456789012345678901234" as Address,
            timestamp: Math.floor(Date.now() / 1000) - 86400 * 3,
            txHash: "0xijkl9012",
          },
        ],
      }

      setPot(mockPot)
      setLoading(false)
    }

    loadPotData()
  }, [address, setPot, setLoading])

  const copyAddress = () => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    toast({
      title: "Address copied",
      description: "Pot address copied to clipboard.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const shareLink = () => {
    const url = `${window.location.origin}/join/${address}`
    navigator.clipboard.writeText(url)
    toast({
      title: "Share link copied",
      description: "Invite link copied to clipboard.",
    })
  }

  if (loading) {
    return (
      <main className="container py-8">
        <div className="space-y-6">
          <div className="h-8 bg-muted rounded animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="h-16 bg-muted rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (!currentPot) {
    return (
      <main className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Pot not found</h1>
          <p className="text-muted-foreground">The pot you're looking for doesn't exist or hasn't been deployed yet.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="container py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <a href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              All pots
            </a>
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <div>
            <h1 className="text-2xl font-bold">{currentPot.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline">Polygon Amoy</Badge>
              <button
                onClick={copyAddress}
                className="text-sm text-muted-foreground hover:text-foreground font-mono flex items-center gap-1"
              >
                {formatAddress(currentPot.address, 6)}
                <Copy className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        <Button variant="outline" onClick={shareLink}>
          <Share className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#6c5ce7]/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#6c5ce7]" />
              </div>
              <div>
                <p className="text-2xl font-bold">{currentPot.memberCount}</p>
                <p className="text-sm text-muted-foreground">Members</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#00d1b2]/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#00d1b2]" />
              </div>
              <div>
                <p className="text-2xl font-bold">{currentPot.daysActive}</p>
                <p className="text-sm text-muted-foreground">Days active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <div>
                <p className="text-2xl font-bold">7</p>
                <p className="text-sm text-muted-foreground">Participation streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#22c55e]/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#22c55e]" />
              </div>
              <div>
                <p className="text-2xl font-bold">{currentPot.proofsSubmitted}</p>
                <p className="text-sm text-muted-foreground">Proofs submitted</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Pot Health</CardTitle>
        </CardHeader>
        <CardContent>
          <HealthMeter score={currentPot.healthScore} />
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button onClick={() => setDepositSheetOpen(true)} className="bg-[#6c5ce7] hover:bg-[#5a4fd4]">
          Deposit
        </Button>
        <Button variant="outline" onClick={() => setProofPanelOpen(true)}>
          Generate proof
        </Button>
        <Button variant="outline" onClick={() => setShareKeyModalOpen(true)}>
          Reveal total
        </Button>
      </div>

      {/* Members and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Members ({currentPot.memberCount})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MembersAvatars members={currentPot.members} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityList activities={currentPot.activities} />
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <DepositSheet />
      <ShareKeyModal />
      {proofPanelOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Zero-Knowledge Proofs</h2>
              <Button variant="ghost" size="sm" onClick={() => setProofPanelOpen(false)}>
                ×
              </Button>
            </div>
            <div className="p-6">
              <ProofPanel />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
