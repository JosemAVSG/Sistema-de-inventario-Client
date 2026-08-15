---
project: inventario-pro-client
register: product
aesthetic_direction: technical / utilitarian
color_strategy: restrained
design_system: bespoke (existing Tailwind v4 @theme in src/index.css)
design_variance: 2
motion_intensity: 2
visual_density: 6
---

# Design Language — InventarioPro (locked)

Every screen must read as the same product if placed side by side.

## Design Read

Control-room calm: dark slate surfaces, one sky signal, nothing decorative. Precision over novelty — an
inventory tool should feel like a well-kept stockroom, not a landing page.

## Signature

The **barcode stock panel**: a ruled technical panel carrying a barcode glyph (the app literally ships a
barcode scanner). One memorable, domain-specific move — everything else stays quiet.

## Color (locked)

Values already exist in `src/index.css` `@theme`; DESIGN.md is the source of truth.

| role | hex | use |
|------|-----|-----|
| background | `#0f172a` (secondary-900) | page base |
| surface | `#1e293b` (secondary-800) | cards, form panel, hero panel |
| elevated | `#334155` (secondary-700) | inputs, hover states |
| text | `#e2e8f0` (slate-200) | primary text |
| muted | `#94a3b8` (slate-400) | secondary text |
| subtle | `#64748b` (slate-500) | tertiary / hints |
| border | `#475569` (secondary-600) / white/10 | dividers, input borders |
| accent (ONE) | `#0ea5e9` (primary-500); hover `#38bdf8` (primary-400) | focus, primary CTA, links, hero accent line |
| success | `#10b981` | success states |
| warning | `#f59e0b` | warning states |
| danger | `#ef4444` | error states |
| info | `#3b82f6` | info states |

WCAG AA: text `#e2e8f0` on surface `#1e293b` ≈ 13:1 · muted `#94a3b8` on background `#0f172a` ≈ 7:1 ·
accent `#38bdf8` on surface `#1e293b` ≈ 7:1. All pass.

## Type (locked)

| role | family | use |
|------|--------|-----|
| display | Inter 700, tracking-tight | hero headline |
| body | Inter 400/500 | labels, paragraphs |
| utility | Inter 500/600, uppercase tracking-wider (labels) | form labels, small caps |

Inter is the established project-wide face (index.css `--font-family-sans`); kept for cross-screen
consistency — one family, weight contrast (allowed pairing per anti-slop).

## Scales (locked)

- **Spacing**: Tailwind 4px rhythm (0,2,4,8,12,16,20,24,32,40,48,64,80,96,128).
- **Radius**: `{ sm:4, md:8 (rounded-lg), lg:12 (rounded-xl), xl:16 (rounded-2xl), full }`. Inputs/buttons
  `rounded-lg`; panels `rounded-xl`; logo mark `rounded-2xl`.
- **Motion**: durations 100/300/500ms, single ease-out curve; ONE orchestrated page-load reveal;
  exit ≈ 75% of enter; honor `prefers-reduced-motion`. No bounce, no scattered micro-animation.
- **Z-index**: base 0 · dropdown 20 · sticky 30 · fixed 40 · modal 50 · toast 70 · skipLink 80.
- **Breakpoints**: sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536.

## Voice

`register:` plain, technical, Spanish (product copy stays Spanish; code/comments English).
`action vocabulary:` "Iniciar sesión" / "Iniciando sesión…", "Iniciar con Google", "Regístrate aquí" —
consistent through the flow. No buzzwords, no em-dashes in visible copy.
