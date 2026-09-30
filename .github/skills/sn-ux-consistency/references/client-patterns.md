# Client Script Patterns — Portal Design System

Standard Angular controller patterns for Service Portal widget client scripts.

## Controller Structure

Every widget client script follows this pattern:

```javascript
api.controller = function($scope, $timeout, fcService, $location, $mdDialog, spUtil) {
    var c = this;

    // === Initialization ===
    // URL parameters → filter state
    var urlParameters = $location.search();
    
    $scope.filters = {
        selectedItems: urlParameters.items
            ? JSON.parse(decodeURI(urlParameters.items))
            : []
    };

    // Search term initialization (one per filter)
    $scope.searchTerm = '';

    // === Methods ===
    $scope.methodName = function(param) {
        // Implementation
    };

    // === Event Handlers ===
    $scope.onClick = function($event, item) {
        $event.preventDefault();
        // Handle click
    };
};
```

## Common Service Dependencies

| Service | Purpose | When to Include |
|---------|---------|-----------------|
| `$scope` | Angular scope binding | Always |
| `$timeout` | Async DOM operations | When deferring execution |
| `$location` | URL parameter access | Widgets with filters |
| `fcService` | GraphQL via shared utility | Widgets querying data via GraphQL |
| `$mdDialog` | Material dialogs | Widgets with modals |
| `spUtil` | Service Portal utilities | Record watchers, alerts |
| `spScUtil` | User preferences | Widgets storing state |
| `snAnalytics` | Event tracking | Widgets tracking usage |

## Data Flow Patterns

### Server → Client
```javascript
// Server script sets:     data.items = [...]
// Client accesses:        c.data.items
// Template accesses:      {{c.data.items}} or {{data.items}}
```

### Client → Server (Action)
```javascript
c.server.get({ action: 'getDetails', sys_id: itemId })
    .then(function(response) {
        $scope.details = response.data.details;
    });
```

### Client → Server (Update)
```javascript
c.data.selectedFilter = newValue;
c.server.update().then(function() {
    // Server processed and returned updated data
});
```

### GraphQL (Shared Utility Pattern)
```javascript
// Server sets: data.gql = {utility_scope}.QueryRepo().getQueriesByName('Query1,Query2');

// Client calls:
fcService.graphQl(c.data.gql.QueryName, true, params)
    .then(function(response) {
        $scope.results = response.data.data.GlideRecord_Query.tableName._results;
    });
```

## Filter Pattern

### Initialization from URL
```javascript
var urlParameters = $location.search();

$scope.filters = {
    selectedDepartments: urlParameters.departments
        ? JSON.parse(decodeURI(urlParameters.departments))
        : [],
    selectedStartDate: urlParameters.start_date || '',
    selectedEndDate: urlParameters.end_date || ''
};
```

### Search Term Management
```javascript
// One search term per dropdown filter
$scope.departmentSearchTerm = '';
$scope.branchSearchTerm = '';

// Clear on dropdown close (bound to md-on-close)
$scope.clearDepartmentSearch = function() {
    $scope.departmentSearchTerm = '';
};

// Prevent event bubbling in search inputs inside dropdowns
$scope.stopPropagation = function(ev) {
    ev.stopPropagation();
};
```

### URL Sync on Filter Change
```javascript
$scope.$watchCollection('filters', function(newFilters) {
    $location.search('departments', JSON.stringify(newFilters.selectedDepartments));
});
```

## Modal Pattern ($mdDialog)

```javascript
// Open
$scope.openModal = function(ev) {
    $mdDialog.show({
        contentElement: '#modalId',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
    });
};

// Close
$scope.closeModal = function() {
    $mdDialog.hide();
};
```

## Accordion Toggle

```javascript
c.data.filterShow = 'Show Additional Filters +';

$scope.changeText = function() {
    c.data.filterShow = (c.data.filterShow === 'Hide Filters -')
        ? 'Show Additional Filters +'
        : 'Hide Filters -';
};
```

## Chart.js Integration

```javascript
// Build chart after data loads
function buildChart(canvasId, chartData) {
    var ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: chartData.labels,
            datasets: [{
                data: chartData.values,
                backgroundColor: chartData.colors  // Colors from server, NOT hardcoded
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
```

## Keyboard Navigation

```javascript
$scope.handleKeydown = function($event) {
    switch ($event.which) {
        case 13: // Enter
            $scope.selectItem();
            break;
        case 37: // Left arrow
            $scope.previousTab();
            break;
        case 39: // Right arrow
            $scope.nextTab();
            break;
    }
};
```

## Cross-Widget Communication

```javascript
// Broadcasting (parent → children)
$scope.$broadcast('filterChanged', $scope.filters);

// Listening (child)
$scope.$on('filterChanged', function(event, filters) {
    $scope.applyFilters(filters);
});
```

## Rules

1. **`var c = this;`** — Always assign controller context
2. **No jQuery** — Use Angular directives and `$scope` methods instead of `$()` selectors
3. **No `console.log`** — Remove before syncing
4. **No hardcoded colors** — Pass color arrays from server script
5. **No DOM manipulation** — Use Angular bindings, `ng-class`, `ng-style`
6. **Promises always handled** — Every `.then()` should handle the response; consider `.catch()` for error states
7. **Filter state from URL** — Use `$location.search()` so filters survive page refresh
8. **Search terms as `$scope` vars** — One per filter dropdown, cleared on `md-on-close`
