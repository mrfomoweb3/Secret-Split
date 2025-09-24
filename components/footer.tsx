import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6c5ce7] text-white font-bold">
              S
            </div>
            <span className="font-serif text-xl font-semibold">Secret Split</span>
          </div>

          <div className="flex items-center gap-8">
            <Link href="/learn" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Learn
            </Link>
            <Link href="/pot/demo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Demo
            </Link>
            <span className="text-sm text-muted-foreground">Built with privacy in mind</span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            Secret Split uses zero-knowledge proofs to protect your privacy.
            <Link href="/learn" className="text-[#6c5ce7] hover:underline ml-1">
              Learn more
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
