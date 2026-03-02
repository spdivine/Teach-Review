import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md bg-foreground">
            <span className="text-sm font-bold text-background">PT</span>
          </div>
          <span className="text-base font-semibold tracking-tight text-foreground">
            Peak Teach Review
          </span>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#browse"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Browse
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            How It Works
          </a>
          <a
            href="#review"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Leave Feedback
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon-sm" aria-label="Search">
            <Search className="size-4" />
          </Button>
          <Button size="sm">Sign In</Button>
        </div>
      </div>
    </header>
  )
}
