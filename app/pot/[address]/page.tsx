import { PotDashboard } from "@/components/pot-dashboard"
import { Navigation } from "@/components/navigation"

interface PotPageProps {
  params: {
    address: string
  }
}

export default function PotPage({ params }: PotPageProps) {
  return (
    <div className="min-h-screen">
      <Navigation />
      <PotDashboard address={params.address as `0x${string}`} />
    </div>
  )
}
