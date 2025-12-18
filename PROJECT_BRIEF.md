# Design Blog — Project Brief for AI Agents

## What This Is

An enterprise-grade design blog for a healthcare SaaS company's design organization. It serves as the public voice of the design team—showcasing work, sharing thinking, building reputation, and attracting talent.

This is not a personal blog or a marketing site. It's a professional publication comparable to:
- Figma's blog (figma.com/blog)
- Google Design (design.google)
- Airbnb Design (airbnb.design)
- Spotify Design (spotify.design)

---

## Why It Exists

**External goals:**
- Establish the design org as a thought leader in healthcare design
- Attract senior design talent by showing the quality and depth of work
- Build credibility with the broader design community
- Create a body of reference material the team can point to

**Internal goals:**
- Give designers a platform to develop their voice and visibility
- Create accountability for documenting and reflecting on work
- Build team pride and shared identity

---

## Who Reads It

**Primary audience:**
- Senior and staff-level designers considering roles
- Design leaders at peer companies
- Product and engineering partners who want to understand design thinking

**Secondary audience:**
- Healthcare industry professionals curious about UX
- Design students and early-career designers
- Conference organizers and press looking for speakers/experts

The reader is busy, skeptical of fluff, and has high standards. They've seen a lot of mediocre design content. They respect substance, craft, and honesty about challenges.

---

## Content Types

| Type | Purpose | Tone |
|------|---------|------|
| **Case Studies** | Deep dives into shipped work. Process, decisions, outcomes. | Detailed, honest about tradeoffs |
| **POV / Opinion** | Perspectives on design practice, industry trends, ways of working | Confident but not preachy |
| **Process** | How we do things: critiques, systems, collaboration | Practical, specific |
| **Interviews** | Conversations with team members, guests, industry figures | Warm, substantive |
| **Research** | Insights from user research, data, experiments | Evidence-based, actionable |
| **Tools** | What we use and how we use it | Honest reviews, real workflows |
| **Events** | Recaps, announcements, community involvement | Energetic but professional |

---

## Design Principles for the Blog Itself

**1. Substance over style**
The visual design should elevate the content, not compete with it. Clean, confident, restrained. Let the work and writing breathe.

**2. Professional, not corporate**
Warm and human, but clearly representing an organization. Not quirky or playful. Not stiff or bureaucratic.

**3. Craft signals craft**
Every detail—typography, spacing, transitions, image treatment—should demonstrate the team's standards. Sloppy execution undermines the message.

**4. Fast and accessible**
Performance is a feature. Accessibility is non-negotiable. The blog should work beautifully for everyone.

**5. Timeless over trendy**
Avoid design trends that will date quickly. Aim for a look that will feel fresh in 3-5 years.

---

## Technical Context

**Stack:**
- Ghost CMS (headless) — content management, multi-author, editorial workflow
- Next.js 14 — frontend framework (App Router)
- Tailwind CSS — styling via design tokens
- Framer Motion — animations
- Vercel — deployment (recommended)

**Why this stack:**
- Ghost handles editorial workflow, roles, scheduling, newsletters natively
- Headless gives full frontend control for custom interactions
- Next.js is well-documented, AI agents work well with it
- Tailwind centralizes design decisions in config

**Constraints:**
- Must support multiple authors with different permission levels
- Must have approval workflow (contributors can draft, editors publish)
- Must be fast to stand up (weeks, not months)
- Must be maintainable by designers with some code comfort + AI assistance

---

## Quality Bar

**Writing:**
- Clear, direct prose. No jargon for jargon's sake.
- Specific and concrete. Show the work, don't just describe it.
- Honest about challenges and tradeoffs. Not a highlight reel.

**Visuals:**
- High-quality imagery. No stock photos. Real work, real people.
- Consistent image treatment (aspect ratios, color grading if applicable)
- Diagrams and figures that clarify, not decorate

**Code/Implementation:**
- Clean, readable, well-organized
- Follows established patterns in the codebase
- Accessible (WCAG AA minimum)
- Performant (target Lighthouse 90+ across categories)

**Interactions:**
- Purposeful, not decorative. Every animation should serve UX.
- Subtle and polished. Nothing flashy or distracting.
- Consistent timing and easing across the site.

---

## Reference Points

**Visual/UX inspiration:**
- Figma Blog — clean grid, strong typography, smooth interactions
- Google Design — editorial feel, varied layouts, rich imagery
- Stripe Press — typographic excellence, restraint, craft
- Apple Newsroom — confidence, simplicity, image-forward

**Content inspiration:**
- Spotify Design — honest process posts
- Airbnb Design — deep case studies with real numbers
- Intercom Blog — clear thinking, practical frameworks

**What to avoid:**
- Generic "design agency" aesthetics (gradient blobs, floating shapes)
- Overly minimal to the point of feeling empty
- Heavy, slow-loading pages
- Content that reads like marketing copy

---

## Working with This Codebase

**File organization:**
```
app/           → Pages (Next.js App Router)
components/    → Reusable UI components
lib/           → API clients, types, utilities
```

**Design tokens are in `tailwind.config.ts`:**
- Colors, typography scale, spacing
- Change these first when adjusting the visual system

**Component patterns:**
- ArticleCard has 4 variants—use the right one for context
- Animations use Framer Motion `whileInView` for scroll triggers
- All components are TypeScript with proper types

**When making changes:**
1. Understand the existing pattern before modifying
2. Keep changes focused—one concern at a time
3. Test visually in the browser at multiple breakpoints
4. Check accessibility (keyboard nav, screen reader)

---

## How to Give Good Feedback to Agents

When iterating with AI agents, be specific:

**Vague (less useful):**
- "Make it look better"
- "More professional"
- "I don't like the spacing"

**Specific (more useful):**
- "Increase the line-height on body text to 1.7 for better readability"
- "The hero title feels too heavy—try font-weight 500 instead of 600"
- "Add 8px more padding between the tag and the title on ArticleCard"
- "The hover animation is too fast—change duration to 400ms"

Provide reference screenshots when possible. Point to specific elements. Describe what's wrong and why.

---

## Success Criteria

The blog is successful when:

1. **Senior designers say** "I'd be proud to have my work featured here"
2. **Candidates mention** "I read your blog" in interviews
3. **Team members actively want** to write and publish
4. **The implementation** scores 90+ on Lighthouse
5. **Content is being published** at least 2x per month
6. **Internal stakeholders** reference blog posts in their own communications

---

## What's Not In Scope (For Now)

- Comments or discussion features
- User accounts or personalization
- E-commerce or gated content
- Complex interactive storytelling (can add later)
- Multi-language support

Keep it focused. Ship the core experience well before adding complexity.
