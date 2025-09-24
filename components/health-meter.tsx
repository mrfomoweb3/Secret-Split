"use client"
import { TrendingUp, Users, Shield, Clock } from "lucide-react"

interface HealthMeterProps {
  score: number
}

export function HealthMeter({ score }: HealthMeterProps) {
  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-[#22c55e]"
    if (score >= 60) return "text-[#f59e0b]"
    return "text-[#ef4444]"
  }

  const getHealthLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    if (score >= 40) return "Fair"
    return "Needs attention"
  }

  const healthFactors = [
    {
      icon: Users,
      label: "Active members",
      value: "5/5",
      color: "text-[#22c55e]",
    },
    {
      icon: Shield,
      label: "Proof cadence",
      value: "Daily",
      color: "text-[#00d1b2]",
    },
    {
      icon: Clock,
      label: "Participation streak",
      value: "7 days",
      color: "text-[#6c5ce7]",
    },
    {
      icon: TrendingUp,
      label: "Growth trend",
      value: "Stable",
      color: "text-[#f59e0b]",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Circular Health Meter */}
      <div className="flex items-center justify-center">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted/20"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(score / 100) * 314} 314`}
              className={getHealthColor(score)}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-bold ${getHealthColor(score)}`}>{score}%</span>
            <span className="text-sm text-muted-foreground">{getHealthLabel(score)}</span>
          </div>
        </div>
      </div>

      {/* Health Factors */}
      <div className="space-y-4">
        <h4 className="font-medium text-sm text-muted-foreground">Health is calculated from:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {healthFactors.map((factor, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <div className={`w-8 h-8 rounded-lg bg-current/10 flex items-center justify-center ${factor.color}`}>
                <factor.icon className={`w-4 h-4 ${factor.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{factor.label}</p>
                <p className={`text-sm ${factor.color}`}>{factor.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
        <p>
          Health score is derived from member activity, proof submission frequency, and participation streaks.
          Individual deposit amounts are never revealed.
        </p>
      </div>
    </div>
  )
}
