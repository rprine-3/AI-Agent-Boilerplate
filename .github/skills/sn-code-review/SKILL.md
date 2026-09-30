---
name: sn-code-review
description: 'ServiceNow code review following platform best practices. Use when: reviewing scripts, auditing code quality, checking GlideRecord usage, validating security patterns, reviewing Business Rules, Script Includes, Client Scripts, Catalog Scripts, Service Portal widgets, Scripted REST APIs, Flow Designer actions. Covers performance, security, naming conventions, error handling, HRSD patterns.'
argument-hint: 'Provide the file path(s) or artifact name to review'
---

# ServiceNow Code Review

Perform a structured code review on ServiceNow artifacts following platform best practices, coding standards, and HRSD guidelines.

## When to Use

- Review a script before syncing to an instance
- Audit existing artifacts for quality, security, or performance issues
- Validate new Business Rules, Script Includes, Client Scripts, Widgets, or REST APIs
- Check code against ServiceNow best practices
- Pre-deployment quality gate

## Procedure

### Step 1: Identify Artifact Type

Determine what kind of artifact is being reviewed based on the file path and extension:

| File Pattern | Artifact Type |
|---|---|
| `sys_script_include/*.script.js` | Script Include |
| `sys_script/*.script.js` | Business Rule |
| `sys_script_client/*.script.js` | Client Script |
| `catalog_script_client/*.script.js` | Catalog Client Script |
| `sp_widget/*.script.js` | Widget Server Script |
| `sp_widget/*.client_script.js` | Widget Client Script |
| `sp_widget/*.template.html` | Widget Template |
| `sp_widget/*.css.scss` | Widget Styles |
| `sys_ui_action/*.script.js` | UI Action |
| `sys_ui_page/*.script.js` | UI Page |
| `sys_ui_policy/*.script.js` | UI Policy Script |

### Step 2: Reference Documentation

For detailed guidance on ServiceNow platform APIs, best practices, and capabilities, consult:

- **Local Reference:** `docs/service-now-docs-australia/markdown/` — official ServiceNow documentation
- **Use for:** API method signatures, system limitations, scoped app restrictions, platform features

### Step 3: Run Universal Checks

Apply these checks to **every** artifact regardless of type. Reference the [full checklist](./references/checklist.md) for details.

**2a. Security**
- [ ] No hardcoded sys_ids — use GlideRecord queries, system properties, or script includes
- [ ] No `setWorkflow(false)` unless documented and justified
- [ ] ACL/role checks present where needed (`current.canRead()`, `current.canWrite()`, `gs.hasRole()`)
- [ ] Input validation on all user-supplied values (especially REST APIs, GlideAjax parameters)
- [ ] No sensitive data (PII, credentials) in logs or error messages
- [ ] No XSS vectors in client-side code or HTML templates (use `$sce`, encode output)
- [ ] No SQL/GlideRecord injection — never concatenate user input into encoded queries

**2b. Performance**
- [ ] `setLimit()` used on all GlideRecord queries that don't need all records
- [ ] No GlideRecord queries nested inside loops (N+1 problem)
- [ ] Dot-walking used for reference field access instead of extra queries
- [ ] `addEncodedQuery()` used for complex filter conditions
- [ ] No `current.update()` inside Before Business Rules (causes extra save cycles)
- [ ] Async Business Rules used for non-blocking operations (emails, integrations)
- [ ] GlideAggregate used instead of GlideRecord for counts/sums

**2c. Code Quality**
- [ ] `getValue()`/`setValue()` used — never direct property access (`gr.field_name`)
- [ ] camelCase for variables/functions, PascalCase for Script Include class names
- [ ] `try/catch` error handling in all server-side scripts
- [ ] Logging uses `gs.info()`, `gs.warn()`, `gs.error()` — never `gs.print()` or `gs.log()`
- [ ] Log messages include context prefix: `[ClassName.methodName]`
- [ ] No `gs.nowDateTime()` in scoped apps — use `new GlideDateTime()`
- [ ] No AI/tool references in comments
- [ ] JSDoc comments on all public methods with `@param`, `@returns`, `@throws`

**2d. Maintainability**
- [ ] Functions are single-purpose and reasonably sized
- [ ] Private helpers prefixed with underscore (`_helperMethod`)
- [ ] Configuration values in system properties, not hardcoded strings
- [ ] No dead code, commented-out blocks, or console.log statements
- [ ] Prefer `GlideQuery` over `GlideRecord` for new code (Zurich+)

