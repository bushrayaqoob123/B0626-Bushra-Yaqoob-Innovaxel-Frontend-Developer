import { useState } from "react";
import { useExpenses } from "./hooks/useExpenses";
import ExpenseForm    from "./components/ExpenseForm";
import ExpenseTable   from "./components/ExpenseTable";
import SummaryCards   from "./components/SummaryCards";
import SummaryChart   from "./components/SummaryChart";
import WeeklyChart    from "./components/WeeklyChart";
import FilterBar      from "./components/FilterBar";

const NAV = [
  { id: "dashboard",    icon: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>), label: "Dashboard" },
  { id: "transactions", icon: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
      <rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/>
      <line x1="9" y1="16" x2="13" y2="16"/>
    </svg>), label: "Transactions" },
  { id: "statistics",   icon: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>), label: "Statistics" },
];

const CATEGORY_COLORS = {
  Food: "#F59E0B", Transport: "#3B82F6", Shopping: "#EC4899",
  Health: "#10B981", Utilities: "#8B5CF6", Entertainment: "#EF4444",
  Education: "#06B6D4", Other: "#94A3B8",
};

const CATEGORY_ICONS = {
  Food: "",
  Transport: "",
  Shopping: "",
  Health: "",
  Utilities: "",
  Entertainment: "",
  Education: "",
  Other: "",
};

