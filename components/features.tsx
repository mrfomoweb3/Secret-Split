import { Card, CardContent } from "@/components/ui/card"
import { Shield, Eye, Users } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Shield,
      title: "Privacy first",
      description: "Zero-knowledge proofs keep individual deposits completely private while proving the group total.",
      color: "text-[#6c5ce7]",
      bgColor: "bg-[#6c5ce7]/10",
    },
    {
      icon: Eye,
      title: "One screen to act",
      description: "Simple, clean interface designed for mobile. Deposit, prove, and reveal in just a few taps.",
      color: "text-[#00d1b2]",
      bgColor: "bg-[#00d1b2]/10",
    },
    {
      icon: Users,
      title: "Group key reveal",
      description: "Only when enough members agree can the total be revealed. Democratic and transparent.",
      color: "text-[#f59e0b]",
      bgColor: "bg-[#f59e0b]/10",
    },
  ]

  return (
    <section className="container py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">How it works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Secret Split uses cutting-edge cryptography to enable private group savings without compromising on
            transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="card-shadow hover:card-shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-8">
                <div className={`w-16 h-16 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>

                <h3 className="font-semibold text-xl mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
