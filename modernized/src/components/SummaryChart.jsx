import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PALETTE = [
  "#6366F1",
  "#10B981",
  "#EF4444",
  "#F59E0B",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4"
];

export default function SummaryChart({ expenses }) {
  if (!expenses.length)
    return (
      <div
        className="card"
        style={{
          padding: 24,
          minHeight: 300,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 12 }}>
          
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#64748B"
          }}
        >
          No data yet
        </div>
        <div
          style={{
            fontSize: 11.5,
            color: "#CBD5E1",
            marginTop: 4
          }}
        >
          Add expenses to see breakdown
        </div>
      </div>
    );

  const catMap = {};

  expenses.forEach((e) => {
    catMap[e.category] =
      (catMap[e.category] || 0) + e.amount;
  });

  const labels = Object.keys(catMap);
  const values = Object.values(catMap);
  const total = values.reduce((s, v) => s + v, 0);

  const centerPlugin = {
    id: "center",
    beforeDraw(chart) {
      const {
        ctx,
        chartArea: { top, bottom, left, right }
      } = chart;

      const cx = (left + right) / 2;
      const cy = (top + bottom) / 2;

      ctx.save();

      ctx.font = "bold 15px Inter,sans-serif";
      ctx.fillStyle = "#0F172A";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(
        `PKR ${total.toLocaleString()}`,
        cx,
        cy - 9
      );

      ctx.font = "11px Inter,sans-serif";
      ctx.fillStyle = "#94A3B8";

      ctx.fillText("total", cx, cy + 10);

      ctx.restore();
    }
  };

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: PALETTE.slice(0, labels.length),
        borderWidth: 3,
        borderColor: "#fff",
        hoverOffset: 8
      }
    ]
  };

  const opts = {
    cutout: "68%",
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#64748B",
          font: { size: 11 },
          boxWidth: 10,
          padding: 12
        }
      },
      tooltip: {
        callbacks: {
          label: (c) =>
            ` PKR ${c.raw.toLocaleString()} (${Math.round(
              (c.raw / total) * 100
            )}%)`
        }
      }
    }
  };

  // breakdown list (NO ICONS NOW)
  const sorted = labels
    .map((l, i) => ({
      label: l,
      value: values[i],
      color: PALETTE[i]
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="card" style={{ padding: 24 }}>
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "#0F172A",
          marginBottom: 20
        }}
      >
        Spending by Category
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          alignItems: "center"
        }}
      >
        {/* Chart */}
        <div>
          <Doughnut
            data={data}
            options={opts}
            plugins={[centerPlugin]}
          />
        </div>

        {/* List (NO ICONS) */}
        <div>
          {sorted.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10
              }}
            >
              {/* Left */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 99,
                    background: item.color
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    color: "#475569",
                    fontWeight: 500
                  }}
                >
                  {item.label}
                </span>
              </div>

              {/* Right */}
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#0F172A"
                  }}
                >
                  {Math.round(
                    (item.value / total) * 100
                  )}
                  %
                </div>

                <div
                  style={{
                    fontSize: 10,
                    color: "#94A3B8"
                  }}
                >
                  PKR {item.value.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}