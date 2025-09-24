"use client"

import { create } from "zustand"

export interface ProofData {
  proof: string
  publicSignals: string[]
  nullifier: string
  commitment: string
}

interface ZkState {
  mode: "mock" | "noir"
  lastProof: ProofData | null
  verifyStatus: "idle" | "generating" | "verifying" | "success" | "error"
  error: string | null
  setMode: (mode: "mock" | "noir") => void
  setLastProof: (proof: ProofData | null) => void
  setVerifyStatus: (status: ZkState["verifyStatus"]) => void
  setError: (error: string | null) => void
}

export const useZk = create<ZkState>((set) => ({
  mode: "mock",
  lastProof: null,
  verifyStatus: "idle",
  error: null,
  setMode: (mode) => set({ mode }),
  setLastProof: (lastProof) => set({ lastProof }),
  setVerifyStatus: (verifyStatus) => set({ verifyStatus }),
  setError: (error) => set({ error }),
}))