export default function App() {
  const [editData,       setEditData]       = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDate,     setFilterDate]     = useState({ from: "", to: "" });
  const [activePage,     setActivePage]     = useState("dashboard");
  const [showModal,      setShowModal]      = useState(false);

  const {
    expenses, filteredExpenses, last7DaysData,
    loading, error, addExpense, updateExpense, deleteExpense,
  } = useExpenses(filterCategory, filterDate);

  const closeModal = () => { setShowModal(false); setEditData(null); };
  const handleAdd    = (e) => { addExpense(e);               closeModal(); };
  const handleEdit   = (e) => { setEditData(e);              setShowModal(true); };
  const handleUpdate = (u) => { updateExpense(editData.id, u); closeModal(); };

  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const today = new Date().toLocaleDateString("en-US", { weekday:"long", month:"short", day:"numeric" });

  if (loading) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#F8FAFC" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ width:44, height:44, border:"3px solid #EEF2FF", borderTop:"3px solid #6366F1",
          borderRadius:"50%", animation:"spin 0.8s linear infinite", margin:"0 auto 12px" }} />
        <p style={{ color:"#94A3B8", fontSize:13, fontWeight:500 }}>Loading expenses…</p>
      </div>
    </div>
  );

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#F8FAFC" }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: 240, position:"fixed", height:"100vh", display:"flex", flexDirection:"column",
        background:"#fff", borderRight:"1px solid #E2E8F0", padding:"24px 16px",
      }}>
        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:32, padding:"0 6px" }}>
          <div style={{
            width:36, height:36, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center",
            background:"linear-gradient(135deg,#6366F1,#8B5CF6)", color:"#fff", fontWeight:800, fontSize:16,
          }}>S</div>
          <div>
            <div style={{ fontWeight:700, fontSize:15, color:"#0F172A", letterSpacing:-0.3 }}>Spendly</div>
            <div style={{ fontSize:11, color:"#94A3B8", fontWeight:500 }}>Personal Finance</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ display:"flex", flexDirection:"column", gap:2 }}>
          {NAV.map(item => (
            <button key={item.id} onClick={() => setActivePage(item.id)}
              className={`nav-item${activePage === item.id ? " active" : ""}`}
              style={{ color: activePage === item.id ? "#6366F1" : "#64748B" }}>
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Total Spent widget */}
        <div style={{
          marginTop:"auto", padding:"18px 16px", borderRadius:14,
          background:"linear-gradient(135deg,#6366F1 0%,#8B5CF6 100%)",
        }}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", color:"#C7D2FE", textTransform:"uppercase", marginBottom:6 }}>
            Total Spent
          </div>
          <div style={{ fontSize:22, fontWeight:800, color:"#fff", letterSpacing:-0.5 }}>
            <span style={{ fontSize:12, fontWeight:600, color:"#A5B4FC", marginRight:4 }}>PKR</span>
            {total.toLocaleString()}
          </div>
          <div style={{ fontSize:11, color:"#A5B4FC", marginTop:4, fontWeight:500 }}>
            {expenses.length} transactions recorded
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main style={{ marginLeft:240, flex:1, padding:"28px 32px", maxWidth:"calc(100vw - 240px)" }}>

        {/* Top bar */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28 }}>
          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", color:"#6366F1", textTransform:"uppercase", marginBottom:4 }}>
              {today}
            </div>
            <h1 style={{ fontSize:22, fontWeight:800, color:"#0F172A", letterSpacing:-0.5 }}>
              {{ dashboard:"Dashboard", transactions:"Transactions", statistics:"Statistics" }[activePage]}
            </h1>
          </div>
          <button className="btn btn-primary" onClick={() => { setEditData(null); setShowModal(true); }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Expense
          </button>
        </div>

        {/* Error banner */}
        {error && (
          <div className="fade-up" style={{
            marginBottom:20, padding:"12px 16px", borderRadius:12, display:"flex",
            alignItems:"center", gap:10, background:"#FEF2F2", border:"1px solid #FECACA",
          }}>
            <svg width="16" height="16" fill="#EF4444" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
            <span style={{ fontSize:13, color:"#EF4444", fontWeight:500 }}>{error}</span>
            <button onClick={() => window.location.reload()} className="btn btn-danger-ghost" style={{ marginLeft:"auto" }}>Retry</button>
          </div>
        )}

        {/* Dashboard */}
        {activePage === "dashboard" && (
          <div className="fade-up">
            <SummaryCards expenses={expenses} />
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginTop:20 }}>
              <WeeklyChart last7DaysData={last7DaysData} />
              <SummaryChart expenses={expenses} />
            </div>
            {/* Recent Transactions */}
            <div className="card" style={{ marginTop:20, padding:24 }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
                <div style={{ fontSize:13, fontWeight:700, color:"#0F172A", letterSpacing:-0.2 }}>Recent Transactions</div>
                {expenses.length > 0 && (
                  <button onClick={() => setActivePage("transactions")}
                    style={{ fontSize:12, fontWeight:600, color:"#6366F1", background:"none", border:"none", cursor:"pointer" }}>
                    View all →
                  </button>
                )}
              </div>
              {expenses.length === 0 ? (
                <EmptyState onAdd={() => setShowModal(true)} />
              ) : (
                <div>
                  {expenses.slice(0, 5).map((e, i) => (
                    <div key={e.id} style={{
                      display:"flex", alignItems:"center", justifyContent:"space-between",
                      padding:"12px 0", borderBottom: i < 4 ? "1px solid #F1F5F9" : "none",
                    }}>
                      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                        <div style={{
                          width:40, height:40, borderRadius:12, display:"flex", alignItems:"center",
                          justifyContent:"center", fontSize:18, background:"#F8FAFC",
                          border:"1px solid #F1F5F9",
                        }}>{CATEGORY_ICONS[e.category]}</div>
                        <div>
                          <div style={{ fontSize:13.5, fontWeight:600, color:"#0F172A" }}>{e.title}</div>
                          <div style={{ fontSize:11.5, color:"#94A3B8", marginTop:2 }}>
                            <span style={{
                              display:"inline-block", padding:"1px 8px", borderRadius:99,
                              background: CATEGORY_COLORS[e.category] + "18",
                              color: CATEGORY_COLORS[e.category], fontWeight:600, fontSize:10.5, marginRight:6
                            }}>{e.category}</span>
                            {e.date}
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign:"right" }}>
                        <div style={{ fontSize:11, color:"#94A3B8" }}>PKR</div>
                        <div style={{ fontSize:14, fontWeight:700, color:"#EF4444" }}>{e.amount.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Transactions */}
        {activePage === "transactions" && (
          <div className="fade-up">
            <FilterBar filterCategory={filterCategory} setFilterCategory={setFilterCategory}
              filterDate={filterDate} setFilterDate={setFilterDate} />
            <ExpenseTable expenses={filteredExpenses} onEdit={handleEdit} onDelete={deleteExpense}
              categoryColors={CATEGORY_COLORS} categoryIcons={CATEGORY_ICONS} />
          </div>
        )}

        {/* Statistics */}
        {activePage === "statistics" && (
          <div className="fade-up">
            <SummaryCards expenses={expenses} />
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginTop:20 }}>
              <WeeklyChart last7DaysData={last7DaysData} />
              <SummaryChart expenses={expenses} />
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="overlay scale-in" onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
          <div style={{
            width:"100%", maxWidth:520, background:"#fff", borderRadius:20,
            padding:"32px", boxShadow:"0 24px 80px rgba(15,23,42,0.2)",
            border:"1px solid #E2E8F0", position:"relative",
          }}>
            <button onClick={closeModal} style={{
              position:"absolute", top:20, right:20, width:32, height:32,
              borderRadius:8, background:"#F1F5F9", border:"none", cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center",
              color:"#64748B", fontSize:18, fontWeight:600,
            }}>×</button>
            <ExpenseForm onAdd={handleAdd} editData={editData}
              onUpdate={handleUpdate} onCancelEdit={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyState({ onAdd }) {
  return (
    <div style={{ textAlign:"center", padding:"40px 20px" }}>
      <div style={{
        width:64, height:64, borderRadius:16, background:"#EEF2FF",
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:28, margin:"0 auto 14px",
      }}></div>
      <div style={{ fontSize:14, fontWeight:600, color:"#0F172A", marginBottom:6 }}>No transactions yet</div>
      <div style={{ fontSize:12.5, color:"#94A3B8", marginBottom:18 }}>Add your first expense to get started</div>
      <button className="btn btn-primary" onClick={onAdd}>
        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Add First Expense
      </button>
    </div>
  );
}
