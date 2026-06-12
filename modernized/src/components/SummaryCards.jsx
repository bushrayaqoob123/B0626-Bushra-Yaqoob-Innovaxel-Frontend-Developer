const MONTH_NAMES = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

export default function SummaryCards({ expenses }) {
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  const cats = new Set(expenses.map(e => e.category)).size;

  const high = expenses.length
    ? expenses.reduce(
        (mx, e) => (e.amount > mx.amount ? e : mx),
        expenses[0]
      )
    : null;

  const now = new Date();

  const thisMonth = expenses
    .filter(e => {
      const d = new Date(e.date);
      return (
        d.getFullYear() === now.getFullYear() &&
        d.getMonth() === now.getMonth()
      );
    })
    .reduce((s, e) => s + e.amount, 0);

  const cards = [
    {
      label: "Total Spent",
      value: total.toLocaleString(),
      prefix: "PKR",
      sub: `${expenses.length} transactions`,
      accent: "#6366F1",
      bg: "#EEF2FF"
    },
    {
      label: `${MONTH_NAMES[now.getMonth()]} Spending`,
      value: thisMonth.toLocaleString(),
      prefix: "PKR",
      sub: "this month",
      accent: "#10B981",
      bg: "#ECFDF5"
    },
    {
      label: "Categories",
      value: cats,
      prefix: "",
      sub: "in use",
      accent: "#F59E0B",
      bg: "#FFFBEB"
    },
    {
      label: "Highest Expense",
      value: high ? high.amount.toLocaleString() : "—",
      prefix: high ? "PKR" : "",
      sub: high ? high.title : "No expenses yet",
      accent: "#EF4444",
      bg: "#FEF2F2"
    }
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 16
      }}
    >
      {cards.map((c) => (
        <div
          key={c.label}
          className="card"
          style={{ padding: "20px 22px" }}
        >
          {/* Label */}
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#94A3B8",
              marginBottom: 14
            }}
          >
            {c.label}
          </div>

          {/* Value */}
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: -0.5,
              lineHeight: 1
            }}
          >
            {c.prefix && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#94A3B8",
                  marginRight: 4
                }}
              >
                {c.prefix}
              </span>
            )}
            {c.value}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: c.accent,
              marginTop: 6
            }}
          >
            {c.sub}
          </div>
        </div>
      ))}
    </div>
  );
}