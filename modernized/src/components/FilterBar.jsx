const CATEGORIES = [
  "All",
  "Food",
  "Transport",
  "Utilities",
  "Shopping",
  "Health",
  "Education",
  "Entertainment",
  "Other"
];

export default function FilterBar({
  filterCategory,
  setFilterCategory,
  filterDate,
  setFilterDate
}) {
  const hasFilter =
    filterCategory !== "All" ||
    filterDate.from ||
    filterDate.to;

  const clear = () => {
    setFilterCategory("All");
    setFilterDate({ from: "", to: "" });
  };

  const inputSt = {
    padding: "8px 12px",
    borderRadius: 10,
    border: "1.5px solid #E2E8F0",
    background: "#F8FAFC",
    color: "#0F172A",
    fontSize: 13,
    outline: "none",
    fontFamily: "inherit"
  };

  return (
    <div
      className="card"
      style={{ padding: "16px 20px", marginBottom: 16 }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "flex-end"
        }}
      >
        {/* Category */}
        <div>
          <Label>Category</Label>
          <select
            value={filterCategory}
            onChange={(e) =>
              setFilterCategory(e.target.value)
            }
            style={inputSt}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* From Date */}
        <div>
          <Label>From</Label>
          <input
            type="date"
            value={filterDate.from}
            onChange={(e) =>
              setFilterDate((d) => ({
                ...d,
                from: e.target.value
              }))
            }
            style={inputSt}
          />
        </div>

        {/* To Date */}
        <div>
          <Label>To</Label>
          <input
            type="date"
            value={filterDate.to}
            onChange={(e) =>
              setFilterDate((d) => ({
                ...d,
                to: e.target.value
              }))
            }
            style={inputSt}
          />
        </div>

        {/* Clear Button (NO ICON NOW) */}
        {hasFilter && (
          <button
            onClick={clear}
            className="btn btn-danger-ghost"
            style={{ padding: "9px 14px" }}
          >
            Clear Filters
          </button>
        )}

        {/* Active Filters Chips */}
        {hasFilter && (
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              marginLeft: "auto",
              alignSelf: "center"
            }}
          >
            {filterCategory !== "All" && (
              <Chip color="#6366F1">
                {filterCategory}
              </Chip>
            )}

            {filterDate.from && (
              <Chip color="#10B981">
                From {filterDate.from}
              </Chip>
            )}

            {filterDate.to && (
              <Chip color="#10B981">
                To {filterDate.to}
              </Chip>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ===== Helpers ===== */

const Label = ({ children }) => (
  <div
    style={{
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "#94A3B8",
      marginBottom: 6
    }}
  >
    {children}
  </div>
);

const Chip = ({ children, color }) => (
  <span
    style={{
      padding: "4px 10px",
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 600,
      background: color + "18",
      color
    }}
  >
    {children}
  </span>
);