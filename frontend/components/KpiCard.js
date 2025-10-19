export default function KpiCard({ title, value, delta, good }) {
  return (
    <div className="card kpi">
      <h4>{title}</h4>
      <div className="val">{value}</div>
      {delta ? <div className={`delta ${good ? "good" : "bad"}`}>{delta}</div> : null}
    </div>
  );
}
