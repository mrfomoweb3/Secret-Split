import { formatEther, parseEther, type Address } from "viem"

export function formatAddress(address: Address, length = 4): string {
  return `${address.slice(0, 2 + length)}...${address.slice(-length)}`
}

export function formatAmount(amount: bigint, decimals = 18): string {
  return formatEther(amount)
}

export function parseAmount(amount: string): bigint {
  return parseEther(amount)
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString()
}

export function formatRelativeTime(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp * 1000
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return "Today"
  if (days === 1) return "Yesterday"
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  return `${Math.floor(days / 30)} months ago`
}
