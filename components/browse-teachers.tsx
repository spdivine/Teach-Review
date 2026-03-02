"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { TeacherCard } from "@/components/teacher-card"

const teachers = [
  {
    name: "Ms. Angela Rivera",
    school: "Panther Creek High",
    subjects: ["AP Biology", "Honors Chemistry"],
    ratings: { clarity: 4.5, organization: 4.2, feedback: 3.8, workload: 3.5, engagement: 4.7 },
    reviewCount: 34,
  },
  {
    name: "Mr. David Park",
    school: "Green Hope High",
    subjects: ["Calculus AB", "Precalculus"],
    ratings: { clarity: 4.1, organization: 4.6, feedback: 4.3, workload: 2.9, engagement: 3.8 },
    reviewCount: 22,
  },
  {
    name: "Mrs. Sharon Ellis",
    school: "Athens Drive High",
    subjects: ["English III", "Creative Writing"],
    ratings: { clarity: 4.8, organization: 4.4, feedback: 4.7, workload: 3.2, engagement: 4.9 },
    reviewCount: 41,
  },
]

const schools = ["All Schools", "Panther Creek", "Green Hope", "Athens Drive"]

export function BrowseTeachers() {
  const [search, setSearch] = useState("")
  const [activeSchool, setActiveSchool] = useState("All Schools")

  const filtered = teachers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.subjects.some((s) => s.toLowerCase().includes(search.toLowerCase()))
    const matchesSchool =
      activeSchool === "All Schools" || t.school.includes(activeSchool)
    return matchesSearch && matchesSchool
  })

  return (
    <section id="browse" className="border-b border-border">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-24">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Browse
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Teacher Profiles
            </h2>
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or subject..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {schools.map((school) => (
            <button
              key={school}
              onClick={() => setActiveSchool(school)}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                activeSchool === school
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {school}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {filtered.map((teacher) => (
            <TeacherCard key={teacher.name} teacher={teacher} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
              No teachers found matching your search.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
