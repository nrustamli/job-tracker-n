# Job Tracker: Design Specification (v3)

---

## 1. Foundations

### 1A. Color Palette

| Token | Hex | Usage |
| :--- | :--- | :--- |
| `--color-bg` | `#FFF7E9` | Primary background (Eggshell White) |
| `--color-accent` | `#FF731D` | FAB, active filter state, Save button, CTA |
| `--color-blue-deep` | `#1746A2` | Headers, Job Titles, active tag pill fill |
| `--color-blue-sky` | `#5F9DF7` | Company text, links, Applied status dot |
| `--color-success` | `#2ECC71` | Offer status dot |
| `--color-neutral` | `#BDBDBD` | Rejected status dot, Ghosted/Withdrawn dot |
| `--color-surface` | `#FFFFFF` | Expanded row background, modal surface |
| `--color-border` | `rgba(95,157,247,0.10)` | Row dividers |

### 1B. Typography

| Role | Font | Weight | Size | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Display / Header | Serif (Georgia / Lora) | Regular | 24px | 1.3 | — |
| Section Title | Serif | Regular | 18px | 1.3 | — |
| Body / Company | Roboto Regular | 400 | 14px | 1.5 | — |
| Label / Filter | Roboto Condensed Bold | 700 | 12px | 1.2 | +0.04em |
| Tag / Type | Roboto Condensed | 400 | 10px | 1.2 | +0.08em (all caps) |

### 1C. Spacing Tokens

| Token | Value |
| :--- | :--- |
| `--spacing-xs` | 4px |
| `--spacing-sm` | 8px |
| `--spacing-md` | 16px |
| `--spacing-lg` | 24px |
| `--spacing-xl` | 40px |

### 1D. Layout Dimensions

| Element | Mobile | Desktop |
| :--- | :--- | :--- |
| Header height | 56px | 64px |
| Filter bar height | 40px | 40px |
| Row min-height | 64px | 64px |
| Row expanded height | auto | auto |
| Max content width | 100% | 640px (centered) |

---

## 2. Transitions & Animation

| Interaction | Property | Duration | Easing |
| :--- | :--- | :--- | :--- |
| Row hover lift | `background` | 150ms | ease |
| Row expand / collapse | `height`, `opacity` | 200ms / 150ms | ease |
| Filter active state | `color`, `border-color` | 100ms | ease |
| FAB press feedback | `transform: scale(0.95)` | 80ms | ease |

---

## 3. Components

### 3A. Header

- **Left:** App title ("My Path" or "Applications") — Serif, 24px (mobile) / 24px (desktop), `--color-blue-deep`
- **Right (mobile):** FAB is fixed, bottom-right corner
- **Right (desktop):** FAB is inline top-right within the header

### 3B. Filter Bar — Hybrid

The filter bar combines fixed base filters and user-defined tag pills in a single horizontally scrollable row.

**Base filters** (always present, left-aligned):

- Items: `ALL` | `STARTUP` | `BIG TECH`
- Active state: text color `--color-accent`, 2px underline in `--color-accent`
- Inactive state: text color `--color-blue-sky`
- Font: Roboto Condensed Bold, 12px, +0.04em tracking

**User tag pills** (appear after base filters):

- Font: Roboto Condensed, 10px, `+0.08em`, all caps
- Inactive: `--color-blue-deep` text, 1px `--color-blue-deep` border, transparent background
- Active: `--color-blue-deep` fill, white text
- Examples: `Remote`, `FAANG`, `Finance`

**Add tag:** A small `+` icon/button adjacent to the last pill opens a tag creation input.

### 3C. Application Row (List)

Row separator: 1px bottom border, `--color-border`.

| Element | Style | Color |
| :--- | :--- | :--- |
| Job Title | Serif, 18px | `--color-blue-deep` |
| Company | Roboto Regular, 14px | `--color-blue-sky` |
| Type Tag | Roboto Condensed, 10px, all caps | `--color-accent` (no background) |
| Status Dot | 8px filled circle | See status table below |

