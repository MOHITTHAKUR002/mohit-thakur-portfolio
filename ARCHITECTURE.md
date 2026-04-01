# Centeric Portfolio Monorepo - Architecture Documentation

## Table of Contents

1. Project Overview
2. Architecture Pattern
3. Directory Structure
4. Technology Stack
5. Module System
6. Routing Architecture
7. Content System (Markdown आधारित)
8. Animation System
9. State Management
10. Build System
11. Development Workflow
12. Key Design Decisions

---

## Project Overview

**Centeric Portfolio Monorepo** ek modern, fully animated personal portfolio platform hai jo scalable monorepo architecture par based hai.

### Key Characteristics

* Monorepo structure (apps + modules + shared)
* Markdown-driven content system
* Fully animated UI (GSAP + Framer Motion)
* Modular feature-based architecture
* High-performance & responsive design
* Clean, scalable codebase

---

## Architecture Pattern

### Monorepo Architecture

Project teen main layers me divided hai:

* **apps/** → Application entry point
* **modules/** → Feature sections (portfolio sections)
* **shared/** → Reusable components & utilities

```
Monorepo Root
│
├── apps/        → Application layer
├── modules/     → Portfolio sections
├── shared/      → Shared UI & utilities
```

### Benefits

* Reusable components
* Clean structure
* Easy scaling
* Better maintainability

---

## Directory Structure

```
portfolio-monorepo/
├── apps/
│   └── web/
│       ├── src/
│       │   ├── common/
│       │   │   ├── navbar/
│       │   │   ├── footer/
│       │   │   └── cursor/
│       │   │
│       │   ├── features/
│       │   │   ├── featureRegistry.ts
│       │   │   ├── loadFeatureRoutes.ts
│       │   │   └── loadFeatureContent.ts
│       │   │
│       │   ├── layout/
│       │   │   ├── mainLayout/
│       │   │   └── transitionLayout/
│       │   │
│       │   ├── animations/
│       │   │   ├── pageTransitions.ts
│       │   │   ├── scrollAnimations.ts
│       │   │   └── cursorEffects.ts
│       │   │
│       │   ├── content/
│       │   │   ├── personal.json
│       │   │   ├── projects.json
│       │   │   ├── skills.json
│       │   │   └── experience.json
│       │   │
│       │   ├── main.tsx
│       │   └── routes.tsx
│       │
│       └── vite.config.ts
│
├── modules/
│   ├── hero/
│   ├── about/
│   ├── skills/
│   ├── projects/
│   ├── experience/
│   ├── contact/
│   ├── resume/
│   └── blog/
│
├── content/
│   ├── personal.md
│   ├── projects.md
│   ├── skills.md
│   └── experience.md
│
├── shared/
│   ├── ui/
│   │   ├── AnimatedCard/
│   │   ├── GlassCard/
│   │   ├── SectionWrapper/
│   │   └── MagneticButton/
│   │
│   ├── hooks/
│   │   ├── useScrollAnimation.ts
│   │   └── useCursor.ts
│   │
│   ├── utils/
│   │   ├── markdownParser.ts
│   │   └── animationHelpers.ts
│   │
│   ├── theme/
│   │   ├── ThemeProvider.tsx
│   │   └── animations.ts
│
├── package.json                     # Root package.json
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                  # Vite configuration
└── tailwind.config.js              # Tailwind CSS configuration
```

---

## Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | UI framework |
| **TypeScript** | 5.3.3 | Type safety |
| **Vite** | 5.0.0 | Build tool & dev server |
| **React Router** | 6.21.0 | Client-side routing |
| **Redux Toolkit** | 2.0.0 | State management |
| **RTK Query** | (included) | API data fetching |
| **i18next** | 25.8.4 | Internationalization |
| **Tailwind CSS** | 3.4.0 | Utility-first CSS |
| **Formik** | 2.4.9 | Form management |
| **Zod** | 3.22.0 | Schema validation |

### Development Tools

- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Sass**: CSS preprocessor
- **Lucide React**: Icon library


---

## Module System

### Modules (Portfolio Sections)

Har module ek section represent karta hai:

* hero → Landing section
* about → About me
* skills → Tech stack
* projects → Projects showcase
* experience → Timeline
* contact → Contact form
* resume → CV download
### Module Structure

Each module follows a **consistent structure**:

```
module-name/
├── pages/                    # Page components
│   └── PageName/
│       ├── PageName.tsx      # Main page component
│       └── locales/          # Page-specific translations
│           ├── en.json
│           └── hi.json
├── components/               # Module-specific components (optional)
├── common/                   # Module-specific common components (optional)
├── api/                      # API endpoints (optional)
│   └── moduleApi.ts
├── assets/                   # Module assets (images, icons)
├── locales/                  # Module-level translations
│   ├── en.ts
│   └── hi.ts
├── paths.ts                  # Route path constants
└── routes.tsx                # Module route definitions
```
---
### Module Example: `home` Module

```typescript
// modules/home/paths.ts
export const homePaths = {
  home: "/home",
  priceDetails: "/home/price-details/:symbol",
};

// modules/home/routes.tsx
export const homeRoutes: RouteObject[] = [
  {
    path: homePaths.home,
    element: <Home />
  },
  {
    path: homePaths.priceDetails,
    element: <PriceDetails />
  }
];
```
## Routing Architecture

Simple routing structure use kiya gaya hai:

```
/              → Home (Hero + About)
/projects      → Projects
/experience    → Experience
/contact       → Contact
```

### Features

* Smooth page transitions
* Lazy loading
* Animation-based navigation

---

## Content System (Markdown आधारित)

Portfolio ka content `.md files` se control hota hai.

### Content Flow

```
Markdown (.md)
   ↓
Parser
   ↓
JSON
   ↓
UI Render
```

### Files

* personal.md
* projects.md
* skills.md
* experience.md

### Benefit

* No code changes needed
* Easy updates
* Clean separation of content & UI

---

## Animation System

### Animation Types

* Page transitions (Framer Motion)
* Scroll animations (GSAP)
* Text reveal animations
* Hover & micro interactions
* Custom cursor animation

### Structure

```
animations/
├── pageTransitions.ts
├── scrollAnimations.ts
├── cursorEffects.ts
```

---

## State Management

Lightweight approach use kiya gaya hai:

* React Context OR Zustand
* No heavy Redux required

---

## Build System

### Vite Setup

* Fast development server
* Optimized production builds
* Path aliases supported

### Commands

```
npm run dev
npm run build
npm run preview
```

---
## Development Workflow

### Adding a New Module

1. **Create Module Structure**:
   ```bash
   modules/new-module/
   ├── pages/
   ├── locales/
   ├── paths.ts
   └── routes.tsx
   ```

2. **Define Routes**:
   ```typescript
   // modules/new-module/routes.tsx
   export const newModuleRoutes: RouteObject[] = [...];
   ```

3. **Register in Feature Registry**:
   ```typescript
   // apps/web/src/features/featureRegistry.ts
   {
     name: "newModule",
     enabled: true,
     routes: async () => (await import("@modules/new-module/routes")).newModuleRoutes,
     locales: (lang) => import(`@modules/new-module/locales/${lang}.ts`).then((m) => m.default),
   }
   ```

4. **Add Translations**:
   - Create `locales/en.ts` and `locales/hi.ts`
   - Add page-level translations in `pages/{Page}/locales/`

### Module Development Best Practices

- ✅ Keep modules **self-contained**
- ✅ Use **path constants** for navigation
- ✅ Follow **consistent naming** conventions
- ✅ Implement **lazy loading** for routes
- ✅ Add **TypeScript types** for all data structures
- ✅ Include **translations** for all user-facing text

---

## Key Design Decisions

### 1. Monorepo Architecture
**Decision**: Use monorepo instead of multi-repo  
**Rationale**: Better code sharing, atomic changes, consistent tooling

### 2. Feature-Based Modules
**Decision**: Organize by features, not by technical layers  
**Rationale**: Better encapsulation, easier to understand, scalable

### 3. Dynamic Route Loading
**Decision**: Load routes dynamically based on feature flags  
**Rationale**: Code splitting, lazy loading, feature toggling

### 4. Redux Toolkit + RTK Query
**Decision**: Use Redux Toolkit instead of Context API  
**Rationale**: Better for complex state, time-travel debugging, middleware support

### 5. i18next for Internationalization
**Decision**: Use i18next instead of simple translation files  
**Rationale**: Professional i18n solution, pluralization, interpolation

### 6. TypeScript Path Aliases
**Decision**: Use path aliases (`@modules`, `@shared`)  
**Rationale**: Cleaner imports, easier refactoring, better IDE support

### 7. Feature Flags
**Decision**: Implement feature flag system  
**Rationale**: Gradual rollouts, A/B testing, emergency disable

---


## Development Workflow

### New Section Add Karna

1. modules/ me new folder banao
2. routes define karo
3. markdown file add karo
4. UI component connect karo

---

## Key Design Decisions

### 1. Monorepo

Better structure & scalability

### 2. Markdown-driven Content

Easy content management

### 3. Animation-first Approach

Modern UI/UX focus

### 4. Lightweight State

Avoid unnecessary complexity

### 5. Modular Structure

Clean & reusable architecture

---

## Conclusion

Ye architecture ek **modern, scalable aur highly animated portfolio system** provide karta hai jo:

* Fast hai
* Clean hai
* Easy to maintain hai
* Visually impressive hai

---

**Version**: 2.0
**Type**: Portfolio Architecture
**Maintained By**: You 🚀
