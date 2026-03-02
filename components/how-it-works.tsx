import { Shield, BarChart3, MessageSquare } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Structured Rubric",
    description:
      "Five research-backed categories rated on a 1-5 scale. No open-ended gossip, only structured, actionable classroom feedback.",
  },
  {
    icon: Shield,
    title: "Moderated & Safe",
    description:
      "Multi-layer AI and human moderation filters out personal attacks, private info, and defamatory content before publishing.",
  },
  {
    icon: MessageSquare,
    title: "Constructive Voice",
    description:
      "Students express real classroom experiences. Teachers can claim profiles and respond. Parents get read-only access.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-border">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-24">
        <div className="mb-14 max-w-md">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            How It Works
          </p>
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Feedback built on structure, not noise.
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col gap-4">
              <div className="flex size-10 items-center justify-center rounded-md border border-border bg-secondary">
                <feature.icon className="size-5 text-foreground" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
