export default function ExpenseTable({
  expenses,
  onEdit,
  onDelete,
  categoryColors = {}
}) {
  if (!expenses.length)
    return (
      <div
        className="card"
        style={{ padding: 48, textAlign: "center" }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: 16,
            background: "#EEF2FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            margin: "0 auto 14px"
          }}
        >
          💸
        </div>

        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#0F172A",
            marginBottom: 6
          }}
        >
          No expenses found
        </div>

        <div style={{ fontSize: 13, color: "#94A3B8" }}>
          Try adjusting your filters or add a new expense
        </div>
      </div>
    );

  return (
    <div className="card" style={{ overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                background: "#F8FAFC",
                borderBottom: "1px solid #E2E8F0"
              }}
            >
              {["Expense", "Category", "Date", "Amount", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      padding: "12px 20px",
                      textAlign: "left",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#94A3B8"
                    }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {expenses.map((exp, i) => {
              const color =
                categoryColors[exp.category] || "#6366F1";

              return (
                <tr
                  key={exp.id}
                  style={{
                    borderBottom:
                      i < expenses.length - 1
                        ? "1px solid #F8FAFC"
                        : "none",
                    transition: "background 0.12s"
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#F8FAFC")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  {/* Expense Title */}
                  <td style={{ padding: "14px 20px" }}>
                    <div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#0F172A"
                        }}
                      >
                        {exp.title}
                      </div>

                      {exp.notes && (
                        <div
                          style={{
                            fontSize: 12,
                            color: "#94A3B8",
                            marginTop: 2
                          }}
                        >
                          {exp.notes}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Category */}
                  <td style={{ padding: "14px 20px" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "4px 12px",
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 600,
                        background: color + "18",
                        color: color
                      }}
                    >
                      {exp.category}
                    </span>
                  </td>

                  {/* Date */}
                  <td
                    style={{
                      padding: "14px 20px",
                      fontSize: 13,
                      color: "#64748B",
                      fontWeight: 500
                    }}
                  >
                    {new Date(exp.date).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      }
                    )}
                  </td>

                  {/* Amount */}
                  <td style={{ padding: "14px 20px" }}>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#94A3B8",
                        marginBottom: 1
                      }}
                    >
                      PKR
                    </div>

                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#EF4444"
                      }}
                    >
                      {Number(exp.amount).toLocaleString()}
                    </div>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        onClick={() => onEdit(exp)}
                        className="btn btn-edit-ghost"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(exp.id)}
                        className="btn btn-danger-ghost"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "12px 20px",
          borderTop: "1px solid #F1F5F9",
          fontSize: 12,
          color: "#94A3B8",
          fontWeight: 500
        }}
      >
        Showing {expenses.length} transaction
        {expenses.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}