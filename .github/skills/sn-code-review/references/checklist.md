# ServiceNow Code Review — Quick Reference Checklist

Use this as a rapid-fire checklist during reviews. Each item links back to the full guidance in SKILL.md.

---

## Universal (All Artifacts)

### Security
- [ ] No hardcoded sys_ids
- [ ] No `setWorkflow(false)` without justification
- [ ] ACL/role checks present
- [ ] Inputs validated (REST params, GlideAjax params)
- [ ] No PII in logs
- [ ] No XSS in client code or templates
- [ ] No user input concatenated into encoded queries

### Performance
- [ ] `setLimit()` on all GlideRecord queries
- [ ] No GlideRecord inside loops
- [ ] Dot-walking for reference fields
- [ ] `addEncodedQuery()` for complex filters
- [ ] No `current.update()` in Before rules
- [ ] `GlideAggregate` for counts, not GlideRecord

### Code Quality
- [ ] `getValue()`/`setValue()` (NOT `gr.field`)
- [ ] camelCase vars, PascalCase classes
- [ ] `try/catch` in server scripts
- [ ] `gs.info/warn/error` (NOT `gs.print/gs.log`)
- [ ] Log prefix: `[Class.method]`
- [ ] No `gs.nowDateTime()` in scoped apps
- [ ] JSDoc on public methods
- [ ] No AI references in comments
- [ ] Prefer `GlideQuery` for new code (Zurich+)

---

## By Artifact Type

### Script Include
- [ ] `Class.create()` + prototype pattern
- [ ] `type` property = class name
- [ ] Private methods: `_underscore` prefix
- [ ] AjaxProcessor: validate sysparm params

### Business Rule
- [ ] Name: `[Table] - [When] - [Action]`
- [ ] Before rules: no `current.update()`
- [ ] Uses `previous` for change detection
- [ ] State transitions validated

### Client Script
- [ ] `if (isLoading) return;` in onChange
- [ ] Name: `[Form] - [Type] - [Description]`
- [ ] GlideAjax async (no `getXMLWait`)
- [ ] Uses `g_form` API, no DOM manipulation

### Widget
- [ ] Server: `data.*` / Client: `c.data.*`
- [ ] No inline styles, use `.css.scss`
- [ ] CSS Grid for dynamic layouts
- [ ] `$mdDialog` pattern for modals

### Scripted REST API
- [ ] Role check → 403 if missing
- [ ] Input validation → 400 on bad input
- [ ] `setLimit()` on output queries
- [ ] Safe error messages (no stack traces)

---

## Severity Key

| Icon | Level | Action |
|------|-------|--------|
| 🔴 | Critical | Must fix before deploy |
| 🟠 | Major | Should fix, creates risk |
| 🟡 | Minor | Fix when convenient |
| 🔵 | Suggestion | Consider for improvement |

## Verdict Scale

| Verdict | Meaning |
|---------|---------|
| **PASS** | No issues found |
| **PASS WITH NOTES** | Minor items only, safe to proceed |
| **NEEDS CHANGES** | Major/critical issues, fix and re-review |
| **REJECT** | Fundamental design or security problems |
