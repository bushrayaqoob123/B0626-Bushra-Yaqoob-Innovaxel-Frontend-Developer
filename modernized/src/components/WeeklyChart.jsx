import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

export default function WeeklyChart({ last7DaysData }) {
  const labels = last7DaysData.map((d) => d.label);
  const values = last7DaysData.map((d) => d.total);

  const hasData = values.some((v) => v > 0);

  const weekTotal = values.reduce((s, v) => s + v, 0);

  const activeDays = values.filter((v) => v > 0).length;

  const avgDaily = hasData
    ? Math.round(weekTotal / activeDays)
    : 0;

  const data = {
    labels,
    datasets: [
      {
        label: "Spent",
        data: values,
        fill: true,
        tension: 0.45,
        borderColor: "#6366F1",
        borderWidth: 2.5,

        pointBackgroundColor: values.map((v) =>
          v > 0 ? "#6366F1" : "transparent"
        ),
        pointBorderColor: values.map((v) =>
          v > 0 ? "#fff" : "transparent"
        ),
        pointRadius: values.map((v) => (v > 0 ? 5 : 0)),
        pointBorderWidth: 2,
        pointHoverRadius: 7,

        backgroundColor: (ctx) => {
          const g = ctx.chart.ctx.createLinearGradient(
            0,
            0,
            0,
            220
          );
          g.addColorStop(0, "rgba(99,102,241,0.18)");
          g.addColorStop(1, "rgba(99,102,241,0)");
          return g;
        }
      }
    ]
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false
    },

    plugins: {
      legend: { display: false },

      tooltip: {
        backgroundColor: "#0F172A",
        titleColor: "#94A3B8",
        bodyColor: "#fff",
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (c) =>
            ` PKR ${Number(c.raw).toLocaleString()}`
        }
      }
    },

    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: "#94A3B8",
          font: { size: 11 }
        }
      },

      y: {
        beginAtZero: true,
        grid: {
          color: "#F1F5F9",
          drawBorder: false
        },
        border: { display: false },
        ticks: {
          color: "#CBD5E1",
          font: { size: 10 },
          callback: (v) =>
            v >= 1000
              ? `${(v / 1000).toFixed(0)}k`
              : v
        }
      }
    }
  };

  return (
    <div className="card" style={{ padding: 24 }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 18
        }}
      >
        <div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#0F172A"
            }}
          >
            Last 7 Days
          </div>

          {hasData && (
            <div
              style={{
                fontSize: 12,
                color: "#94A3B8",
                marginTop: 3
              }}
            >
              PKR {weekTotal.toLocaleString()} this week · avg PKR{" "}
              {avgDaily.toLocaleString()}/active day
            </div>
          )}
        </div>

        {!hasData && (
          <span
            style={{
              fontSize: 11,
              padding: "4px 10px",
              borderRadius: 99,
              background: "#F1F5F9",
              color: "#94A3B8",
              fontWeight: 500
            }}
          >
            No activity
          </span>
        )}
      </div>

      {/* Chart */}
      <Line data={data} options={options} />
    </div>
  );
}