### Step 3: Run Artifact-Specific Checks

Based on the artifact type identified in Step 1, apply the corresponding specialized checks.

#### Script Includes
- [ ] Uses `Class.create()` pattern with prototype
- [ ] `type` property matches the class name
- [ ] `initialize` method present when state is needed
- [ ] Public API is minimal — helper methods are private (`_prefixed`)
- [ ] If `AbstractAjaxProcessor`: validates `sysparm_` parameters, returns safe strings
- [ ] Callable from correct scope (client-callable only when necessary)

#### Business Rules
- [ ] Named correctly: `[Table] - [When] - [Action]`
- [ ] Condition field is lightweight (avoids script in condition when possible)
- [ ] Before rules never call `current.update()`
- [ ] `previous` object used correctly in Update rules for change detection
- [ ] State transitions validated against allowed transitions map
- [ ] Display rules use `g_scratchpad` for passing data to client
- [ ] Before Query rules used for row-level security filtering

#### Client Scripts
- [ ] `isLoading` check present in `onChange` handlers: `if (isLoading) return;`
- [ ] Named correctly: `[Form] - [Type] - [Description]`
- [ ] Minimal server calls — uses `g_scratchpad` for data from Display Business Rules
- [ ] `GlideAjax` used for async server calls (not synchronous `getXMLWait`)
- [ ] `g_form` API used correctly (`setDisplay`, `setMandatory`, `setReadOnly`, `setValue`)
- [ ] No direct DOM manipulation — use `g_form` and `g_list` APIs

#### Service Portal Widgets
- [ ] Server script uses `data.*` for passing values to client
- [ ] Client script uses `c.data.*` to read server data
- [ ] No inline styles — all styling in `.css.scss` file
- [ ] CSS Grid used for dynamic layouts (not hardcoded Bootstrap col widths)
- [ ] `$mdDialog` pattern correct for modals (contentElement, parent, clickOutsideToClose)
- [ ] `$scope.$apply()` used only when needed (outside Angular digest cycle)
- [ ] GraphQL via shared utility uses correct pattern if applicable

#### Catalog Client Scripts
- [ ] Same checks as Client Scripts above
- [ ] Variable names referenced correctly (match catalog item variable names)
- [ ] `g_form.getReference()` callback used instead of synchronous calls

#### Scripted REST APIs
- [ ] Role check at entry: `gs.hasRole('required_role')` with 403 response
- [ ] Input validation on all path params and query params
- [ ] Response status codes set correctly (200, 400, 403, 404, 500)
- [ ] Output limited with `setLimit()` to prevent unbounded results
- [ ] Error responses include meaningful but safe messages (no stack traces)
- [ ] Request body parsed and validated before use

#### UI Actions
- [ ] Condition checks role and record state
- [ ] Client-side confirmation for destructive actions
- [ ] Server-side script validates permissions before acting
- [ ] Proper redirect/navigation after action completes

### Step 4: Report Findings

Organize findings into these severity categories:

| Severity | Label | Meaning |
|---|---|---|
| 🔴 | **Critical** | Security vulnerability, data loss risk, or production-breaking bug |
| 🟠 | **Major** | Performance issue, missing error handling, or violated best practice |
| 🟡 | **Minor** | Naming convention, missing JSDoc, code style |
| 🔵 | **Suggestion** | Alternative approach, GlideQuery migration, readability improvement |

Format each finding as:
```
🔴 **[Category]** Line XX: Description of the issue
   → Fix: What to change
```

### Step 5: Provide Summary

After all checks, provide:
1. **Verdict**: PASS / PASS WITH NOTES / NEEDS CHANGES / REJECT
2. **Stats**: X critical, Y major, Z minor findings
3. **Top 3 priorities** to fix if changes needed
4. **Offer to auto-fix** non-controversial issues (naming, missing try/catch, adding setLimit)

## Scope-Specific Considerations

### HRSD (sn_hr_core)
- HR data is PII — extra security scrutiny on case and profile queries
- Verify COE assignment rules and HR Criteria integration
- Lifecycle Event artifacts must consider the full employee journey
- Case creation must resolve HR Service and Subject Person correctly

### Custom Scoped Apps
- Persona checks when applicable
- Repository patterns for data access
- GraphQL via shared utility scope for dashboard queries

### Scoped App Rules
- No `gs.nowDateTime()` — use `new GlideDateTime()`
- API availability restrictions — verify functions are allowed in scope
- Cross-scope access must use proper scope qualifiers
