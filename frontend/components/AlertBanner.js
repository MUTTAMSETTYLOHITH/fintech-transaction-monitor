export default function AlertBanner({ level="info", text }) {
  const color = level === "critical" ? "#ef4444" : level === "high" ? "#f59e0b" : "#3b82f6";
  return (
    <div className="card" style={{borderColor: color}}>
      <div style={{display:"flex", gap:10, alignItems:"center"}}>
        <div style={{width:10, height:10, borderRadius:9999, background:color}} />
        <div style={{fontWeight:700}}>{text}</div>
      </div>
    </div>
  );
}
