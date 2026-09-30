# CSS Patterns — Portal Design System

The canonical CSS patterns used across Service Portal and Employee Center widgets. Every widget must follow these conventions.

## Design Tokens

> **Canonical source:** Your portal theme's CSS variables SCSS file.
>
> All variables are injected at the portal theme level. **Do NOT redeclare them in widget `css.scss` files.** Use them directly — no `!default` declarations needed in widgets.

### Key variables available in every widget

```scss
// === Text ===
$text-primary       // Dark text color
$text-secondary     // Medium text color
$text-tertiary      // Light text color
$text-white         // #ffffff

// === Backgrounds ===
$background-primary    // #ffffff
$background-secondary  // Light gray
$background-tertiary   // Lighter gray

// === Borders ===
$border-tertiary    // Border/divider color — use for separator lines

// === Brand / Status ===
$brand-primary      // Primary brand color
$primary            // alias for $brand-primary
$link-color         // Link text color
$link-hover-color   // Link hover color

$overdue            // $brand-danger  — red, for overdue badges
$due-today          // $brand-warning — yellow, for due-today badges
$due-later          // $brand-success — green, for future due badges
$in-progress        // $brand-success
$complete           // $brand-low

// === Spacing ===
$sp-space--xxs  // 2px
$sp-space--xs   // 4px
$sp-space--sm   // 8px
$sp-space--md   // 12px
$sp-space--lg   // 16px
$sp-space--xl   // 24px
$sp-space--xxl  // 32px

// === Typography ===
$font-size-base    // 16px
$font-size-large   // 20px
$font-size-small   // 14px
$font-size-xs      // 12px
$font-size-h1–h6   // 32/24/20/18/16/14px

// === Shadows / Radii ===
$sp-panel-box-shadow   // Standard card shadow
$border-radius-base    // 4px
$border-radius-large   // 8px
$border-radius-small   // 2px
```

## Layout Patterns

### Card Grid (responsive)
```scss
.all-card-container {
  display: grid;
  padding: $rm * 12;
  grid-template-columns: 1fr;
  grid-gap: $rm * 12;
}

// Responsive breakpoints
@media (min-width: 768px) {
  .all-card-container { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 992px) {
  .all-card-container { grid-template-columns: repeat(3, 1fr); }
}
```

### Widget Grid (max 2 columns, auto-fit)
```scss
.widget-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(calc(50% - 10px), 1fr));
  gap: 20px;
}
.widget-grid .widget-wrapper {
  min-width: 0; // Prevent grid blowout
}
```

### Flexbox Row
```scss
.d-flex { display: flex; }
.align-items-center { align-items: center; }
.justify-content-end { justify-content: flex-end; }
.flex-grow-1 { flex-grow: 1; }
```

## Component Patterns

### Card Container
```scss
.link-container {
  background: $background-primary;
  box-shadow: $sp-panel-box-shadow;
  border-radius: $border-radius-large;
  margin-bottom: $rm * 8;
  min-width: min-content;

  .title {
    min-width: 250px;
    line-height: $rm * 12;
    color: $text-primary;
    word-wrap: break-word;
    padding: $rm * 12;
    border-bottom: 1px solid $border-tertiary;
  }
}
```

### Card Thumbnail (Left-aligned)
```scss
.card-thumbnail-align-left {
  display: flex;
  flex-direction: row;
  border: 1px solid $border-tertiary;
  border-radius: $border-radius-base;
  padding: $rm * 4 $rm * 8;
  flex: 1;
  word-wrap: break-word;
  word-break: break-word;
}
```

### Status Circle (Progress Indicator)
```scss
.circle-check {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  border: 3px solid $brand-primary;
  background-color: white;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.circle-check.circle-complete {
  background-color: $brand-primary;
  color: white;
}
.circle-check.circle-inprogress {
  color: $brand-primary;
}
.circle-check.circle-skipped {
  --gray: rgb(107, 111, 115);
  border: 3px solid var(--gray);
  color: var(--gray);
}
.circle-check.circle-canceled {
  border: 3px solid $brand-danger;
}
```

### Buttons
```scss
// Standard action button
button {
  background-color: rgba($brand-primary, 0.1);
}
button:hover {
  opacity: 0.85;
}
button > span {
  color: $brand-primary;
}
```

### Connection Line (between status circles)
```scss
.circle-check-line {
  position: absolute;
  background-color: $brand-primary;
  width: 100%;
  height: 2px;
  top: 45%;
}
```

### Section Title
```scss
.box-title {
  font-size: 1.2em;
  font-weight: bold;
}
```

### Utility Classes
```scss
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.small-text {
  font-size: 0.8em;
  padding: 5px;
}
.mainBlue {
  color: $brand-primary;
}
```

## Rules

1. **No raw hex for brand colors** — Use variables or the documented token values
2. **Spacing via `$rm` multiplier** — Never use arbitrary values like `padding: 17px`
3. **No inline styles** — Everything goes in `css.scss`
4. **No empty CSS files** — If widget has no custom styles, add a comment explaining it inherits from parent
5. **`!important` only for overriding OOB/third-party styles** — Never between custom widgets
6. **No hardcoded colors in JavaScript** — Pass color arrays from server script or reference CSS classes
