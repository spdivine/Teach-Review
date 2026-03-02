# Screen Map — Peak Teach Review (UI v0)

This document maps **existing routes/screens** and the **data + states + permissions** the current UI implies. UI is v0-generated and locked; any backend wiring should follow what’s documented here.

## Routes found (App Router)
- `/`

## / — Home (Landing + Browse + Submit Review)
**Purpose:** Provide a single entry point to browse teacher summaries and submit a structured classroom-experience review.

**Primary actions:**
- Scroll/jump to in-page sections: Browse (`#browse`), How It Works (`#how-it-works`), Leave Feedback (`#review`)
- Browse/search teachers by name/subject and filter by school (in-page)
- Start a “Sign In” flow (UI button exists; route/flow not implemented)
- Fill and submit a structured review (ratings + optional comment)

**UI sections/components:**
- `app/layout.tsx`: global metadata (title/description/icons) and analytics (`@vercel/analytics/next`)
- `app/page.tsx`: page composition and overall layout wrapper
- `components/header.tsx`: sticky header + anchor nav + “Sign In” button + search icon button
- `components/hero.tsx`: marketing hero + “Get Started” / “Learn More” buttons (no navigation wired)
- `components/how-it-works.tsx`: feature explanation cards
- `components/browse-teachers.tsx`: teacher list, search input, school filter chips, empty state
- `components/teacher-card.tsx`: teacher summary card with per-category bars + overall rating + review count
- `components/review-form.tsx`: structured review form (teacher name, 5 ratings, optional comment, submit)
- `components/footer.tsx`: platform/legal/support link columns (all `href="#"` placeholders) + disclaimers

**Data needed:**
- Teacher (summary list)
  - `id` (inferred; needed for stable navigation and reviews)
  - `name`
  - `schoolName` (string as displayed)
  - `subjects[]` (strings as displayed)
  - `ratingsAverages` (numbers 1–5)
    - `clarity`, `organization`, `feedback`, `workload`, `engagement`
  - `reviewCount` (number)
  - `overallAverage` (inferred; UI derives from the 5 category averages)
- School (filter options)
  - `id` (inferred)
  - `name`
  - `isActive` (inferred; if you want to hide old/closed schools)
- Review submission payload
  - `teacherId` (inferred; UI currently collects `teacherName` free-text)
  - `teacherName` (current UI input; if kept, needs normalization/dedup strategy)
  - `ratings` (required integers 1–5)
    - `clarity`, `organization`, `feedback`, `workload`, `engagement`
  - `comment` (optional string, max 500)
  - `termKey` / `semester` (inferred; UI promises “One review per teacher per semester”)
  - `submitterUserId` (inferred; required to enforce limits and abuse prevention)
  - `status` (inferred; moderation implied)
    - e.g. `draft|submitted|under_review|published|rejected`

**User states:** (loading / empty / error / success)
- Loading
  - Teacher list loading (not implemented in UI; required when wiring API)
  - Review submit in-flight (not implemented in UI; required when wiring API)
- Empty
  - Browse results empty is implemented: “No teachers found matching your search.”
- Error
  - Not implemented in UI; backend wiring should add safe error messaging for:
    - teacher list fetch failures
    - review submission failures
    - auth/session failures (if submission requires sign-in)
- Success
  - Browse list populated is implemented via static mock data
  - Review “submit success” confirmation is not implemented; backend will need a success state (toast, inline message, redirect, etc.) consistent with locked UI (inferred)

**Permissions:** (who can view / create / edit / delete)
- View
  - `/` is public read-only by default (inferred from marketing + browse UI)
  - Parents read-only is stated in `components/how-it-works.tsx` (inferred: no submission permission)
- Create
  - Review creation should be restricted to authenticated, 13+ users (inferred from product definition + UI disclaimer)
- Edit/Delete
  - Not present in UI; inferred requirements for wiring:
    - submitter can edit/delete only while not published (optional, policy decision)
    - moderators/admin can change status, hide, or remove reviews
    - teachers can respond/claim profile (implied by marketing copy; no UI route yet)

