import { CreatePotForm } from "@/components/create-pot-form"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CreatePotPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container py-12">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">Create a savings pot</h1>
            <p className="text-lg text-muted-foreground text-balance">
              Set up a private group savings pot with zero-knowledge privacy protection.
            </p>
          </div>

          <Card className="card-shadow-lg">
            <CardHeader>
              <CardTitle>Pot Configuration</CardTitle>
              <CardDescription>Configure your group savings pot settings and invite members.</CardDescription>
            </CardHeader>
            <CardContent>
              <CreatePotForm />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
