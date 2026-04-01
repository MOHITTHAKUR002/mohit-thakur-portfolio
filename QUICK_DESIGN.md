# Quick Design Implementation Guide

## 🚀 Quick Usage

**Just paste this format:**
```
Figma: [your-figma-url]
Module: [module-name]
Page: [PageName] (optional)
```

**Example:**
```
Figma: https://www.figma.com/design/aole2hYWeBshJ7JoMuHZmR/An-Exchange--Copy-?node-id=274-41685
Module: orders
Page: OrderList
```

The AI will automatically:
- ✅ Fetch the Figma design
- ✅ Analyze components needed
- ✅ Generate complete implementation
- ✅ Follow all folder structure rules
- ✅ Use common components (CustomTable, Button, etc.)
- ✅ Set up translations (i18n)
- ✅ Configure routing
- ✅ Apply design system tokens

**That's it!** No need to copy-paste the full prompt every time.

---

## What Gets Generated

Following the exact structure of `modules/home`, the implementation will include:

### Folder Structure
```
modules/{module-name}/
├── assets/
├── common/          # If reusable components needed
├── locales/
│   ├── en.ts
│   └── hi.ts
├── pages/
│   └── {PageName}/
│       ├── {PageName}.tsx
│       └── locales/
│           ├── en.json
│           └── hi.json
├── paths.ts
└── routes.tsx
```

### Required Components
- ✅ `CustomTable` from `@shared/ui/CustomTable/CustomTable` (for tables)
- ✅ `Button` from `@shared/ui/Button/Button` (for all buttons)
- ✅ Other shared components as needed

### Styling
- Use design tokens: `bg-bg-inverse`, `text-text-primary`, `border-border-primary`
- Border radius: `rounded-[20px]` (cards), `rounded-[15px]` (elements), `rounded-[10px]` (buttons)
- Spacing: `p-[30px]`, `gap-4`, `mb-[16px]`

### Translations
- Module-level: `locales/en.ts` and `locales/hi.ts`
- Page-level: `pages/{PageName}/locales/en.json` and `hi.json`
- Use `useTranslation` hook with proper i18n setup

### Routing
- Define paths in `paths.ts`
- Define routes in `routes.tsx`
- Register in `apps/web/src/features/featureRegistry.ts`

---

## Reference

For detailed requirements, see: `DESIGN_PROMPT.md`

