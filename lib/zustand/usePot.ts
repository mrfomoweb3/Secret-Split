"use client"

import { create } from "zustand"
import type { Address } from "viem"

export interface PotMember {
  address: Address
  joinedAt: number
  nickname?: string
  participationStreak: number
}

export interface PotActivity {
  id: string
  type: "joined" | "committed" | "proof_submitted" | "reveal_requested" | "total_revealed"
  member: Address
  timestamp: number
  txHash?: string
}

export interface PotData {
  address: Address
  name: string
  owner: Address
  token: Address
  privacyMode: number
  threshold: number
  createdAt: number
  memberCount: number
  members: PotMember[]
  activities: PotActivity[]
  healthScore: number
  daysActive: number
  proofsSubmitted: number
}

interface PotState {
  currentPot: PotData | null
  loading: boolean
  error: string | null
  setPot: (pot: PotData) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  addActivity: (activity: PotActivity) => void
  updateHealthScore: (score: number) => void
}

export const usePot = create<PotState>((set) => ({
  currentPot: null,
  loading: false,
  error: null,
  setPot: (pot) => set({ currentPot: pot }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  addActivity: (activity) =>
    set((state) => ({
      currentPot: state.currentPot
        ? {
            ...state.currentPot,
            activities: [activity, ...state.currentPot.activities],
          }
        : null,
    })),
  updateHealthScore: (healthScore) =>
    set((state) => ({
      currentPot: state.currentPot ? { ...state.currentPot, healthScore } : null,
    })),
}))
