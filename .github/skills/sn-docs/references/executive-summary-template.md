# Executive Summary — Template

Use this template for client-facing documentation. Written in business language with no code. Focuses on outcomes, risk mitigation, and delivery status.

---

````markdown
# [Release/Feature Name] — Executive Summary

> **Prepared for:** [{client_name} Stakeholder]  
> **Release:** [X.X]  
> **Date:** [Month Day, Year]  
> **Prepared by:** [Team/Author]  
> **Status:** [In Progress | UAT | Deployed to Production]  

---

## Executive Overview

[2-3 sentences summarizing what was delivered and the business value. Written for a non-technical audience.]

---

## Objectives & Outcomes

| Objective | Outcome | Status |
|-----------|---------|--------|
| [Business objective 1] | [What was achieved] | ✅ Complete |
| [Business objective 2] | [What was achieved] | ✅ Complete |
| [Business objective 3] | [What was achieved] | 🟡 In Progress |

---

## Deliverables

### Stories Completed

| Story # | Title | Type | Status |
|---------|-------|------|--------|
| [###] | [Title] | [Feature / Bug Fix / Enhancement] | ✅ Deployed |
| [###] | [Title] | [Feature / Bug Fix / Enhancement] | ✅ Deployed |
| [###] | [Title] | [Feature / Bug Fix / Enhancement] | 🟡 In UAT |

### Key Changes Summary

#### [Feature/Change Area 1]

**What changed:** [1-2 sentences describing the change in business terms]

**Business impact:** [How this benefits HR staff, employees, or the organization]

**Modules affected:** [e.g., Employee Service Center, HR Case Management, Dashboards]

#### [Feature/Change Area 2]

**What changed:** [1-2 sentences]

**Business impact:** [Benefits]

**Modules affected:** [Modules]

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| [Risk 1] | [Low / Medium / High] | [Low / Medium / High] | [How it's addressed] |
| [Risk 2] | [Low / Medium / High] | [Low / Medium / High] | [How it's addressed] |

---

## Security & Compliance

| Area | Status | Notes |
|------|--------|-------|
| Access Controls (ACLs) | ✅ Implemented | [Brief note] |
| PII Data Protection | ✅ Verified | [Brief note] |
| Role-Based Access | ✅ Configured | [Brief note] |
| Audit Trail | ✅ Enabled | [Brief note] |

---

## Deployment Summary

| Environment | Date | Status | Update Set(s) |
|-------------|------|--------|---------------|
| Development | [Date] | ✅ Complete | `[update_set_name]` |
| UAT / Staging | [Date] | [Status] | `[update_set_name]` |
| Production | [Date] | [Status] | `[update_set_name]` |

### Post-Deployment Actions Required

<!-- Remove if none -->

| # | Action | Owner | Due Date | Status |
|---|--------|-------|----------|--------|
| 1 | [Action description] | [Team/Person] | [Date] | ⬜ Pending |
| 2 | [Action description] | [Team/Person] | [Date] | ⬜ Pending |

---

## Testing Summary

| Test Phase | Total | Passed | Failed | Blocked |
|-----------|-------|--------|--------|---------|
| Unit Testing | [#] | [#] | [#] | [#] |
| Integration Testing | [#] | [#] | [#] | [#] |
| UAT | [#] | [#] | [#] | [#] |

**Overall Test Result:** [PASS / CONDITIONAL PASS / FAIL]

---

## Dependencies & Assumptions

**Dependencies:**
- [Dependency 1 — e.g., "Requires external integration to be active"]
- [Dependency 2]

**Assumptions:**
- [Assumption 1 — e.g., "HR Admin group membership is current"]
- [Assumption 2]

---

## Known Limitations

| Limitation | Impact | Planned Resolution |
|-----------|--------|-------------------|
| [Limitation 1] | [Impact] | [Release X.X / Deferred / N/A] |

---

## Next Steps

| # | Action Item | Owner | Target Date |
|---|------------|-------|-------------|
| 1 | [Next action] | [Owner] | [Date] |
| 2 | [Next action] | [Owner] | [Date] |
| 3 | [Next action] | [Owner] | [Date] |

---

## Appendix: Detailed Documentation

For technical implementation details, refer to:

| Document | Link |
|----------|------|
| Story Reports | [Story #XXX](../path/to/story.md) |
| Design Document | [Feature Design](../path/to/design.md) |
| Release Notes | [Release X.X Notes](../path/to/notes.md) |
````

---

## Writing Rules for Executive Summaries

1. **No code** — ever. Not even table names or field names unless absolutely necessary.
2. **No jargon** — replace "GlideRecord", "Business Rule", "ACL" with plain language. Use "automated process", "access control", "security rule".
3. **Lead with outcomes** — "HR staff can now..." not "A script was updated to..."
4. **Quantify when possible** — "Reduces case creation time by eliminating 3 manual steps"
5. **Be honest about status** — use ✅ 🟡 🔴 consistently for complete, in-progress, blocked
6. **Keep it to 2 pages** — if printed, this should fit in 2 pages maximum
