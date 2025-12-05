# Ghost Roles & Editorial Workflow

Ghost's built-in roles map well to editorial workflow. This document explains how to set them up and run content through approval.

---

## Role Mapping

| Ghost Role | Who Gets This | Capabilities |
|------------|---------------|--------------|
| **Owner** | Blog owner (probably you) | Everything including billing, danger zone settings, can't be removed |
| **Administrator** | Design leads, co-owners | Manage staff, settings, integrations. Full content access. |
| **Editor** | Senior contributors, editorial lead | Edit all posts, publish, manage tags. Can't change settings or staff. |
| **Author** | Regular team contributors | Write and publish their own posts only. Can't edit others' work. |
| **Contributor** | Guest authors, junior writers | Write drafts only. Cannot publish. |

---

## Recommended Setup

### For a Small Team (3-8 people)

- **1 Owner:** You or the design lead
- **1-2 Administrators:** Backup owner, someone technical who manages integrations
- **1-2 Editors:** Editorial lead, senior writer who reviews others' work
- **Everyone else:** Authors (if trusted to self-publish) or Contributors (if you want review)

### For a Larger Team (8+)

- **1 Owner:** Design org leader
- **2-3 Administrators:** Leadership, ops person
- **2-4 Editors:** Editorial committee, senior writers
- **Authors:** Established contributors with track record
- **Contributors:** New writers, guest authors, anyone whose work needs review

---

## Editorial Workflow

Ghost doesn't have built-in approval states, so you'll use convention: internal tags and external coordination.

### Workflow Steps

```
1. DRAFTING
   Writer creates post, works on it
   Internal tag: #draft (optional, for personal tracking)

2. READY FOR REVIEW
   Writer finishes draft, wants feedback
   Internal tag: #review
   Action: Notify editor (Slack, email, or check dashboard)

3. IN REVIEW
   Editor reads, leaves comments, suggests edits
   Communication: Ghost comments, or external doc
   
4. REVISION
   Writer addresses feedback
   Internal tag: stays #review until done

5. APPROVED
   Editor signs off
   Internal tag: #approved
   Action: Editor publishes or schedules

6. PUBLISHED
   Post is live
   Internal tags: removed (they're just workflow artifacts)
```

### Internal Tags for Workflow

Create these as internal tags (prefix with `#`):

| Tag | Meaning |
|-----|---------|
| `#draft` | Writer still working, not ready for eyes |
| `#review` | Ready for editorial review |
| `#revision` | Feedback given, waiting for writer to revise |
| `#approved` | Ready to publish |
| `#scheduled` | Approved and scheduled for future date |

Internal tags (`#` prefix) don't appear publicly and won't show in your tag archive.

---

## Guest Author Process

1. **Pitch:** Guest sends topic pitch (1-2 paragraphs) to editor
2. **Approval:** Editor decides if it fits the blog. If yes, proceeds.
3. **Account creation:** Admin creates guest as **Contributor** role
4. **Drafting:** Guest writes in Ghost. Can save drafts but can't publish.
5. **Review:** Editor reviews draft, works with guest on revisions
6. **Publication:** Editor publishes the post. Guest's byline is preserved.
7. **Account:** Keep guest account for future contributions, or deactivate if one-time

### Inviting a Guest Author

1. Go to Ghost Admin → Settings → Staff
2. Click "Invite people"
3. Enter their email
4. Set role to **Contributor**
5. They'll receive an invite to create their account

---

## Coordination Outside Ghost

Ghost's collaboration features are basic. For more complex review, supplement with:

### Option A: Slack Channel

Create `#design-blog-editorial` channel:
- Writers post when something is ready for review
- Editors acknowledge and provide timeline
- Discussion happens in threads
- Final "approved, publishing now" confirmation

### Option B: Notion/Asana Board

Track posts through stages:
- **Backlog:** Ideas and pitches
- **Drafting:** Assigned, in progress
- **Review:** Ready for editor
- **Revision:** Feedback given, awaiting changes
- **Approved:** Ready to publish
- **Published:** Live

Link to Ghost post from the card. Keep metadata (author, target date, tags) in the card.

### Option C: Simple Spreadsheet

For minimal overhead:

| Title | Author | Status | Editor | Target Date | Ghost Link |
|-------|--------|--------|--------|-------------|------------|
| Form Errors Case Study | Sarah | Review | Mike | Jan 15 | [link] |
| Healthcare Friction POV | Jordan | Drafting | — | Jan 22 | [link] |

---

## Publishing Checklist

Before an Editor hits publish:

- [ ] Post has a primary tag (content type)
- [ ] Post has appropriate topic tags (1-3)
- [ ] Featured image is uploaded and optimized
- [ ] Meta title and description are set (for SEO)
- [ ] Author is correct (especially for guest posts)
- [ ] URL slug is clean and readable
- [ ] Internal workflow tags (`#review`, etc.) are removed
- [ ] Post has been proofread one final time
- [ ] Social sharing image looks correct in preview

---

## Handling Revisions Post-Publish

Mistakes happen. Here's how to handle:

**Typos/minor errors:**
- Just fix them. No need to note the change.

**Factual corrections:**
- Fix the error
- Add a note at the bottom: *"Updated [date]: Corrected [what was wrong]."*

**Significant changes:**
- Consider whether the post should be updated or if a new post makes more sense
- If updating substantially, note: *"Updated [date]: This post has been revised to reflect [reason]."*

**Retractions:**
- Rare, but if needed: don't delete. Add a prominent note at the top explaining the retraction and why.
