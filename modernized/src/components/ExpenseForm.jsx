import { useState, useEffect } from "react";

const CATEGORIES = [
  "Food",
  "Transport",
  "Utilities",
  "Shopping",
  "Health",
  "Education",
  "Entertainment",
  "Other"
];

const CATEGORY_COLORS = {
  "Food": "#F59E0B",
  "Transport": "#3B82F6",
  "Shopping": "#EC4899",
  "Health": "#10B981",
  "Utilities": "#8B5CF6",
  "Entertainment": "#EF4444",
  "Education": "#06B6D4",
  "Other": "#94A3B8",
};
const init = {
  title: "",
  amount: "",
  category: "Food",
  date: "",
  notes: ""
};

export default function ExpenseForm({
  onAdd,
  editData,
  onUpdate,
  onCancelEdit
}) {
  const [form, setForm] = useState(init);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState("");

  useEffect(() => {
    setForm(editData ? editData : init);
    setErrors({});
  }, [editData]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.amount || +form.amount <= 0)
      e.amount = "Enter a valid amount";
    if (!form.date) e.date = "Date is required";
    return e;
  };

  const handleChange = ({ target: { name, value } }) => {
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((e) => ({ ...e, [name]: "" }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const payload = {
      ...form,
      amount: Number(form.amount)
    };

    editData
      ? onUpdate(payload)
      : onAdd({ ...payload, id: Date.now() });

    setForm(init);
    setErrors({});
  };

  const inputClass = (name) =>
    `input${errors[name] ? " error" : ""}`;

  return (
    <>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 24
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            background: "#EEF2FF",
            fontWeight: 700
          }}
        >
          {editData ? "✏️" : "+"}
        </div>

        <div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#0F172A"
            }}
          >
            {editData ? "Edit Expense" : "Add New Expense"}
          </div>

          <div
            style={{
              fontSize: 13,
              color: "#94A3B8",
              marginTop: 2
            }}
          >
            {editData
              ? "Update the details below"
              : "Track your spending in seconds"}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14
          }}
        >
          {/* Title */}
          <div style={{ gridColumn: "1/-1" }}>
            <FieldLabel>Title *</FieldLabel>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              onFocus={() => setFocused("title")}
              onBlur={() => setFocused("")}
              placeholder="e.g. Dinner with friends"
              className={inputClass("title")}
              style={{ fontSize: 14 }}
            />
            <FieldError>{errors.title}</FieldError>
          </div>

          {/* Amount */}
          <div>
            <FieldLabel>Amount (PKR) *</FieldLabel>
            <input
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              placeholder="e.g. 2500"
              className={inputClass("amount")}
              style={{ fontSize: 14 }}
            />
            <FieldError>{errors.amount}</FieldError>
          </div>

          {/* Date */}
          <div>
            <FieldLabel>Date *</FieldLabel>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className={inputClass("date")}
              style={{ fontSize: 14 }}
            />
            <FieldError>{errors.date}</FieldError>
          </div>

          {/* Category */}
          <div style={{ gridColumn: "1/-1" }}>
            <FieldLabel>Category</FieldLabel>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 8,
                marginTop: 6
              }}
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() =>
                    setForm((f) => ({ ...f, category: cat }))
                  }
                  style={{
                    padding: "10px 8px",
                    borderRadius: 10,
                    border: `1.5px solid ${
                      form.category === cat
                        ? COLORS[cat]
                        : "#E2E8F0"
                    }`,
                    background:
                      form.category === cat
                        ? COLORS[cat] + "18"
                        : "#F8FAFC",
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 600,
                    color:
                      form.category === cat
                        ? COLORS[cat]
                        : "#64748B"
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div style={{ gridColumn: "1/-1" }}>
            <FieldLabel>
              Notes{" "}
              <span style={{ fontWeight: 400, color: "#94A3B8" }}>
                (optional)
              </span>
            </FieldLabel>

            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any extra details…"
              rows={3}
              className="input"
              style={{
                resize: "none",
                fontSize: 14
              }}
            />
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 22
          }}
        >
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              flex: 1,
              padding: "12px",
              fontSize: 15,
              fontWeight: 700
            }}
          >
            {editData ? "Save Changes" : "Add Expense"}
          </button>

          <button
            type="button"
            onClick={onCancelEdit}
            className="btn btn-ghost"
            style={{
              padding: "12px 20px",
              fontSize: 14
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

/* ===== Helpers ===== */

const FieldLabel = ({ children }) => (
  <label
    style={{
      display: "block",
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      marginBottom: 6,
      color: "#64748B"
    }}
  >
    {children}
  </label>
);

const FieldError = ({ children }) =>
  children ? (
    <p
      style={{
        fontSize: 12,
        color: "#EF4444",
        marginTop: 4
      }}
    >
      {children}
    </p>
  ) : null;