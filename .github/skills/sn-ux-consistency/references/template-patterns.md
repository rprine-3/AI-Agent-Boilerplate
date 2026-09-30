# Template Patterns — Portal Design System

Standard HTML/Angular template patterns for Service Portal widgets.

## Structure

Every widget template should follow this hierarchy:

```html
<!-- Wrapper with semantic context -->
<div class="widget-container">
  
  <!-- Header (optional) -->
  <div class="box-title">{{data.title}}</div>
  
  <!-- Content -->
  <div class="content-container">
    <!-- Widget body -->
  </div>
  
  <!-- Empty state -->
  <div ng-if="!data.items || data.items.length === 0" class="empty-state">
    <p>No items to display.</p>
  </div>

</div>
```

## Component Patterns

### Card List
```html
<div class="all-card-container">
  <div class="card-thumbnail-align-left" ng-repeat="item in data.items track by item.sys_id">
    <div class="icon-container">
      <img ng-if="item.icon" ng-src="{{item.icon}}" alt="{{item.title}}"/>
    </div>
    <div class="content">
      <a ng-href="{{item.url}}" aria-label="{{item.title}}">
        <span class="card-title text-ellipsis">{{item.title}}</span>
      </a>
      <p class="text-muted small-text">{{item.description}}</p>
    </div>
  </div>
</div>
```

### Filter Dropdown (md-select with search)
```html
<md-input-container>
  <label>Filter Label</label>
  <md-select ng-model="filters.selectedValues"
             md-on-close="clearSearch()"
             placeholder="Select item(s)"
             aria-label="Filter description"
             multiple>
    <md-select-header class="demo-select-header">
      <input ng-model="searchTerm"
             ng-keydown="stopPropagation($event)"
             aria-label="Search filter items"
             type="search"
             placeholder="Type to search..."
             class="select-search-box">
    </md-select-header>
    <md-optgroup label="Group Label">
      <md-option ng-value="item.id"
                 ng-repeat="item in data.items | filter: searchTerm">
        {{item.name}}
      </md-option>
    </md-optgroup>
  </md-select>
</md-input-container>
```

### Grouped Filter (Department pattern)
```html
<md-optgroup ng-repeat="group in grouped_items | filter: filterGroup(searchTerm)"
             label="{{group.prefix}} ({{group.children.length}})">
  <md-option ng-value="group.prefix"
             ng-click="selectAllInGroup(group, $event)"
             style="font-weight: bold; background-color: #f5f5f5;">
    ▸ Select All {{group.prefix}}...
  </md-option>
  <md-option ng-value="item.value"
             ng-repeat="item in group.children | filter: searchTerm">
    &nbsp;&nbsp;{{item.label}}
  </md-option>
</md-optgroup>
```

### Data Table (Accessible)
```html
<table aria-labelledby="table-title" aria-describedby="table-caption">
  <caption id="table-caption">
    <span class="sr-only">Description of table contents</span>
  </caption>
  <thead>
    <tr>
      <th id="col-name" scope="col">Name</th>
      <th id="col-status" scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr ng-repeat="row in data.rows track by row.sys_id">
      <td headers="col-name">{{row.name}}</td>
      <td headers="col-status">{{row.status}}</td>
    </tr>
  </tbody>
</table>
```

### Accordion (Bootstrap)
```html
<div id="accordion">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h5 class="mb-0">
        <button class="btn btn-link"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-controls="collapseOne"
                ng-click="changeText()">
          {{data.filterShow}}
        </button>
      </h5>
    </div>
    <div id="collapseOne" class="collapse"
         aria-labelledby="headingOne"
         data-parent="#accordion"
         aria-expanded="false">
      <div class="card-body">
        <!-- Content -->
      </div>
    </div>
  </div>
</div>
```

### Modal Dialog
```html
<!-- Modal trigger -->
<button ng-click="openModal($event)" aria-label="Open details">
  View Details
</button>

<!-- Modal content (hidden, managed by $mdDialog) -->
<div id="myModal" style="display: none;">
  <md-dialog aria-label="Dialog Title">
    <md-toolbar>
      <div class="md-toolbar-tools">
        <h2>Title</h2>
        <span flex></span>
        <md-button class="md-icon-button" ng-click="closeModal()">
          <span class="glyphicon glyphicon-remove" aria-label="Close"></span>
        </md-button>
      </div>
    </md-toolbar>
    <md-dialog-content>
      <!-- Dialog body -->
    </md-dialog-content>
  </md-dialog>
</div>
```

### Persona-Gated Content
```html
<!-- Show only for specific personas -->
<div ng-if="c.data.personas.admin_role || c.data.personas.elevated_user">
  <!-- Privileged content -->
</div>
```

### External Link with Screen Reader
```html
<a ng-href="{{item.url}}" target="_blank" rel="noopener noreferrer">
  {{item.title}}
  <span class="sr-only">${External Link}</span>
</a>
```

## Accessibility Checklist

| Element | Required Attribute |
|---------|-------------------|
| Buttons | `aria-label` if icon-only |
| Dropdown | `aria-label` on `md-select` |
| Table | `<caption>` with `.sr-only`, `scope="col"` on `<th>` |
| Toggle | `ng-attr-aria-expanded="{{expanded}}"` |
| External link | `<span class="sr-only">${External Link}</span>` |
| Search input | `aria-label` describing what it searches |
| Modal | `aria-label` on `md-dialog` |
| `ng-repeat` | Always use `track by item.sys_id` |

## Rules

1. **No inline styles** — Use `css.scss`. Exception: `style="display: none;"` on modal containers managed by `$mdDialog`
2. **Template max 150 lines** — Extract repeated sections into child widgets
3. **Max 3 levels of `ng-if`/`ng-repeat` nesting** — Flatten with computed properties
4. **Always `track by`** — Every `ng-repeat` must use `track by item.sys_id` or `track by $index`
5. **`ng-if` over `ng-show`** — For heavy DOM sections that aren't always visible
