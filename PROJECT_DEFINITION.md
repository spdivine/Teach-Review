# Peak Teach Review — Project Definition

**Source:** PRD SaaS V.2  
**Product name:** Peak Teach Review  
**Repo / project:** Teach Review SaaS V.2

This document defines the product and project from the PRD so all coding aligns to a single, shared definition. Treat it as the source of truth before implementing features.

---

## 1. Vision & Positioning

**One-line vision:** A safe, structured way for high school students to give classroom-experience feedback without enabling harassment or defamation.

**Positioning:**  
- **Not:** “Rate your teacher”  
- **But:** “Structured classroom experience feedback.”

**Messaging:** Data-driven · Responsible · Student voice · Constructive transparency.

**Initial market:** Wake County high schools (expandable to NC statewide, then multi-state).

---

## 2. Problem & Value Proposition

**Problem:**  
- Students lack a structured, safe channel for classroom feedback; they rely on rumor networks (GroupMe, Snapchat, hallway talk) and can’t compare workload, clarity, or feedback style before scheduling.  
- Schools rarely surface transparent student feedback and face reputational harm from anonymous gossip.  
- Teachers are exposed to harassment and defamation in unmoderated environments.

**Gap:** Between *unstructured gossip* and *formal district evaluation systems*.

**Value proposition:** Peak Teach Review fills that gap with **controlled, constructive transparency**.

---

## 3. Goals & Non-Goals

### Goals
- Launch a legally conservative MVP.
- Reduce defamation and harassment exposure.
- Enable structured classroom-experience feedback.
- Build trust with students and teachers.
- Avoid COPPA triggers (13+ only, no DOB).
- Maintain Section 230–friendly posture.

### Non-Goals (Day 1)
- No “Top 10 Best/Worst Teachers” or ranking pages.
- No misconduct reporting.
- No anonymous free-form text-only reviews.
- No paid teacher profile manipulation.
- No integration with school systems (SIS, LMS).
- No real-time chat or comment threads.

---

## 4. Target Users

| Role        | Description |
|------------|-------------|
| **Primary**   | High school students (13–18) — submit reviews, browse profiles. |
| **Secondary** | Teachers — claim profile, submit rebuttal, request removal. |
| **Secondary** | Parents — read-only access. |

---

## 5. MVP Feature Set (from PRD)

### 5.1 User Accounts
- **Required:** 13+ age gate, email verification, pseudonymous display names, one review per teacher per semester per account, IP/device abuse detection.
- **Not collected:** Date of birth, school enrollment verification, student grade level, physical address.

### 5.2 Teacher Profiles
- **Fields:** Name, School, Subject(s), Years teaching (optional), Profile photo (optional; no scraping), Average ratings by category.
- No personal data beyond publicly available professional info.

### 5.3 Structured Review Rubric
- **Mandatory ratings (1–5):** Clarity of instruction, Organization of class, Feedback timeliness, Workload level, Classroom engagement.
- **Optional text:** “Describe your classroom experience” — max 500 characters, AI + regex pre-moderation, delayed publish until reviewed.
- **Display:** Aggregated averages, distribution graph, moderated comments only.

### 5.4 Moderation System
- **Layer 1 — Automated:** Regex for phone numbers, emails, addresses, social handles, student names, threat patterns; keyword blocks (criminal accusations, “fire this teacher,” harassment, calls to action).
- **Layer 2 — AI:** Risk scoring for defamation, personal attack language, misconduct allegations; high-risk → manual review queue.

### 5.5 Reporting & Takedown
- Every review: “Report” button + reason categories.
- Admin: Moderation queue, SLA 24–48 hours, escalation tag for legal risk.
- Teacher portal: Claim profile, submit rebuttal, submit removal request.
- **Removal criteria:** Private information, threats, policy violations, factual misconduct claims.

### 5.6 Legal & Policy
- **Required docs:** Terms of Service, Community Guidelines, Privacy Policy, Independent Platform Disclaimer.
- **Key clauses:** UGC ownership, license grant, arbitration, indemnification, limitation of liability.
- **Pre-submission warning:** “Do not include private information, rumors, or allegations. This platform is for classroom experience feedback only.”

---

## 6. UX Principles (from PRD)
- Calm, neutral branding.
- No gamification, no “spicy” icons, no leaderboard UI, no “hot take” culture.
- **Tone:** Professional, data-forward, safe.

