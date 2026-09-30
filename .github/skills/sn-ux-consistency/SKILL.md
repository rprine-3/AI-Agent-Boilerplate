---
name: sn-ux-consistency
description: 'ServiceNow portal UX/UI consistency review and enforcement. Use when: building widgets, reviewing widget code for visual consistency, auditing CSS patterns, checking template accessibility, validating client script Angular patterns, enforcing design system, reviewing Service Portal or Employee Center widgets, checking responsive layout, validating data binding conventions.'
argument-hint: 'Provide the widget name or file path to review for UX consistency'
---

# ServiceNow Portal UX/UI Consistency

Enforce visual consistency, accessibility standards, and established code patterns across all Service Portal and Employee Center widgets. Every widget must follow the design system — same colors, same spacing, same component patterns, same data flow conventions.

## When to Use

- Building a new widget — validate it follows existing patterns before syncing
- Reviewing an existing widget for visual or structural inconsistencies
- Auditing a set of widgets for design system compliance
- Checking accessibility (ARIA, keyboard nav, screen reader support)
- Validating responsive behavior and layout patterns
- Ensuring client/server data binding follows conventions

## Procedure

### Step 1: Identify the Widget

Determine the widget being reviewed and its scope:
- Read all four artifact files: `css.scss`, `template.html`, `client_script.js`, `script.js`
- Identify the scope (`{custom_scope}`, `sn_hr_core`, `sn_ex_sp`, `sn_hr_sp`, `global`)
- Note the widget's purpose (dashboard, filter, card, chart, form)

### Step 2: CSS Review

Apply the checks from the [CSS Reference](./references/css-patterns.md):

**2a. Design Tokens**
- [ ] Uses design system color variables — no raw hex values for brand colors
- [ ] Uses spacing multiplier for spacing — no arbitrary pixel values
- [ ] Uses standard border radius variables — no hardcoded radii
- [ ] Uses standard font size variables or relative units — no hardcoded font sizes outside headings

**2b. Layout**
- [ ] Uses CSS Grid with `repeat(auto-fit, minmax(...))` for responsive card/widget grids
- [ ] Uses Flexbox for row/column alignment
- [ ] Bootstrap grid (`col-xs-*`, `col-md-*`) only for page-level layout, not within widget components
- [ ] No inline styles in template — all styles in `css.scss`

**2c. Component Consistency**
- [ ] Cards use `.link-container` pattern with `box-shadow`, `border-radius`, `border-bottom` separator
- [ ] Status indicators use `.circle-check` pattern with correct state colors
- [ ] Buttons follow standard background pattern
- [ ] No `!important` overrides unless targeting third-party/OOB styles

**2d. Anti-patterns**
- [ ] No empty CSS files — if no custom styles needed, document why
- [ ] No duplicate variable declarations already defined in other widgets
- [ ] No inline `<style>` tags in templates — use `css.scss`

### Step 3: Template (HTML) Review

Apply the checks from the [Template Reference](./references/template-patterns.md):

**3a. Accessibility (A11y)**
- [ ] Interactive elements have `aria-label` or `aria-labelledby`
- [ ] Dynamic visibility uses `ng-attr-aria-expanded`
- [ ] Tables have `<caption>` with `.sr-only`, `scope="col"` on headers
- [ ] External links include `<span class="sr-only">${External Link}</span>`
- [ ] Keyboard navigation supported (`ng-keydown` where applicable)
- [ ] Focus management on modals and dynamic content

**3b. Angular Patterns**
- [ ] Uses `ng-if` for conditional rendering (not `ng-show` for heavy DOM)
- [ ] Uses `ng-repeat` with `track by item.sys_id` — never without `track by`
- [ ] Uses `ng-href` for dynamic links — not `href` with interpolation
- [ ] Data binding via `c.data.*` (not raw `data.*` without controller ref in templates that use `controllerAs`)
- [ ] Empty state handling: `ng-if="!data.items || data.items.length === 0"`

