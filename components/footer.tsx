import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-md bg-foreground">
                <span className="text-xs font-bold text-background">PT</span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                Peak Teach Review
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Structured classroom experience feedback. Independent platform, not
              affiliated with any school district.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
              Platform
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
                  Browse Teachers
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
                  Submit Review
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
                  Claim Profile
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
              Legal
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
                  Community Guidelines
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
              Support
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
                  Report an Issue
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
                  Request Takedown
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">
            Peak Teach Review is an independent platform. Not affiliated with any
            school or district.
          </p>
          <p className="text-xs text-muted-foreground">
            Users must be 13 or older.
          </p>
        </div>
      </div>
    </footer>
  )
}