**Row padding:** 12px 16px (mobile) / 14px 20px (desktop)

#### Status Definitions

| Status | Dot Color | Label Style |
| :--- | :--- | :--- |
| Applied | `--color-blue-sky` (#5F9DF7) | Roboto Regular |
| Phone Screen | `--color-blue-sky` (#5F9DF7) | Roboto Italic |
| Interviews | `--color-accent` (#FF731D) | Roboto Regular |
| Offer | `--color-success` (#2ECC71) | Roboto Regular |
| Rejected | `--color-neutral` (#BDBDBD) | Roboto Regular |
| Ghosted / Withdrawn | `--color-neutral` (#BDBDBD) | Roboto Italic |

### 3D. Inline Row Expand Behavior

Tapping or clicking the row header area toggles an inline expand. The row does **not** navigate away.

**Expand animation:**
- `height` animates open over 200ms ease
- `opacity` of revealed content fades in over 150ms ease

**Expanded row styling:**
- Background: `--color-surface` (#FFFFFF)
- Left border: 3px solid `--color-accent` (#FF731D)

**Revealed content (in order):**

1. **Date Applied** — Roboto Regular, 12px, `--color-blue-sky`
2. **Notes** — Inline editable text area, Roboto Regular 14px, `--color-blue-deep`; placeholder text in `--color-neutral`
3. **Status control** — Segmented control or dropdown using the 6 statuses defined in 3C
4. **Job posting URL** — Roboto Regular, 12px, `--color-blue-sky`, tappable/clickable external link
5. **Remove / Archive action** — Roboto Condensed, 12px, `--color-neutral`; destructive action requires confirmation

**Collapse:** tap the row header area again. Row animates closed (200ms ease).

### 3E. "Add Application" FAB Form

Triggered by the FAB (`+` button, `--color-accent` circle, white icon).

Presented as a **bottom sheet on mobile**, **centered modal on desktop**.

**Fields:**

| Field | Type | Required | Default |
| :--- | :--- | :--- | :--- |
| Job Title | Text input | Yes | — |
| Company | Text input | Yes | — |
| Status | Segmented / Dropdown | Yes | Applied |
| Category Tag | Select (Startup / Big Tech / custom) | No | — |
| Job Posting URL | URL input | No | — |
| Notes | Multiline text area | No | — |

**Field style:** Serif font for Job Title input; Roboto for all others.

**Save button:** Full-width, `--color-accent` (#FF731D) background, white Roboto Bold label, 14px.

### 3F. Empty State

Displayed when no applications match the active filter:

> *"No [Startup / Big Tech] applications yet."*

Style: Serif, 16px, `--color-blue-deep`, centered vertically and horizontally within the list area.

---

## 4. Responsive Layout

### Mobile (< 640px)

- Single-column list, full-width rows
- Header: Serif title 20px, FAB fixed at bottom-right, 16px from edges
- Filter bar: horizontally scrollable, `overflow-x: auto`, no wrapping, hidden scrollbar
- Row padding: 12px 16px
- Max visible rows above fold: ~5–6 at default font size
- Modal/form presented as a bottom sheet (slides up from bottom edge)

### Desktop (≥ 640px)

- Max content width: 640px, horizontally centered
- Header: Serif title 24px, FAB inline at top-right within header container
- Filter bar: static (no scroll needed at standard widths), full content width
- Row padding: 14px 20px
- Row hover: background transitions from `--color-bg` to `--color-surface` (150ms ease) — lift effect
- Modal/form presented as a centered modal with backdrop

---

## 5. Implementation Notes

- All color values should be defined as CSS custom properties on `:root` using the token names in Section 1A.
- Spacing values should similarly use CSS custom properties from Section 1C.
- Status dot is an `8px × 8px` circle element (e.g., `border-radius: 50%`) placed inline with the row metadata.
- The filter bar `+` tag button should be `aria-label="Add tag"` and visually distinct from tag pills (icon-only or text `+ tag`).
- Expanded row state should be managed in component state (not a route change).
- FAB `z-index` on mobile should sit above the list and filter bar.
