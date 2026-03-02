import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Classroom Experience Feedback
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
            Structured feedback,
            <br />
            not rumors.
          </h1>
          <p className="mx-auto mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground">
            A safe, moderated platform for high school students to share
            constructive classroom experience feedback. Data-driven.
            Responsible. Transparent.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <Button size="lg">
              Get Started
              <ArrowRight className="size-4" />
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
        }}
      />
    </section>
  )
}
