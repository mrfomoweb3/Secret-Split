import type { ProofData } from "@/lib/zustand/useZk"

export async function generateMockProof(deposits: number[], claimedTotal: number): Promise<ProofData> {
  // Simulate proof generation delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Generate deterministic mock proof
  const commitment = `0x${Math.random().toString(16).slice(2, 66)}`
  const nullifier = `0x${Math.random().toString(16).slice(2, 66)}`

  return {
    proof: `mock_proof_${Date.now()}`,
    publicSignals: [claimedTotal.toString()],
    nullifier,
    commitment,
  }
}

export async function verifyMockProof(proof: ProofData): Promise<boolean> {
  // Simulate verification delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock verification always succeeds for demo
  return proof.proof.startsWith("mock_proof_")
}

export function generateMockShare(memberAddress: string, threshold: number): string {
  // Generate a mock Shamir secret share
  const share = {
    address: memberAddress,
    share: Math.random().toString(16).slice(2, 34),
    threshold,
    timestamp: Date.now(),
  }

  return JSON.stringify(share, null, 2)
}
