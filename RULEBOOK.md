# 📘 Centeric Portfolio — Project Rulebook

> Derived from architecture + design system
> **Every contributor and AI agent MUST follow every rule in this document.**

> [!CAUTION]
> **NON-NEGOTIABLE — ALWAYS USE SHARED UI COMPONENTS**
> Never build Button, Input, Modal, etc. from scratch.
> Always import from `@shared/ui/...`

---

## 1. Project Identity

| Item        | Value                                                  |
| ----------- | ------------------------------------------------------ |
| **Name**    | Centeric Portfolio                                     |
| **Type**    | Monorepo                                               |
| **Purpose** | Animated Portfolio / Resume Website                    |
| **Stack**   | React, TypeScript, Vite, Tailwind, Framer Motion, GSAP |
| **Focus**   | UI/UX + Animations + Storytelling                      |
| **Icons**   | Lucide React                                           |
| **Font**    | Inter                                                  |

---

## 2. Repository Structure

```
portfolio_app/
├── apps/web/src/
│   ├── common/        # Navbar, Footer, Cursor
│   ├── features/      # Feature loader (lightweight)
│   ├── layout/        # MainLayout, TransitionLayout
│   ├── animations/    # GSAP + Motion configs
│   ├── content/       # Parsed markdown JSON
│   ├── routes.tsx
│   └── main.tsx
│
├── modules/           # Portfolio sections
│   ├── hero/
│   ├── about/
│   ├── skills/
│   ├── projects/
│   ├── experience/
│   ├── contact/
│   └── resume/
│
├── content/           # Raw markdown files
│   ├── personal.md
│   ├── projects.md
│   ├── skills.md
│   └── experience.md
│
├── shared/
│   ├── ui/
│   ├── hooks/
│   ├── utils/
│   └── theme/
```

---

## 3. Module Rules

### Required Structure

```
modules/{section}/
├── assets/
├── common/
├── locales/
├── pages/
│   └── {PageName}/
├── content/
├── paths.ts
└── routes.tsx
```

### Rules

* Modules = portfolio sections
* No cross-module imports
* Use lazy loading
* Use shared UI only

---

## 4. Routing Rules

### Simplified Routing

| Route         | Section      |
| ------------- | ------------ |
| `/`           | Hero + About |
| `/projects`   | Projects     |
| `/experience` | Experience   |
| `/contact`    | Contact      |

### Rules

* No auth/private layouts
* Use smooth transitions
* Use animated routing

---

## 5. Component Rules

### MUST USE Shared Components

| Element | Component     |
| ------- | ------------- |
| Button  | `Button`      |
| Input   | `CustomInput` |
| Modal   | `CustomModal` |

---

### Portfolio-Specific Components

Use/create in `shared/ui/`:

* AnimatedCard
* GlassCard
* SectionWrapper
* MagneticButton

---

## 6. Theming & CSS Rules

### Strict Rules

* ❌ No hardcoded colors
* ❌ No inline styles
* ❌ No px values
* ✅ Use design tokens

### Tokens

* `bg-bg-inverse`
* `text-text-primary`
* `border-border-primary`

---

## 7. FMDS Fluid Scaling Rules

The project uses a **Fluid Multiplier Design System (FMDS)** where all sizing derives from `calc(var(--1) * N)`.

The `--1` base unit scales automatically per breakpoint:

| Breakpoint           | `--1`                  |
| -------------------- | ---------------------- |
| Desktop (≥1200 px)   | `min(1px, 0.052083vw)` |
| Tablet (768–1199 px) | `min(1px, 0.059435vw)` |
| Mobile (≤767 px)     | `min(1px, 0.2vw)`      |

### 7.1 — Use `s-N` Tailwind classes

Every spacing, sizing, font-size, border-radius, gap, and padding value must use the `s-N` scale:

```html
<!-- Correct -->
<div class="p-s-30 gap-s-16 rounded-s-20 text-s-16 h-s-50">
  <!-- Wrong — will not scale fluidly -->
  <div class="p-[30px] text-[16px] h-[50px]"></div>
</div>
```
<div class="p-s-30 text-s-16 rounded-s-20"></div>
```
### 7.2 — Standard size presets

| Element         | Class                           |
| --------------- | ------------------------------- |
| Card padding    | `p-s-30`                        |
| Section padding | `p-s-20`                        |
| Button height   | `h-s-50`                        |
| Button radius   | `rounded-s-28`                  |
| Card radius     | `rounded-s-20`                  |
| Element radius  | `rounded-s-15`                  |
| Small radius    | `rounded-s-10`                  |
| Standard gap    | `gap-s-16` to `gap-s-24`        |
| Margin bottom   | `mb-s-16`, `mb-s-20`, `mb-s-30` |

> [!TIP]
> If you need an exact pixel value and there is no matching `s-N` class, prefer `calc(var(--1) * N)` inside a CSS module or as a `style` value over using raw `px`. This keeps it responsive.

---
❌ `p-[30px]`
✅ `p-s-30`

---

## 8. State Management Rules

### Simplified

* Use React state
* Use Context / Zustand if needed
* ❌ No heavy Redux

---

## 9. Content System (IMPORTANT)

### Markdown Driven

```
.md → parser → JSON → UI
```

### Rules

* No hardcoded content
* All data from markdown

---

## 10. Internationalization Rules

### Optional but supported

* en / hi
* Use `t()`

---

## 11. Animation Rules (CORE 🔥)

### Mandatory

* Framer Motion
* GSAP ScrollTrigger

### Required Effects

* Page transitions
* Scroll reveal
* Hover effects
* Text animations
* Cursor animations

---

## 12. Code Quality Rules

* No hardcoded text
* No inline styles
* No cross-module imports
* Reusable components only
* Clean structure

---

## 13. Figma Implementation Rules

### Steps

1. Analyze design
2. Map to sections
3. Map to tokens
4. Build components
5. Add animations
6. Ensure responsiveness

---

## 14. Key Differences (IMPORTANT)

| Old (Exchange)  | New (Portfolio) |
| --------------- | --------------- |
| Tables          | Cards           |
| Data-heavy      | Visual-heavy    |
| Redux heavy     | Lightweight     |
| Feature flags   | Not needed      |
| Complex routing | Simple routing  |
| Business logic  | Storytelling    |

---

## 15. Final Goal

Build a portfolio that:

* Feels interactive
* Looks premium
* Has smooth animations
* Tells a story

---

## 🔥 Final Rule

> If it looks basic → it's wrong
> If it feels smooth, animated, and premium → it's correct

---

**Version**: 2.0
**Type**: Portfolio Rulebook
**Maintained By**: You 🚀
