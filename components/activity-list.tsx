"use client"
import { ExternalLink, UserPlus, Shield, Key, TrendingUp } from "lucide-react"
import { formatAddress, formatRelativeTime } from "@/lib/format"
import type { PotActivity } from "@/lib/zustand/usePot"

interface ActivityListProps {
  activities: PotActivity[]
}

export function ActivityList({ activities }: ActivityListProps) {
  const getActivityIcon = (type: PotActivity["type"]) => {
    switch (type) {
      case "joined":
        return UserPlus
      case "committed":
        return Shield
      case "proof_submitted":
        return Shield
      case "reveal_requested":
        return Key
      case "total_revealed":
        return TrendingUp
      default:
        return Shield
    }
  }

  const getActivityLabel = (type: PotActivity["type"]) => {
    switch (type) {
      case "joined":
        return "Joined pot"
      case "committed":
        return "Made commitment"
      case "proof_submitted":
        return "Submitted proof"
      case "reveal_requested":
        return "Requested reveal"
      case "total_revealed":
        return "Total revealed"
      default:
        return "Unknown activity"
    }
  }

  const getActivityColor = (type: PotActivity["type"]) => {
    switch (type) {
      case "joined":
        return "text-[#6c5ce7]"
      case "committed":
        return "text-[#00d1b2]"
      case "proof_submitted":
        return "text-[#22c55e]"
      case "reveal_requested":
        return "text-[#f59e0b]"
      case "total_revealed":
        return "text-[#ef4444]"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="space-y-4">
      {activities.length > 0 ? (
        <div className="space-y-3">
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.type)
            return (
              <div
                key={activity.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div
                  className={`w-8 h-8 rounded-lg bg-current/10 flex items-center justify-center ${getActivityColor(activity.type)}`}
                >
                  <Icon className={`w-4 h-4 ${getActivityColor(activity.type)}`} />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium">{getActivityLabel(activity.type)}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatAddress(activity.member)} • {formatRelativeTime(activity.timestamp)}
                  </p>
                </div>

                {activity.txHash && (
                  <a
                    href={`https://amoy.polygonscan.com/tx/${activity.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>No activity yet</p>
          <p className="text-sm">Activity will appear here as members interact with the pot</p>
        </div>
      )}
    </div>
  )
}
