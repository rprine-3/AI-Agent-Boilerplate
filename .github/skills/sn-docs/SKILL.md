---
name: sn-docs
description: 'Generate ServiceNow project documentation deliverables. Use when: writing story reports, creating detailed design documents, producing executive summaries, documenting implementations, preparing client deliverables, release documentation, change reports. Produces three document types: Story Implementation Report, Detailed Design Document, Executive Summary.'
argument-hint: 'Specify document type (story, design, executive) and the story/feature to document'
---

# ServiceNow Documentation Generator

Generate formal documentation that serves as both a **knowledge base for future development** and **client deliverables**. Three document types are supported, each targeting a different audience and level of detail.

## When to Use

- After implementing a story — generate the Story Report
- Before or during implementation — produce a Detailed Design Document
- At release milestones or client checkpoints — create an Executive Summary
- When asked to "document this", "write a report", or "prepare deliverables"

## Document Types

| Type | Audience | Purpose | Detail Level |
|------|----------|---------|-------------|
| **Story Report** | Developers, QA, future maintainers | Technical record of what changed, why, and how | High — code snippets, file trees, logic flows |
| **Detailed Design Document** | Tech leads, architects, reviewers | Architecture decisions, security model, integration points | High — diagrams, decision rationale, rollback plans |
| **Executive Summary** | Client stakeholders, project managers | Business value delivered, risks mitigated, status | Low — outcomes, metrics, timelines, no code |

## Procedure

### Step 1: Determine Document Type

Ask or infer which document to produce:
- `/sn-docs story` → Story Implementation Report
- `/sn-docs design` → Detailed Design Document
- `/sn-docs executive` → Executive Summary
- `/sn-docs all` → Generate all three for the same feature

If the user says "document this" without specifying, default to **Story Report**.

### Step 2: Gather Context

Collect information from the workspace and conversation:

**From code (automated):**
- Read modified files and identify artifact types
- Extract scope, instance, table, and artifact names from file paths
- Identify the update set name if mentioned
- Review code changes to understand the solution

**From user (ask if missing):**
- Story number and title
- Release version
- Problem statement / business justification
- Update set name(s)
- Any manual/post-deployment steps required

### Step 3: Generate the Document

Use the template for the selected document type. Templates are in the [references](./references/) folder:

- [Story Implementation Report template](./references/story-report-template.md)
- [Detailed Design Document template](./references/design-document-template.md)
- [Executive Summary template](./references/executive-summary-template.md)

### Step 4: Save the Document

Save to the appropriate location based on the document type and release:

```
docs/
├── Release_X.X/               ← Release-scoped documents
│   ├── [StoryName]_Story.md          ← Story reports
│   ├── [FeatureName]_Design.md       ← Design documents
│   └── [ReleaseName]_Executive.md    ← Executive summaries
├── [StoryName]_Story.md        ← Standalone story reports (no release)
└── STORY_TEMPLATE.md           ← Reference template
```

**File naming rules:**
- PascalCase with underscores between words
- Suffix matches document type: `_Story.md`, `_Design.md`, `_Executive.md`
- No spaces in filenames

### Step 5: Quality Check

Before finalizing, verify:

- [ ] **Metadata header** is complete (story, release, date, instance, update set)
- [ ] **Problem statement** clearly describes the business need
- [ ] **No hardcoded sys_ids** appear anywhere in the document
- [ ] **Code snippets** include comments and context
- [ ] **File trees** accurately reflect the workspace structure
- [ ] **Mermaid diagrams** render correctly (test flowchart syntax)
- [ ] **No AI references** — never mention Copilot, ChatGPT, or AI assistance
- [ ] **Post-deployment steps** are documented if manual actions are needed
- [ ] **Rollback plan** is included for any production-impacting change
- [ ] **Test scenarios** table covers happy path, edge cases, and failure modes

## Writing Guidelines

### Tone & Style
- **Professional and concise** — no filler phrases
- **Third person** — "The system", "The user", not "I" or "We"
- **Present tense for behavior** — "The Business Rule validates...", not "validated"
- **Past tense for actions taken** — "The condition was updated to..."
- **Active voice** — "The script populates the field", not "The field is populated by the script"

### Code in Documentation
- Include only **relevant** code snippets, not entire files
- Always add **comments** explaining the logic
- Use **before/after** comparisons for bug fixes
- Mark bad patterns with `// ❌` and good patterns with `// ✅`

### Diagrams
- Use **Mermaid** for all diagrams (flowcharts, sequence diagrams, architecture)
- Keep diagrams simple — max 10-12 nodes
- Label all edges with the data or action being passed

### Tables
- Use tables for **structured comparisons** (artifacts modified, test scenarios, configuration changes)
- Keep columns to 4-5 maximum for readability

### Sensitive Data
- Never include real email addresses, user names, or sys_ids in documentation
- Use placeholders: `user@agency.gov`, `[HR Admin User]`, `{sys_id}`
- Exception: Table names, field names, and role names are always included verbatim
