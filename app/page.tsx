import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { BrowseTeachers } from "@/components/browse-teachers"
import { ReviewForm } from "@/components/review-form"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <BrowseTeachers />
        <ReviewForm />
      </main>
      <Footer />
    </div>
  )
}
