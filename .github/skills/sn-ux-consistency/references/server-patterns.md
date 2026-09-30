# Server Script Patterns — Portal Design System

Standard server-side script patterns for Service Portal widgets.

## Structure

Every widget server script follows the IIFE pattern:

```javascript
(function() {
    // === Data initialization ===
    data.items = [];
    data.title = 'Widget Title';

    // === Authorization ===
    data.personas = {custom_scope}.Access().getPersonas();

    // === Data queries ===
    populateData();

    // === Input handling (server calls from client) ===
    if (input && input.action === 'getDetails') {
        handleGetDetails();
    }

    // === Helper functions ===
    function populateData() {
        // Query logic
    }

    function handleGetDetails() {
        // Input handling logic
    }
})();
```

## Data Binding Convention

### Passing Data to Client
```javascript
// Simple values
data.title = 'My Widget';
data.count = 42;
data.showFilter = true;

// Arrays (for ng-repeat)
data.items = [];
var gr = new GlideRecord('table_name');
gr.addEncodedQuery('active=true');
gr.setLimit(100);
gr.query();
while (gr.next()) {
    data.items.push({
        sys_id: gr.getValue('sys_id'),
        name: gr.getDisplayValue('name'),
        status: gr.getDisplayValue('state'),
        url: '?id=page&sys_id=' + gr.getValue('sys_id')
    });
}

// GraphQL setup
data.gql = {utility_scope}.QueryRepo().getQueriesByName('Query1,Query2');
```

### Handling Client Input
```javascript
if (input) {
    if (input.action === 'getDetails') {
        var gr = new GlideRecord('sn_hr_core_case');
        if (gr.get(input.sys_id)) {
            data.detail = {
                number: gr.getValue('number'),
                subject: gr.getValue('subject')
            };
        }
    }
}
```

## Authorization Pattern (Persona-Based)

```javascript
data.personas = {custom_scope}.Access().getPersonas();

if (data.personas.director_role) {
    // Full access — no restriction
    data.my_branches = [];
} else if (data.personas.org_wide_user) {
    // Organization-wide access with predefined branches
    data.my_branches = ['Branch1', 'Branch2'];
} else if (data.personas.team_lead || data.personas.specialist) {
    // Scoped to user's groups
    data.my_branches = {custom_scope}.GroupMemberRepo().getMyGroups();
} else {
    // Default: no access
    data.my_branches = [];
    data.items = [];
    return;
}
```

## URL Parameter Handling

```javascript
// Simple parameter
data.category_id = $sp.getParameter('category_id');

// Array parameter (JSON-encoded in URL)
var branchParam = $sp.getParameter('branches');
var branches = branchParam ? JSON.parse(branchParam).join(',') : '';

// Build encoded query from parameters
var encodedQuery = 'active=true';
if (branches) {
    encodedQuery += '^branchIN' + branches;
}
```

## Query Patterns

### Standard GlideRecord
```javascript
var gr = new GlideRecord('sn_hr_core_case');
gr.addEncodedQuery('active=true^assignment_group!=NULL');
gr.setLimit(100);
gr.orderByDesc('sys_created_on');
gr.query();

var results = [];
while (gr.next()) {
    results.push({
        sys_id: gr.getValue('sys_id'),
        number: gr.getValue('number'),
        short_description: gr.getValue('short_description'),
        assigned_to: gr.getDisplayValue('assigned_to'),
        state: gr.getDisplayValue('state')
    });
}
data.items = results;
```

### Dynamic Query from Filters
```javascript
var query = 'active=true';

// IN queries from multi-select filters
if (input && input.members) {
    query += '^assigned_hrIN' + input.members;
}
if (input && input.branches) {
    query += '^hr_service_groupIN' + input.branches;
}

// Date range
if (input && input.startDate) {
    query += '^sys_created_on>=' + input.startDate;
}
if (input && input.endDate) {
    query += '^sys_created_on<=' + input.endDate;
}

// OR conditions
query += '^ORassigned_hrISEMPTY';
```

### Aggregation
```javascript
var ga = new GlideAggregate('sn_hr_core_case');
ga.addEncodedQuery('active=true');
ga.addAggregate('COUNT');
ga.groupBy('state');
ga.query();

while (ga.next()) {
    data.stateCounts.push({
        state: ga.getDisplayValue('state'),
        count: parseInt(ga.getAggregate('COUNT'), 10)
    });
}
```

## GraphQL Setup

```javascript
// Load named queries from shared utility QueryRepo
data.gql = {utility_scope}.QueryRepo().getQueriesByName(
    'GetAggregateByPhase,GetCertificates,GetOpenItems'
);
```

## Pagination Pattern

```javascript
data.limit = 20;
data.startWindow = 0;
data.endWindow = data.limit;

var gr = new GlideRecord('table_name');
gr.addEncodedQuery(encodedQuery);
gr.orderByDesc('sys_created_on');
gr.chooseWindow(data.startWindow, data.endWindow);
gr.query();

while (gr.next()) {
    data.items.push({ /* ... */ });
}

// Check for more records
data.hasMore = (data.items.length > data.limit);
```

## Rules

1. **Always use `getValue()` / `getDisplayValue()`** — Never access GlideRecord fields as properties
2. **Always `setLimit()`** — On queries that don't need full result sets
3. **Always authorize** — Check personas before returning data
4. **Always use `addEncodedQuery()`** — For multi-condition queries
5. **Push plain objects** — Never push GlideRecord objects into arrays (they're mutable references)
6. **No `gs.print()`** — Use `gs.info()`, `gs.warn()`, `gs.error()`
7. **No hardcoded sys_ids** — Resolve via query or system property
8. **Input validation** — Check `if (input && input.action)` before processing client requests
9. **`GlideRecordSecure` vs `GlideRecord` for cross-scope tables** — `GlideRecordSecure` enforces ACLs at the row level and is preferred for same-scope or portal-facing queries. However, when querying tables owned by a **different scope** (e.g., querying `sn_hr_core_case` from a widget in `sn_hr_sp`), `GlideRecordSecure` may fail to resolve records even when the table ACL permits access. In these cases, use `GlideRecord` — the table-level ACL still applies and provides the correct security boundary.
