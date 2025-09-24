import type { Address } from "viem"

// Smart Contract ABIs (placeholder implementations)
export const PotFactoryABI = [
  {
    name: "createPot",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "name", type: "string" },
      { name: "token", type: "address" },
      { name: "privacyMode", type: "uint8" },
      { name: "threshold", type: "uint256" },
      { name: "members", type: "address[]" },
    ],
    outputs: [{ name: "", type: "address" }],
  },
  {
    name: "PotCreated",
    type: "event",
    inputs: [
      { name: "pot", type: "address", indexed: true },
      { name: "owner", type: "address", indexed: true },
    ],
  },
] as const

export const PotABI = [
  {
    name: "join",
    type: "function",
    stateMutability: "payable",
    inputs: [],
    outputs: [],
  },
  {
    name: "deposit",
    type: "function",
    stateMutability: "payable",
    inputs: [{ name: "commitment", type: "uint256" }],
    outputs: [],
  },
  {
    name: "submitProof",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "proof", type: "bytes" },
      { name: "nullifier", type: "bytes32" },
    ],
    outputs: [],
  },
  {
    name: "requestReveal",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "share", type: "bytes" }],
    outputs: [],
  },
  {
    name: "revealTotal",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "combinedProof", type: "bytes" }],
    outputs: [],
  },
  {
    name: "memberCount",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "createdAt",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "privacyMode",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
  },
  {
    name: "token",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
  {
    name: "owner",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
  // Events
  {
    name: "MemberJoined",
    type: "event",
    inputs: [{ name: "member", type: "address", indexed: true }],
  },
  {
    name: "Committed",
    type: "event",
    inputs: [
      { name: "member", type: "address", indexed: true },
      { name: "commitment", type: "bytes32", indexed: true },
    ],
  },
  {
    name: "ProofSubmitted",
    type: "event",
    inputs: [{ name: "member", type: "address", indexed: true }],
  },
  {
    name: "RevealRequested",
    type: "event",
    inputs: [{ name: "member", type: "address", indexed: true }],
  },
  {
    name: "TotalRevealed",
    type: "event",
    inputs: [{ name: "total", type: "uint256", indexed: false }],
  },
] as const

// Contract addresses (placeholder - will be deployed)
export const CONTRACT_ADDRESSES: Record<number, { potFactory: Address }> = {
  80002: { potFactory: "0x0000000000000000000000000000000000000000" }, // Polygon Amoy
  11155111: { potFactory: "0x0000000000000000000000000000000000000000" }, // Sepolia
  84532: { potFactory: "0x0000000000000000000000000000000000000000" }, // Base Sepolia
}
