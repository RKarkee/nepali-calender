# MISSION
Build a fully frontend-based **Nepali Bikram Sambat Calendar Web App** using React 19, Vite, TypeScript, and TailwindCSS. The app should display both BS and AD dates, show daily tithi/event/horoscope, and support monthly navigation using static JSON files. It must be cleanly modular, fully responsive, multi-lingual, and ready for future backend/API integration.

# CONTEXT
You are a **Senior Fullstack Engineer Agent** with expertise in React 19, Vite, Tailwind, TypeScript, and static site generation. Your goal is to build a modern, offline-ready Nepali Calendar app, similar to Hamro Patro, but with a clean modern frontend stack. You’ll use local `.json` files per BS month (like `2082/01.json`) as the data source and must follow a mobile-first responsive design. Use best practices in code structure, lazy loading, state management, and component reusability. All data is static and imported manually from Excel → JSON for now.

# REASONING
First, plan and scaffold the full app structure with routes, layout, components, and static file handling. Then incrementally implement core features like Month Grid, Sidebar Info, Date Conversion, and Theme support. Finally, optimize with lazy-loading and modular design. Think step-by-step, and generate code for each component in logical build phases.

# STEPS
applayout 
------------------------------------------------------------
| २०८२ वैशाख | Apr/May 2025                 🔄 [Lang] [Now] |
| [⬅️ Prev]  [Month Dropdown] [Year Dropdown]  [Next ➡️]    |
------------------------------------------------------------
| BS Calendar Grid (Month View)                          |
| - BS date center | AD date small | Event tooltip        |
| - Today = Highlight | Selected = Border                |
------------------------------------------------------------
| Sidebar (Right)                                        |
| - Selected Day Details (BS/AD, Tithi, Events, Horoscope) |
------------------------------------------------------------
| Below: Month-wide Events List (Scroll)                |
------------------------------------------------------------

1. **Phase 1: Project Initialization**
   - Scaffold a Vite + React 19 + TypeScript + TailwindCSS app
   - Add React Router v7, Day.js, React-i18next, npm -i nepali-date-converter(use this package:https://www.npmjs.com/package/nepali-date-converter) 
   - Setup folder structure as per provided blueprint
   - Create config files: `tailwind.config.ts`, `theme.json`, language files
   - Render basic layout with `Header`, `Sidebar`, and `Main Calendar Page`

2. **Phase 2: Calendar View**
   - Implement MonthView Grid using BS month JSON (e.g. `2082/01.json`)
   - Each day shows BS date, AD date, and highlights for today/event/holiday
   - Add tooltips using React Tooltip for events
   - Implement Month and Year dropdowns (2000–2100 BS)
   - Enable Prev/Next month navigation

3. **Phase 3: Sidebar Info Panel**
   - On date click, display:
     - Events
     - Tithi
     - Horoscope
   - Sidebar should auto-scroll and be fixed in desktop view, collapsible on mobile

4. **Phase 4: Interactivity + State**
   - Use React Context or Zustand to manage global state (selected date, lang)
   - Load month data dynamically via lazy-loading based on dropdown selection
   - Highlight current date with special border

5. **Phase 5: Theme + Multi-language**
   - Theme loaded from `theme.json`, injected into Tailwind via config
   - Add i18n support for English/Nepali toggle (using React-i18next)

6. **Phase 6: Optimization**
   - Implement lazy-loaded components using `React.lazy()` + `Suspense`
   - Add vite-plugin-compression for production builds
   - Cache month JSONs locally in memory or localStorage

7. **Phase 7: Sample Data + Testing**
   - Generate sample JSON for `2082/01.json`, `2082/02.json`
   - Add utility functions to validate BS↔AD conversion logic
   - Prepare test cases or mock event/tithi/horoscope data

# RESPONSE FORMAT

- Output **one phase at a time**, starting with **Phase 1**
- For each phase:
  - Explain structure briefly
  - Output **full code** for files created or modified in that phase
  - Use correct folder structure and include file paths
  - Include code comments for clarity
- End each phase with: ✅ Phase Complete — Ready to Proceed to Next Phase?

```

# SELF-CRITIQUE
1. Review the generated answer for what is good, what is missing and what can be improved.
2. Offer to revise the answer based on the critique.
