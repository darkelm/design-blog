# Design Decisions Log

When you or AI agents make design or implementation choices, document them here. This prevents relitigating the same decisions and helps new contributors understand why things are the way they are.

---

## How to Use This Document

Each decision should include:

- **Decision:** What was decided
- **Date:** When it was made
- **Context:** Why it came up
- **Rationale:** Why this choice over alternatives
- **Alternatives rejected:** What else was considered (and why not)
- **Revisit trigger:** When/if this should be reconsidered

Keep entries concise. This is a log, not an essay.

---

## Template

```markdown
## [Area]: [Brief Decision Title]

**Decision:** [What was decided]

**Date:** YYYY-MM-DD

**Context:** [Why this came up, what problem it solves]

**Rationale:** [Why this choice]

**Alternatives rejected:**
- [Alternative 1]: [Why not]
- [Alternative 2]: [Why not]

**Revisit trigger:** [Condition that would prompt reconsideration]
```

---

## Decisions

### Typography: Inter as Primary Font

**Decision:** Use Inter for both body and display typography.

**Date:** [Your start date]

**Context:** Needed a workhorse font with excellent legibility, broad language support, and enough weights for typographic hierarchy.

**Rationale:** Inter is highly readable at all sizes, has extensive weights (100-900), includes tabular figures for data, and has excellent legibility across contexts. It's also well-supported for performance via Google Fonts or self-hosting.

**Alternatives rejected:**
- Söhne: Beautiful, but licensing complexity and cost for a blog
- Untitled Sans: Limited weights, less language support
- System fonts: Inconsistent across platforms, harder to control

**Revisit trigger:** Company brand refresh that mandates a different typeface.

---

### Color: Neutral Gray Palette

**Decision:** Use a neutral gray palette (tailwind neutral) with configurable accent.

**Date:** [Your start date]

**Context:** Blog visual identity needed to feel professional and content-focused, not competing with article imagery.

**Rationale:** Neutral grays provide maximum flexibility, don't clash with diverse article imagery, and communicate professionalism. Accent color can be swapped easily for brand alignment.

**Alternatives rejected:**
- Cool grays (slate): Felt too tech-startup
- Warm grays (stone): Felt too lifestyle/editorial
- Brand-heavy colors: Would compete with content

**Revisit trigger:** Brand team provides specific palette requirements.

---

### Animation: Subtle, Scroll-Triggered Entrances

**Decision:** Use subtle fade-up animations triggered on scroll, with 0.5s duration and staggered delays.

**Date:** [Your start date]

**Context:** Wanted the site to feel polished and alive without being distracting or gimmicky.

**Rationale:** Scroll-triggered entrance animations add polish without impacting initial load. Subtle movement (20px translate, opacity) is noticeable but not overwhelming. Staggering creates rhythm in grid layouts.

**Alternatives rejected:**
- No animations: Felt flat and static
- More dramatic animations (scale, rotation): Too playful for the tone
- Page transition animations: Added complexity, minimal payoff

**Revisit trigger:** User feedback indicating animations are distracting or causing motion sickness.

---

### Layout: Max-Width Content Container at 1400px

**Decision:** Set maximum content width at 1400px, centered.

**Date:** [Your start date]

**Context:** Needed to balance readability on large screens with efficient use of space.

**Rationale:** 1400px accommodates 3-column grids comfortably while keeping line lengths readable. Wider felt sprawling; narrower felt cramped on modern displays.

**Alternatives rejected:**
- Full-width layouts: Line lengths become unreadable
- 1200px max: Felt slightly cramped for 3-column grids
- 1600px max: Too much empty space on typical screens

**Revisit trigger:** Analytics show most users on very large or very small screens.

---

### Cards: Hover Lift Animation

**Decision:** Cards lift 4px on hover with 300ms ease-out transition. No scale.

**Date:** [Your start date]

**Context:** Needed clear hover affordance for clickable cards.

**Rationale:** Subtle lift provides clear feedback without being distracting. Scale transformations felt too playful for the professional tone. 300ms is fast enough to feel responsive but not jarring.

**Alternatives rejected:**
- Scale on hover: Felt too playful, caused layout shifts
- Color change only: Not distinct enough
- Shadow intensification only: Too subtle

**Revisit trigger:** None anticipated. This is a stable pattern.

---

### Image Zoom: CSS Transform on Hover

**Decision:** Images scale to 105% on hover within overflow-hidden container.

**Date:** [Your start date]

**Context:** Wanted image cards to feel interactive.

**Rationale:** Zoom-in effect draws attention without layout shift (overflow hidden contains it). 105% is noticeable but not extreme. 500ms duration feels smooth.

**Alternatives rejected:**
- Larger zoom (110%+): Felt too aggressive
- Overlay effects: Added complexity, obscured image
- No zoom: Images felt static and unresponsive

**Revisit trigger:** None anticipated.

---

### Article Page: Prose Width at 720px

**Decision:** Article body content is constrained to 720px max-width.

**Date:** [Your start date]

**Context:** Long-form reading requires controlled line length for readability.

**Rationale:** 720px provides ~75 characters per line at body text size, optimal for reading. Matches conventions of well-designed editorial sites.

**Alternatives rejected:**
- Wider (800px+): Line length too long for comfortable reading
- Narrower (640px): Felt cramped, wasted space on large screens
- Full content width: Unreadable on wide screens

**Revisit trigger:** Typography changes that significantly affect characters per line.

---

## Add New Decisions Below

When making a significant choice (especially when rejecting AI suggestions or changing existing patterns), add an entry here.
