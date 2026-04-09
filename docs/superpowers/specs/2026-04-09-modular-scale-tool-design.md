# RAE Modular Scale — Design Spec

## Overview

A web-based modular type scale calculator with dual-base support, multiple export formats, and architecture designed for future Figma plugin extraction. Public-facing tool built with RAE's workflow in mind.

**URL:** Deployed on Vercel. All configuration shareable via URL parameters.

## Core Algorithm: Double-Stranded Modular Scale

The tool supports 1 or 2 base values. When two bases are provided, both generate independent scales using the same ratio, then all values are merged and sorted by size.

```
Single base (16px, ratio 1.333):
  16 × 1.333^-2, 16 × 1.333^-1, 16, 16 × 1.333^1, 16 × 1.333^2, ...

Dual base (16px + 24px, ratio 1.333):
  Strand A: 16 × 1.333^n  for n in [-negSteps..posSteps]
  Strand B: 24 × 1.333^n  for n in [-negSteps..posSteps]
  → Merge all values, deduplicate (if two strands round to same px value, keep one and mark as "both"), sort ascending, assign sequential step indices
```

### Rounding

Values are locked to a pixel grid by default:

- **1px lock (default):** Round to nearest whole pixel, then convert to rem (multiples of 0.0625rem)
- **2px lock:** Round to nearest 2px, then convert to rem (multiples of 0.125rem)
- **None:** Raw calculated values

This matches the existing SCSS `round-rem()` function behavior.

### Configuration Defaults

| Setting | Default |
|---------|---------|
| Base A | 16px |
| Base B | off (toggle to enable) |
| Ratio | Perfect Fourth (1.333) |
| Negative steps | 2 |
| Positive steps | 10 |
| Rounding | 1px (0.0625rem) |
| Export prefix | `--step-` |

## Ratio Presets

Named presets with free-form custom input:

| Name | Value |
|------|-------|
| Minor Second | 1.067 |
| Major Second | 1.125 |
| Minor Third | 1.200 |
| Major Third | 1.250 |
| Perfect Fourth | 1.333 |
| Augmented Fourth | 1.414 |
| Perfect Fifth | 1.500 |
| Minor Sixth | 1.600 |
| Golden Ratio | 1.618 |
| Major Sixth | 1.667 |
| Octave | 2.000 |

Users can type any custom ratio value. Valid range: **1.01 – 4.0**. Values outside this range are clamped. Ratio of exactly 1 is disallowed (produces no scale).

## UI Layout

Single-page application. Light theme, clean and spacious.

### Structure

```
┌─────────────────────────────────────────────────────┐
│  RAE Scale / modular type scale    [Share] [Export]  │
├──────────────┬──────────────────────────────────────┤
│              │  [Scale] [Specimen]     Font: [Inter] │
│  Base Size   │                                       │
│  [16] px     │  Legend: ── Base A  ── Base B         │
│              │                                       │
│  ☑ Second    │  -2   9px   0.5625rem   Sample text   │
│  [24] px     │  -1  14px   0.875rem    Sample text   │
│              │   0  16px   1rem        Sample text   │
│  ──────────  │   1  18px   1.125rem    Sample text   │
│  Ratio       │   2  21px   1.3125rem   Sample text   │
│  [Perfect ▾] │   3  24px   1.5rem      Sample text   │
│              │   4  28px   1.75rem     Sample text   │
│  ──────────  │   ...                                 │
│  Steps       │                                       │
│  [2] neg     │──────────────────────────────────────│
│  [10] pos    │  Code Output    [CSS|SCSS|TW|JSON]    │
│              │  :root {                              │
│  ──────────  │    --step-0: 1rem; /* 16px */         │
│  Rounding    │    --step-1: 1.125rem; /* 18px */     │
│  [1px][2px]  │    ...                                │
│  [None]      │  }                                    │
│              │                                       │
│  ──────────  │                                       │
│  Prefix      │                                       │
│  [--step-]   │                                       │
└──────────────┴──────────────────────────────────────┘
```

### Left Sidebar (340px)

Controls with generous spacing (32px padding, 28px gaps between groups):

1. **Base Size** — Number input + "px" label. Toggle switch for second base. Second input appears when toggled on.
2. **Ratio** — Dropdown with named presets. Custom value via free-form input within the dropdown.
3. **Steps** — Two small number inputs: negative count (0–10) and positive count (1–20). Clamped to valid range.
4. **Rounding** — Chip/toggle group: 1px | 2px | None. Default: 1px.
5. **Export Prefix** — Text input for variable name prefix. Default: `--step-`

