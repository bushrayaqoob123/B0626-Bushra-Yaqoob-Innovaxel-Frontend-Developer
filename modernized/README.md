# 💰 Spendly — Personal Expense Tracker

A clean, modern personal finance dashboard built with **React + Vite + Tailwind CSS**.

---

## 🚀 Quick Start

### Prerequisites
- Node.js **v18+**
- npm **v9+**

### Installation

```bash
# 1. Clone or extract the project
cd "B0626 - Bushra Yaqoob - Innovaxel - Frontend Developer"

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## ✨ Features

| Feature | Details |
|---|---|
| ➕ Add Expense | Modal form with validation |
| ✏️ Edit Expense | Pre-filled modal |
| 🗑️ Delete Expense | Instant removal |
| 🔍 Filter | By category + date range |
| 📊 Charts | Doughnut (by category) + 7-day area trend |
| 💾 Persistence | localStorage — data survives refresh |
| ⚡ Performance | `useMemo` for filtered/sorted lists |
| 🎨 Animations | Fade-in page transitions, hover effects |

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── ExpenseForm.jsx      # Add/Edit modal form
│   ├── ExpenseTable.jsx     # Transactions table
│   ├── FilterBar.jsx        # Category + date filters
│   ├── SummaryCards.jsx     # KPI cards (total, categories, highest)
│   ├── SummaryChart.jsx     # Doughnut + Bar chart
│   └── WeeklyChart.jsx      # Last 7 days area/line chart
├── hooks/
│   └── useExpenses.js       # Custom hook — all expense logic
├── utils/
│   └── storage.js           # localStorage helpers
├── App.jsx                  # Root layout + routing state
├── main.jsx                 # React entry point
└── index.css                # Tailwind + custom animations
```

---

## 🛠️ Tech Stack

- **React 18** — UI library
- **Vite** — Build tool & dev server
- **Tailwind CSS** — Utility-first styling
- **Chart.js + react-chartjs-2** — Charts
- **localStorage** — Client-side persistence

---

## 📦 Key Engineering Decisions

- **Custom hook `useExpenses`** — separates all business logic from UI
- **`useMemo`** — filtered/sorted list only recomputes when dependencies change
- **Loading + Error states** — handled gracefully in the UI
- **Modal pattern** — single `ExpenseForm` reused for both add and edit

---

*Built by Bushra Yaqoob — Innovaxel Frontend Developer Assessment*
