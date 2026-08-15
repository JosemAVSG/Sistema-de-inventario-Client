# Split Login Page — feature spec

Binds to `.ulpi/design/DESIGN.md` (locked identity). Every screen must read as the same product if
placed side by side.

## Problem

The login is a single centered card on a dark gradient. Add a split layout: **hero panel left, login
form right**, keeping ALL existing auth behavior byte-identical.

## Design Read (from DESIGN.md)

Control-room calm: dark slate surfaces, one sky signal, nothing decorative. Signature = barcode stock panel.

## Primary journey

1. User lands on `/login` (or is redirected after session expiry).
2. Split view: left hero (brand + stock panel), right form.
3. User signs in with email/password OR Google (both preserved).
4. Success → `navigation("/home")`. OAuth → `/auth/google/success` → verify → `/home`.

## States (all preserved, not re-invented)

- **idle** — form ready, button "Iniciar Sesión"
- **submitting** — button disabled, label "Iniciando sesión…" (add `disabled` + loading text to the
  submit Button; keep the existing `handleSubmit` flow)
- **error (email/password)** — `loginError` array rendered in the existing red banner; auto-clears after
  8s via existing `signinFailure([])` effect
- **error (google)** — `google_error=1` search param renders "No se pudo iniciar sesión con Google.
  Intenta de nuevo." merged with `loginError` (existing `errorMessages` logic)
- **success** — `isAuthenticated` → `navigation("/home")`

## Edge cases

- Direct navigation / refresh on `/login` — fine (client route, vercel.json rewrite handles it).
- OAuth callback flow unchanged (`GoogleCallbackPage` untouched).
- Back button after login — existing ProtectedRoutes behavior, unchanged.
- Mobile: hero hidden or stacked above form (see responsive).

## Layout (component spec)

### Container
`min-h-screen w-full` + dark background. On `lg+`: two-column grid (`lg:grid-cols-2`). Below `lg`:
single column — hero becomes a compact brand header above the form (hide the stock panel).

### Left hero panel (lg+ only, `hidden lg:flex`)
- Background: `secondary-900` with the existing soft radial blobs (kept from current page) — restrained.
- Content, top-aligned:
  - Logo mark: existing 16x16 gradient box (`from-primary-500 to-primary-700 rounded-2xl`) + `faSignInAlt` icon
  - Brand: "InventarioPro" (display, white)
  - One-line muted subtitle (existing copy: "Inicia sesión en tu cuenta" or better "Control total de tu inventario")
- **Signature — barcode stock panel** (mid-left, `max-w-sm`):
  - A ruled panel on `surface` (`secondary-800`, `rounded-xl`, hairline border `white/10`)
  - Three ruled rows, data-like: `Productos` / `Proveedores` / `Ventas y compras` with a subtle sky accent
    tick on the first row (domain-specific, no fake numbers, no buzzwords)
  - A barcode glyph (`faBarcode` from `@fortawesome/free-solid-svg-icons`) as the panel footer —
    this is the Signature
- Footer small print: `© 2024 InventarioPro. Todos los derechos reservados.` (moved from current footer)

### Right form panel
- Vertically centered card: `w-full max-w-md`, `bg-secondary-800/70 backdrop-blur` `rounded-xl`,
  `border border-white/10`, `p-10`, `shadow-card`
- Heading: "Inicia sesión" (h2, display white) + muted sub (existing "Inicia sesión en tu cuenta")
- Existing form fields UNCHANGED (react-hook-form `register`, validation, error text):
  - Email input (icon `faEnvelope`, `input-field !pl-10`)
  - Password input (icon `faLock`, `input-field !pl-10 !pr-10`) **with the existing show/hide eye toggle
    (`faEye`/`faEyeSlash`) — DO NOT remove**
  - Error banners (existing red `bg-red-500/20` style), both `loginError` + `google_error`
  - Submit `Button` (primary): "Iniciar Sesión" + `faSignInAlt`; add `disabled` while submitting
  - Divider "o" (existing)
  - Google button (existing inline SVG + "Iniciar con Google") — `window.location.href =
    ${import.meta.env.VITE_API_URL}/auth/google` — UNCHANGED
  - Register link: "¿No tienes una cuenta? Regístrate aquí" (existing `Link to="/register"`)

## Responsive

- `lg+`: grid 2 cols — hero left, form right.
- `<lg`: single column, hero collapses to compact brand header (logo + wordmark + one-liner), stock
  panel hidden (`hidden lg:block` on the panel).

## Accessibility

- Contrast ratios from DESIGN.md (all AA).
- Visible focus: existing `.input-field:focus` ring (`rgba(14,165,233,0.5)`) — keep.
- Eye toggle: `type="button"`, `aria-label` toggling "Mostrar contraseña"/"Ocultar contraseña" — keep.
- Google button: `type="button"` (does not submit form) — keep.
- Keyboard: full path is native inputs + buttons; visible focus preserved.
- Touch targets ≥ 44px on interactive elements.
- `prefers-reduced-motion`: page-load reveal is a simple fade (300ms) — honor by disabling animation.

## Files

- MODIFY `src/components/pages/LoginPage.jsx` — new split layout + hero; ALL auth logic, hooks, imports
  for redux/react-hook-form/router, and the two existing effects MUST be preserved exactly
- No new files required (hero is inline in LoginPage; if it grows > 80 lines, extract
  `src/components/molecules/LoginHero.jsx` — acceptable either way)
- Do NOT touch `routes.jsx`, `GoogleCallbackPage.jsx`, redux, services, or the backend

## Constraints

- Preserve byte-identical auth behavior: `signinUser(data)` dispatch, `loginError` 8s clear,
  `google_error` merge, `isAuthenticated` → `/home`, Google top-level redirect.
- Do NOT change icons family (FontAwesome free-solid only — `faBarcode`, `faEye`, `faEyeSlash`,
  `faEnvelope`, `faLock`, `faSignInAlt` all exist there).
- No new npm dependencies.
- UI copy in neutral professional Spanish; code/comments in English.
- Use only locked tokens from DESIGN.md (Tailwind classes from the existing @theme).

## Acceptance criteria (build)

1. `/login` renders split on desktop (hero left, form right), single column on mobile.
2. Email/password login works identically (dispatch + error banner + redirect).
3. Google button navigates to `${import.meta.env.VITE_API_URL}/auth/google` (top-level).
4. Eye toggle works; aria-labels correct.
5. `google_error=1` banner shows; `loginError` banners show and auto-clear.
6. Build passes (`npm run build`) and no new lint errors introduced.

## Build handoff

Target agent: `general` (react-vite-tailwind-engineer unavailable in this environment).
Design system: bespoke Tailwind v4 `@theme` (src/index.css) — theme with our locked tokens; do NOT
redesign or re-implement components. Implement exactly this spec; do NOT redesign.
