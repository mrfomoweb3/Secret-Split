"use client"

import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { formatAddress, formatRelativeTime } from "@/lib/format"
import type { PotMember } from "@/lib/zustand/usePot"

interface MembersAvatarsProps {
  members: PotMember[]
}

export function MembersAvatars({ members }: MembersAvatarsProps) {
  const getInitials = (address: string, nickname?: string) => {
    if (nickname) return nickname.slice(0, 2).toUpperCase()
    return address.slice(2, 4).toUpperCase()
  }

  const getAvatarColor = (address: string) => {
    const colors = [
      "bg-[#6c5ce7]",
      "bg-[#00d1b2]",
      "bg-[#f59e0b]",
      "bg-[#22c55e]",
      "bg-[#ef4444]",
      "bg-[#8b5cf6]",
      "bg-[#06b6d4]",
      "bg-[#f97316]",
    ]
    const index = Number.parseInt(address.slice(-1), 16) % colors.length
    return colors[index]
  }

  return (
    <div className="space-y-4">
      <TooltipProvider>
        <div className="space-y-3">
          {members.map((member, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className={`w-10 h-10 rounded-full ${getAvatarColor(
                      member.address,
                    )} flex items-center justify-center text-white font-semibold text-sm`}
                  >
                    {getInitials(member.address, member.nickname)}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-center">
                    <p className="font-medium">{member.nickname || "Anonymous"}</p>
                    <p className="text-xs text-muted-foreground">{formatAddress(member.address)}</p>
                  </div>
                </TooltipContent>
              </Tooltip>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">{member.nickname || formatAddress(member.address)}</p>
                  {index === 0 && (
                    <Badge variant="secondary" className="text-xs">
                      Owner
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Joined {formatRelativeTime(member.joinedAt)} • {member.participationStreak} day streak
                </p>
              </div>

              <div className="text-right">
                <div className="w-2 h-2 rounded-full bg-[#22c55e] mb-1" />
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
            </div>
          ))}
        </div>
      </TooltipProvider>

      {members.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No members yet</p>
          <p className="text-sm">Share the pot link to invite friends</p>
        </div>
      )}
    </div>
  )
}