### Right Main Area

**Preview Header:** Tab toggle (Scale / Specimen) + Google Fonts picker.

**Scale View (default):**
- Legend showing strand colors (blue = Base A, purple = Base B) — only visible when dual-base is active
- Each row: step number | px value | rem value | sample text rendered at actual computed size
- Rows color-coded with left border by strand origin
- Base value rows get subtle highlight

**Specimen View:**
- Typography specimen showing the scale applied to a realistic page layout
- Default mapping (adjusts dynamically based on available steps):

| Element | Step | Role |
|---------|------|------|
| Display | highest step | Hero/display heading |
| H1 | step 6 (or highest - 1) | Page heading |
| H2 | step 4 | Section heading |
| H3 | step 2 | Subsection |
| Body | step 0 | Body text |
| Small | step -1 | Captions, labels |
| XS | step -2 (if available) | Fine print |

- Demonstrates the scale's visual rhythm in context

**Google Fonts Picker:**
- Searchable dropdown in the preview header
- Dynamically loads the selected font from Google Fonts API
- Applied to all sample text in both Scale and Specimen views

### Export Panel (inside right column, below preview)

Code output panel within the right main area, below the scale/specimen view, with format tabs:

- **CSS** — `:root { --step-N: Xrem; /* Ypx */ }` block
- **SCSS** — `$type-scale` map + individual `$step-N` variables
- **Tailwind** — `fontSize` entries for `tailwind.config.ts`
- **JSON** — Raw array of `{ step, px, rem, strand }` objects

Each format has a copy-to-clipboard button. A descriptive comment header is included (bases, ratio, settings).

## URL State

All configuration encoded in URL search params for sharing:

```
?base=16,24&ratio=1.333&neg=2&pos=10&round=1&prefix=step&font=Inter&view=scale
```

| Param | Description | Default |
|-------|-------------|---------|
| `base` | Base value(s), comma-separated | `16` |
| `ratio` | Scale ratio | `1.333` |
| `neg` | Negative step count | `2` |
| `pos` | Positive step count | `10` |
| `round` | Rounding: `1`, `2`, or `0` (none) | `1` |
| `prefix` | Export variable prefix (without `--` and trailing `-`, reconstructed by export formatters) | `step` |
| `font` | Google Font family name | `Inter` |
| `view` | Active view: `scale` or `specimen` | `scale` |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| UI Components | shadcn/ui |
| Styling | Tailwind CSS |
| URL State | nuqs |
| Fonts | Google Fonts API (dynamic loading) |
| Deployment | Vercel |
| Code Highlighting | Syntax highlighting in export panel (lightweight, not full Shiki) |

## Architecture for Figma Plugin Extraction

The core calculation engine lives in `lib/scale.ts` as pure functions with zero React/Next.js dependencies:

```
lib/
  scale.ts        — generateScale(), mergeStrands(), roundToGrid()
  ratios.ts       — RATIO_PRESETS constant
  export.ts       — formatCSS(), formatSCSS(), formatTailwind(), formatJSON()
```

These files can be directly extracted into a shared package or copied into a Figma plugin project. The Figma plugin's key differentiator: mapping generated scale values to **Figma Variables** (text styles, number variables for spacing).

## Visual Design

- **Theme:** Light, clean, spacious — inspired by v0.app's aesthetic but in light mode
- **Colors:** Zinc palette from Tailwind. Blue (#3b82f6) and purple (#a855f7) for strand indicators.
- **Typography:** System font stack for UI, Google Fonts for preview content
- **Borders:** Soft `#f4f4f5` dividers, `#e4e4e7` for input borders
- **Border radius:** 8px for inputs, 16px for main frame
- **Spacing:** Generous — 32px sidebar padding, 28px preview padding, 28px gaps between control groups
- **Shadows:** Minimal — subtle box-shadow on main frame only

## Out of Scope (v1)

- Dark/light theme toggle (light only for v1)
- Saving custom ratio presets to localStorage
- Semantic step naming (e.g., mapping step 3 → "heading")
- Figma plugin (architecture supports it, but not built in v1)
- User accounts or server-side persistence
- Spacing scale generation (typography only for v1)
