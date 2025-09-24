"use client"

import { create } from "zustand"

interface UiState {
  depositSheetOpen: boolean
  shareKeyModalOpen: boolean
  proofPanelOpen: boolean
  setDepositSheetOpen: (open: boolean) => void
  setShareKeyModalOpen: (open: boolean) => void
  setProofPanelOpen: (open: boolean) => void
}

export const useUi = create<UiState>((set) => ({
  depositSheetOpen: false,
  shareKeyModalOpen: false,
  proofPanelOpen: false,
  setDepositSheetOpen: (depositSheetOpen) => set({ depositSheetOpen }),
  setShareKeyModalOpen: (shareKeyModalOpen) => set({ shareKeyModalOpen }),
  setProofPanelOpen: (proofPanelOpen) => set({ proofPanelOpen }),
}))
