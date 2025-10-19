import Layout from "../components/Layout";

export default function Recommendations() {
  return (
    <Layout title="AI Recommendations">
      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 10 }}>GPT Strategy Notes</div>
        <p style={{ color: "var(--muted)" }}>
          Press the button to generate narrative… (wire to FastAPI later)
        </p>
        <button
          style={{ padding: "10px 14px", borderRadius: 10, background: "#2563eb", color: "white", border: "none" }}
        >
          Generate Report
        </button>
      </div>
    </Layout>
  );
}
