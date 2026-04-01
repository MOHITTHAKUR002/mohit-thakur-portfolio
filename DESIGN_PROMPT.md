# Design Implementation Prompt (Portfolio Version)

> **Quick Start**: Just provide Figma URL + Section Name (hero / projects / skills / etc.)

---

## Overview

Based on the Figma design:

Implement a **fully animated portfolio section/page** using the exact modular architecture.

⚡ Focus:

* Visual storytelling
* Smooth animations
* Clean UI/UX
* Markdown-driven content

---

## Folder Structure Requirements

Follow the same modular structure:

```
modules/{section-name}/
├── assets/
├── common/
│   └── {ComponentName}/
│       ├── {ComponentName}.tsx
│       └── index.ts
├── locales/
│   ├── en.ts
│   └── hi.ts
├── pages/
│   └── {PageName}/
│       ├── {PageName}.tsx
│       └── locales/
│           ├── en.json
│           └── hi.json
├── content/                 # 🔥 markdown mapping
├── paths.ts
└── routes.tsx
```

---

## Component Requirements (UPDATED)

### 1. ❌ Remove Table Dependency

Portfolio me **CustomTable NOT required**

### 2. ✅ Use Visual Components Instead

Use shared components:

* `AnimatedCard`
* `GlassCard`
* `SectionWrapper`
* `MagneticButton`

---

### 3. ✅ Button Component (MUST USE)

```typescript
import { Button } from '@shared/ui/Button/Button';

<Button
    label={t('button.cta')}
    variant="gradient"
    onClick={handleClick}
/>
```

---

### 4. ✅ Animation (MANDATORY 🔥)

Use:

* Framer Motion
* GSAP ScrollTrigger

**Example:**

```typescript
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
```

---

## Styling Requirements

### Design Tokens (Same System)

Use:

**Backgrounds**

* `bg-bg-inverse`
* `bg-bg-elevated`
* `bg-bg-muted`

**Text**

* `text-text-primary`
* `text-text-muted`
* `text-brand-primary`

**Borders**

* `border-border-primary`

**Radius**

* `rounded-[20px]`
* `rounded-[15px]`

---

## Section-Based UI Mapping

### 🔥 Hero Section

* Big heading
* Animated text reveal
* CTA button
* Background animation

---

### 🧑 About Section

* Short intro
* Image + text layout
* Fade animation

---

### ⚡ Skills Section

* Icons / progress bars
* Hover animations

---

### 🚀 Projects Section

* Card grid layout
* Hover effects
* Image preview

---

### 🧭 Experience Section

* Timeline layout
* Scroll animation

---

### 📩 Contact Section

* Form / social links
* Animated inputs

---

## Content System (IMPORTANT)

### Markdown Driven

Data load from `.md files`:

```typescript
import { parseMarkdown } from '@shared/utils/markdownParser';

const data = parseMarkdown('projects.md');
```

---

## Routing Requirements

```typescript
export const projectPaths = {
  main: "/projects"
};
```

```typescript
export const projectRoutes = [
  {
    path: projectPaths.main,
    element: <ProjectsPage />
  }
];
```

---

## Internationalization (i18n)

Same structure:

```json
{
  "title": "Projects",
  "button": {
    "cta": "View Project"
  }
}
```

---

## TypeScript Requirements

```typescript
interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
}
```

---

## Animation System

Create:

```
animations/
├── pageTransitions.ts
├── scrollAnimations.ts
├── textReveal.ts
```

---

## Implementation Checklist

* [ ] Folder structure created
* [ ] Markdown connected
* [ ] Animations added
* [ ] Components reusable
* [ ] Fully responsive
* [ ] No hardcoded text
* [ ] Smooth scrolling enabled
* [ ] Hover effects added

---

## Code Quality Rules

* No hardcoded text
* No inline styles
* Use Tailwind only
* Use animation everywhere (subtle but smooth)
* Keep components reusable

---

## Figma Design Mapping

Extract:

* Layout structure
* Section flow
* Typography
* Colors → map to tokens
* Spacing system
* Animation ideas

---

## Key Difference from Exchange

| Exchange       | Portfolio          |
| -------------- | ------------------ |
| Tables         | Cards              |
| Data-heavy     | Visual-heavy       |
| Complex UI     | Minimal + animated |
| Business logic | Storytelling       |

---

## Final Goal

Create a portfolio that feels like:

* Interactive experience
* Smooth & premium
* Visually impressive
* Animation-rich

---

## Final Instruction

Generate:

* Complete module code
* Components
* Animations
* Clean architecture

---

🔥 This should look like an **Awwwards-level portfolio website**
