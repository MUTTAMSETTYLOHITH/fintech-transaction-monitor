export default function TxnFilters({ onChange }) {
  return (
    <div className="card" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr auto", gap: 12 }}>
      <select onChange={e => onChange?.({ type: e.target.value })} defaultValue="">
        <option value="">Type: All</option>
        <option value="card">Card</option>
        <option value="ach">ACH</option>
        <option value="wire">Wire</option>
      </select>
      <select onChange={e => onChange?.({ risk: e.target.value })} defaultValue="">
        <option value="">Risk: All</option>
        <option value="low">Low</option>
        <option value="med">Medium</option>
        <option value="high">High</option>
      </select>
      <select onChange={e => onChange?.({ status: e.target.value })} defaultValue="">
        <option value="">Status: All</option>
        <option value="ok">OK</option>
        <option value="held">Held</option>
        <option value="blocked">Blocked</option>
      </select>
      <input placeholder="Search PAN / Ref / Merchant" onChange={e => onChange?.({ q: e.target.value })} />
      <button
        style={{ border: "none", background: "#2563eb", color: "white", padding: "10px 14px", borderRadius: 10 }}
      >
        Export CSV
      </button>
    </div>
  );
}
