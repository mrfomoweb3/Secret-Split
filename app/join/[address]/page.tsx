import { JoinPot } from "@/components/join-pot"
import { Navigation } from "@/components/navigation"

interface JoinPageProps {
  params: {
    address: string
  }
}

export default function JoinPage({ params }: JoinPageProps) {
  return (
    <div className="min-h-screen">
      <Navigation />
      <JoinPot address={params.address as `0x${string}`} />
    </div>
  )
}