**Notes:** (anything that impacts backend, validation, or future scope)
- In-page navigation uses anchors (`#browse`, `#how-it-works`, `#review`), not separate routes.
- Footer links are placeholders (`href="#"`), so “Browse Teachers / Submit Review / Claim Profile / Legal / Support” screens are **implied but not implemented as routes**.
- The review form currently collects **Teacher Name as free-text**, which is risky for data integrity; backend wiring must decide whether to:
  - map free-text to an existing `Teacher`, or
  - treat as “suggest a teacher” + moderation/approval flow (inferred), or
  - replace with a teacher picker (would require UI changes; out of scope here).
- The UI promises “One review per teacher per semester”; backend must define “semester” and enforce uniqueness \(user, teacher, semester\).
- Moderation is explicitly implied by the warning copy (“Reviews are moderated before publishing.”). Backend should support:
  - risk scoring / flags (inferred)
  - review status transitions and audit logs (inferred)
- No teacher detail/profile route exists in code (yet). Current browse view is a summary card only; there is no click-through action.
- “Sign In” exists as a button only; no route or handler exists in UI. Backend wiring will need an auth strategy and a minimal UI-compatible entry point (inferred).

# Shared Entities (Inferred)
- User
  - `id`, `email` (inferred), `displayName` (pseudonymous; inferred), `role` (e.g. `student|parent|teacher|admin|moderator` inferred)
  - `isEmailVerified` (inferred), `is13PlusConfirmed` (inferred), `createdAt`
- Session/Auth
  - `sessionId`/`token`, `userId`, `expiresAt`
- School
  - `id`, `name`, `district` (inferred), `state` (inferred), `isActive`
- Teacher
  - `id`, `name`, `schoolId`, `schoolName` (denormalized optional; inferred)
  - `subjects[]` (or join table; inferred)
  - `createdAt`, `updatedAt`
- TeacherSubject (if normalized)
  - `teacherId`, `subjectName` (or `subjectId`)
- Review
  - `id`, `teacherId`, `userId`
  - `semesterKey` (inferred), `submittedAt`
  - `ratings` (five category integers 1–5)
  - `comment` (optional, max 500)
  - `status` (inferred), `publishedAt` (inferred)
- TeacherRatingsAggregate (derived)
  - `teacherId`, `avgClarity`, `avgOrganization`, `avgFeedback`, `avgWorkload`, `avgEngagement`, `overallAvg`, `reviewCount`
- ModerationDecision / ModerationQueueItem
  - `id`, `reviewId`, `riskScore` (inferred), `reasons[]` (inferred)
  - `status` (e.g. `queued|approved|rejected|needs_changes` inferred)
  - `moderatorUserId` (nullable), `notes` (inferred), `createdAt`, `decidedAt`
- Abuse/RateLimitEvent (inferred)
  - `id`, `userId` (nullable), `ipHash` (inferred), `action`, `createdAt`
- Report (inferred; implied by PRD even if not in UI route)
  - `id`, `reviewId` (or `teacherId`), `reporterUserId` (nullable), `reason`, `details` (optional), `createdAt`, `status`
- TakedownRequest (inferred; implied by footer + PRD)
  - `id`, `requesterUserId` (nullable), `targetType`, `targetId`, `reason`, `contactEmail` (inferred), `status`, `createdAt`
- TeacherClaimRequest (inferred; implied by marketing copy/footer)
  - `id`, `teacherId`, `requesterUserId`, `verificationMethod` (inferred), `status`, `createdAt`, `approvedAt`

# Open Questions
- Should **submitting a review** require sign-in (student-only), or is anonymous submission allowed (higher risk)? (Required to wire API + enforcement.)
- How is a teacher selected for a review: keep **free-text teacher name** (needs matching + dedup), or require selecting an existing teacher `id`? (Required for correct data model.)
- What is the authoritative definition of **“semester”** for the “one review per teacher per semester” rule (date ranges, term keys, school-specific calendars)? (Required for uniqueness enforcement.)
- Are teacher profiles strictly **read-only** for parents, and do parents have accounts at all? (Required for auth/roles and permission checks.)
- What minimum moderation states are required before a review can affect **teacher aggregates** (e.g., only `published` counts)? (Required for accurate rating displays.)
