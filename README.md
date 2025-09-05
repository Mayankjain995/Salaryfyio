## Salaryfy App — Salary Breakdown, Tax Info, and Financial Education

A modern React application that helps users understand their salary structure, estimate taxes, and learn foundational personal finance concepts. The app features an interactive salary breakdown, tax regime comparison, and bite-sized education content, all styled with Tailwind and built for speed with Vite.

![Home / Overview](screenshots/Screenshot%202025-09-05%20153437.png)

### Key Features
- **Salary breakdown**: Enter components like basic, HRA, special allowance, PF, and professional tax to see gross and net salary.
- **Visual insights**: Clean, responsive visual bar to understand component proportions.
- **Tax info**: Compare old vs new tax regimes with slabs, cess, and effective tax rate based on your inputs.
- **Financial education**: Curated tips and explanations to build financial literacy.
- **Dark mode**: Persisted preference with smooth theming.

---

## Tech Stack
- **React 18**
- **Vite** for fast dev/build
- **Tailwind CSS** for styling
- **lucide-react** icons

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm installed

### Install Dependencies
```bash
npm install
```

### Run in Development
This project uses Vite. If you don’t have scripts set up, you can run Vite directly:
```bash
npx vite
```
Then open the printed local URL (commonly `http://localhost:5173`).

Alternatively, if you prefer npm scripts, add these to `package.json` and use them:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```
Then run:
```bash
npm run dev
```

### Build for Production
```bash
npx vite build
```
The production build will be emitted to the `dist` directory.

### Preview a Production Build
```bash
npx vite preview
```

---

## App Structure (High-Level)
- `src/App.jsx`: App layout, navigation between pages, and dark mode handling
- `src/pages/SalaryBreakdownPage.jsx`: Inputs for salary components and computed breakdown
- `src/pages/TaxInfoPage.jsx`: Regime toggle, slabs, liability, and effective tax rate
- `src/pages/EducationPage.jsx`: Financial education content and quick tools
- `src/components/*`: Reusable UI (e.g., `NavBar`, `Footer`, `SIPCalculator`)
- `src/utils/tax.js`: Tax helpers (where applicable)

---

## Screenshots

### Salary Breakdown
![Salary Breakdown](screenshots/Screenshot%202025-09-05%20154454.png)

### Tax Information
![Tax Info](screenshots/Screenshot%202025-09-05%20154220.png)

### Education
![Education](screenshots/Screenshot%202025-09-05%20154357.png)

### Navigation
![Navigation](screenshots/Screenshot%202025-09-05%20154205.png)

---

## Notes
- If your environment shows CRA (`react-scripts`) commands, prefer the Vite commands above or update your `scripts` to use Vite for a consistent developer experience.