---

## 7. Technical Architecture (MVP)

| Layer     | PRD / Choice | Current repo |
|----------|----------------|--------------|
| **Frontend** | Next.js, Tailwind | ✅ Next.js 16, Tailwind 4, Radix/shadcn-style UI |
| **Backend**  | Node/Express or serverless | ❌ Not implemented |
| **Database** | Postgres | ❌ Not implemented |
| **Moderation** | Queue table, risk_score, is_flagged, auto_rejected, under_review | ❌ Not implemented |
| **Security**  | Rate limiting, CAPTCHA, email verification, JWT | ❌ Not implemented |
| **Logging**   | Audit trail for moderation decisions | ❌ Not implemented |

---

## 8. Risk & Mitigation (from PRD)

| Risk | Mitigation |
|------|------------|
| Defamation | Structured rubric + moderation queue |
| Harassment waves | Rate limits + no ranking pages |
| COPPA | 13+ gate, no DOB collection |
| District backlash | Clear independence disclaimer |
| Doxxing | Regex + AI filter |
| Legal threat from teacher | Fast takedown + documented moderation logs |

---

## 9. Current Codebase vs PRD

### Implemented (UI only, no backend)
- **Branding:** Peak Teach Review, “PT” logo, calm neutral styling.
- **Landing:** Hero (“Structured feedback, not rumors”), How It Works (structured rubric, moderated & safe, constructive voice).
- **Browse teachers:** Search by name/subject, school filter, teacher cards with name, school, subjects, 5-category ratings, review count (all mock data).
- **Review form:** Teacher name input, 5-category 1–5 ratings (clarity, organization, feedback, workload, engagement), optional 500-char comment, pre-submission warning; no persistence or auth.
- **Footer:** Platform links (Browse, Submit Review, Claim Profile), Legal (ToS, Privacy, Community Guidelines), Support (Report, Takedown, Contact), independence + 13+ disclaimer.

### Not yet implemented (required for MVP)
- User accounts (13+ gate, email verification, pseudonymous display names).
- One review per teacher per semester per account; IP/device abuse detection.
- Backend + Postgres (teachers, reviews, users, moderation queue).
- Moderation pipeline (regex + AI risk scoring, manual queue, flags).
- Reporting + takedown workflow (Report button, admin queue, teacher rebuttal/removal).
- Legal pages (ToS, Privacy Policy, Community Guidelines, Disclaimer).
- Teacher profile pages (detail view, claim flow, rebuttal).
- Security (rate limiting, CAPTCHA, JWT, audit logging).

### Optional MVP reduction (if risk tolerance is low)
- Launch with **numeric rubric only** (no text reviews), averages only; teacher responses allowed. Reduces liability surface.

---

## 10. Open Questions (from PRD)
- Will you require school email domains?
- Will you verify class enrollment?
- Will you allow alumni reviews?
- Will you restrict reviews to past 2 years?

These should be decided before or during account and review logic implementation.

---

## 11. Suggested Implementation Order

1. **Project & product alignment** — Use this document; no coding without referencing it.
2. **Data model & API** — Define Postgres schema (users, teachers, reviews, moderation_queue, reports) and API contracts.
3. **Auth** — 13+ gate, email verification, pseudonymous display names, JWT.
4. **Teacher CRUD & profiles** — Create/browse teacher profiles; detail page; link from browse.
5. **Review submission** — Persist reviews; enforce one per teacher per semester per user; wire form to API.
6. **Moderation** — Regex + AI risk scoring; queue; delayed publish; audit log.
7. **Reporting & takedown** — Report button, admin queue, teacher claim/rebuttal/removal.
8. **Legal pages** — ToS, Privacy, Community Guidelines, Disclaimer (copy to be drafted separately).
9. **Security hardening** — Rate limiting, CAPTCHA, abuse detection.

---

## 12. Metrics (from PRD, for later)
- **Engagement:** Reviews per teacher, unique monthly users, average rating submissions.
- **Risk:** % flagged reviews, takedown rate, legal complaint count.
- **Quality:** Average review length, category rating distribution variance.

---

*This project definition is derived from **PRD SaaS V.2** and the current **Teach Review SaaS V.2** codebase. Update this document when scope or architecture changes.*
