# AI Rules for Project Development

This document outlines the core technologies and specific library usage guidelines for this project. Adhering to these rules ensures consistency, maintainability, and leverages the strengths of the chosen tech stack.

## Tech Stack Overview

*   **Frontend Framework:** React (with TypeScript)
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **UI Components:** shadcn/ui (built on Radix UI)
*   **Routing:** React Router DOM
*   **Icons:** Lucide React
*   **Data Fetching & State Management:** React Query
*   **Form Management:** React Hook Form with Zod for validation
*   **Toast Notifications:** Sonner and custom `useToast` (Radix UI based)
*   **Utility Functions:** `clsx` and `tailwind-merge` for CSS class manipulation
*   **Date Handling:** `date-fns` and `react-day-picker`

## Library Usage Rules

1.  **UI Components:**
    *   Always prioritize `shadcn/ui` components for building the user interface.
    *   If a specific `shadcn/ui` component is not available or requires significant customization, create a new component in `src/components/` using Radix UI primitives and Tailwind CSS.
    *   **Do NOT** modify any files within `src/components/ui/` as these are prebuilt `shadcn/ui` components.

2.  **Styling:**
    *   All styling **MUST** be done using Tailwind CSS classes. Avoid inline styles or separate CSS files unless absolutely necessary for global styles (e.g., `src/index.css`).
    *   Ensure designs are responsive by utilizing Tailwind's responsive utility classes.

3.  **Icons:**
    *   Use icons from the `lucide-react` library.

4.  **Routing:**
    *   `react-router-dom` is the designated library for all client-side routing.
    *   All main application routes should be defined within `src/App.tsx`.

5.  **Data Fetching & State Management:**
    *   `@tanstack/react-query` should be used for managing server state, data fetching, caching, and synchronization.

6.  **Forms:**
    *   For form handling, use `react-hook-form`.
    *   For schema-based form validation, use `zod` in conjunction with `@hookform/resolvers`.

7.  **Toast Notifications:**
    *   Use `sonner` for general, non-intrusive notifications.
    *   Use the custom `useToast` hook (which leverages `@radix-ui/react-toast`) for more interactive or critical toasts, such as validation errors or success messages related to user actions.

8.  **Utility Functions:**
    *   `clsx` and `tailwind-merge` are available in `src/lib/utils.ts` and should be used for conditionally applying and merging Tailwind CSS classes.

9.  **File Structure:**
    *   New pages should be created in `src/pages/`.
    *   New reusable components should be created in `src/components/`.
    *   New custom React hooks should be created in `src/hooks/`.
    *   General utility functions should be placed in `src/lib/`.