**3c. Structure**
- [ ] Template under 150 lines — extract repeated sections into embedded widgets
- [ ] No deeply nested `ng-if` / `ng-repeat` (max 3 levels)
- [ ] Persona-gated content uses `c.data.personas.*` checks
- [ ] Filters use `md-select` with `md-select-header` search pattern
- [ ] Modals use `$mdDialog` with `contentElement` pattern (not inline markup with `ng-show`)

### Step 4: Client Script Review

Apply the checks from the [Client Script Reference](./references/client-patterns.md):

**4a. Controller Structure**
- [ ] Uses `api.controller = function($scope, ...) { var c = this; ... }`
- [ ] Dependencies injected — no global variable access
- [ ] Search terms initialized as empty strings
- [ ] Filter state initialized from URL parameters via `$location.search()`

**4b. Data Flow**
- [ ] Server data accessed via `c.data.*`
- [ ] GraphQL via shared utility service (if applicable)
- [ ] Server calls via `c.server.get({ action: '...' })` with `.then()` handler
- [ ] No direct DOM manipulation — use Angular bindings
- [ ] `$scope.$broadcast` / `$scope.$on` for cross-widget communication

**4c. UI Interaction**
- [ ] Modals via `$mdDialog.show({ contentElement: '#id', ... })` and `$mdDialog.hide()`
- [ ] Event handlers receive `$event` and call `$event.preventDefault()` / `$event.stopPropagation()` as needed
- [ ] Charts use Chart.js with data from server — colors not hardcoded in client
- [ ] Keyboard events check `$event.which` (37/39 arrows, 13 enter)

**4d. Anti-patterns**
- [ ] No jQuery (`$()`) mixed with Angular — use Angular directives
- [ ] No `console.log` in production code
- [ ] No hardcoded colors in JavaScript — pass from server or CSS variables

### Step 5: Server Script Review

Apply the checks from the [Server Script Reference](./references/server-patterns.md):

**5a. Data Convention**
- [ ] All client-bound data assigned to `data.*` object
- [ ] Input handling via `if (input && input.action === '...')`
- [ ] URL parameters via `$sp.getParameter('param')`
- [ ] Arrays serialized/deserialized with `JSON.parse()` / `.join(',')`

**5b. Authorization**
- [ ] Persona/role check for data scoping
- [ ] Data scoped by persona — different query behavior per role
- [ ] No sensitive data returned without authorization check

**5c. Query Patterns**
- [ ] `GlideRecord` with `addEncodedQuery()` for complex filters
- [ ] `setLimit()` on all queries that don't need full result sets
- [ ] `getValue()` / `getDisplayValue()` — never direct property access
- [ ] Results pushed as plain objects: `{ sys_id: gr.getValue('sys_id'), name: gr.getDisplayValue('name') }`

**5d. GraphQL Setup**
- [ ] Queries loaded via shared utility scope's QueryRepo pattern (if applicable)
- [ ] Query names passed to client as `data.gql`

### Step 6: Generate Report

Structure the review as:

#### UX Consistency Report — `{WidgetName}`

| # | Layer | Check | Status | Detail |
|---|-------|-------|--------|--------|
| 1 | CSS | Color tokens | PASS/FAIL | Uses design system vars vs hardcoded hex |
| 2 | HTML | ARIA labels | PASS/FAIL | Missing on filter dropdowns |
| ... | | | | |

#### Summary

| Layer | Pass | Fail | Score |
|-------|------|------|-------|
| CSS | ?/? | ?/? | ?% |
| Template | ?/? | ?/? | ?% |
| Client Script | ?/? | ?/? | ?% |
| Server Script | ?/? | ?/? | ?% |
| **Overall** | | | **?%** |

#### Fixes Required
For each FAIL, provide:
- **What's wrong** — The specific violation
- **Expected pattern** — Code snippet showing the correct way (from reference)
- **Where** — File and line number
