# Tag Taxonomy

Tags serve two purposes: reader navigation and internal organization. Keep them tight.

---

## Structure

Tags fall into two categories:

### Content Type Tags (What kind of piece is this?)

Every post gets exactly **one** content-type tag. This becomes its primary tag and determines where it appears in the site's sections.

| Tag Slug | Display Name | Use For |
|----------|--------------|---------|
| `case-study` | Case Study | Deep dives into shipped work |
| `pov` | POV | Opinion pieces, perspectives, takes |
| `process` | Process | How-we-work posts, methods, rituals |
| `interview` | Interview | Q&As, conversations, profiles |
| `research` | Research | User research insights, studies, data |
| `tools` | Tools | Tool reviews, workflows, resources |
| `events` | Events | Recaps, announcements, community |

### Topic Tags (What is it about?)

Posts can have **1-3** topic tags. These help with discovery and related content.

| Tag Slug | Display Name | Use For |
|----------|--------------|---------|
| `accessibility` | Accessibility | A11y focused content |
| `systems` | Design Systems | Component libraries, tokens, governance |
| `research-methods` | Research Methods | Specific research techniques |
| `collaboration` | Collaboration | Cross-functional work, partnerships |
| `user-experience` | User Experience | User-facing design |
| `data-visualization` | Data Viz | Charts, dashboards, data display |
| `mobile` | Mobile | Mobile-specific design |
| `content-design` | Content Design | UX writing, content strategy |

**Adapt these to your actual work.** The above are suggestions. If your team doesn't do data visualization, don't create that tag.

---

## Rules

1. **Every post gets exactly one content-type tag as its primary tag.**
   Ghost lets you set a "primary tag"—always use the content type for this. The site sections filter on primary tags.

2. **Posts can have 1-3 topic tags.**
   Be selective. If a tag doesn't meaningfully help someone find related content, skip it.

3. **Don't create tags until you have 2+ pieces that would use them.**
   Resist the urge to pre-create a full taxonomy. Let it grow organically based on actual content.

4. **Review quarterly.**
   Look for orphan tags (only 1 post), redundant tags (accessibility vs a11y), and tags that aren't earning their place. Merge or kill as needed.

5. **Use lowercase slugs with hyphens.**
   `case-study` not `Case Study` or `case_study`. Ghost handles display names separately.

---

## Ghost Setup

In Ghost Admin → Tags:

1. Create each tag with:
   - **Name:** Display name (e.g., "Case Study")
   - **Slug:** URL-friendly version (e.g., "case-study")
   - **Description:** Brief explanation (helps authors choose correctly)
   - **Color:** Optional, useful for visual distinction in admin

2. For internal/workflow tags (like `#review` or `#draft`), prefix with `#`. Ghost treats these as internal and won't display them publicly.

---

## Primary Tag Usage

The site's homepage sections pull content by primary tag:

```
Case Studies section → filter: primary_tag:case-study
Interviews section → filter: primary_tag:interview
etc.
```

If an author forgets to set a primary tag, the first tag added becomes primary by default. Train authors to be intentional about tag order, or have editors fix it during review.

---

## Tag Governance

**Who can create new tags?**
Editors and above. Authors can apply existing tags but shouldn't create new ones without discussion.

**How to propose a new tag:**
1. Identify 2+ existing or planned posts that would use it
2. Check it's not redundant with an existing tag
3. Propose to the editorial lead with reasoning
4. If approved, editor creates it with proper description

**Annual cleanup:**
Once a year, audit all tags. Archive or merge any that:
- Have fewer than 3 posts
- Overlap significantly with another tag
- No longer reflect the team's work

---

## Example Post Tagging

**Post:** "How We Reduced Form Errors by 60% with Progressive Disclosure"
- **Primary tag:** `case-study`
- **Topic tags:** `user-experience`, `accessibility`

**Post:** "Why Product Design Needs More Friction, Not Less"
- **Primary tag:** `pov`
- **Topic tags:** `user-experience`

**Post:** "Our Research Operations Playbook"
- **Primary tag:** `process`
- **Topic tags:** `research-methods`

**Post:** "In Conversation with Our Product Design Partner"
- **Primary tag:** `interview`
- **Topic tags:** `collaboration`, `user-experience`
