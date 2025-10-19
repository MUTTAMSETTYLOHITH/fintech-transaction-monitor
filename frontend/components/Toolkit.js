export function Tag({ tone="default", children }) {
  const tones = {
    default:{bg:"#12233f", color:"#c7d2fe", b:"#1f2a44"},
    warn:{bg:"#2a1f07", color:"#fde68a", b:"#3a2b0d"},
    bad:{bg:"#2a0a0a", color:"#fecaca", b:"#3a0f0f"},
    ok:{bg:"#082314", color:"#bbf7d0", b:"#0f2f20"},
  }[tone] || {};
  return <span style={{background:tones.bg,color:tones.color,border:`1px solid ${tones.b}`,padding:"2px 8px",borderRadius:9999,fontSize:12}}>{children}</span>;
}

export function StatusPill({ status }) {
  const map = { ok:"#10b981", held:"#f59e0b", blocked:"#ef4444" };
  return <span style={{color:map[status]||"#9ca3af",fontWeight:700}}>{status.toUpperCase()}</span>;
}

export function Drawer({ open, onClose, title, children, width=520 }) {
  return (
    <div style={{position:"fixed", inset:0, pointerEvents:open?"auto":"none", zIndex:50}}>
      <div onClick={onClose} style={{position:"absolute", inset:0, background:"rgba(2,6,23,.6)", opacity:open?1:0, transition:"opacity .2s"}}/>
      <div style={{
        position:"absolute", top:0, right:0, bottom:0, width, transform:`translateX(${open?0:100}%)`,
        background:"linear-gradient(180deg,#0f172a,#0b1323)", borderLeft:"1px solid #172033",
        padding:18, transition:"transform .25s", overflow:"auto"
      }}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{fontWeight:800, fontSize:18}}>{title}</div>
          <button onClick={onClose} style={{background:"transparent",color:"#9ca3af",border:"1px solid #1f2937",borderRadius:10,padding:"6px 10px"}}>Close</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Toolbar({ onSearch, onReset, children }) {
  return (
    <div className="card" style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
      <input placeholder="Search…" onChange={e=>onSearch?.(e.target.value)} style={{flex:"1 1 240px"}}/>
      {children}
      <button onClick={onReset} style={{padding:"10px 14px",borderRadius:10,background:"#374151",color:"#e5e7eb",border:"1px solid #4b5563"}}>Reset</button>
    </div>
  );
}

export function Sparkline({ data, color="#22c55e" }) {
  // data: array of numbers (deterministic please)
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v,i)=>{
    const x = (i/(data.length-1))*100;
    const y = (1-(v-min)/(max-min||1))*100;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 100 30" style={{width:"100%",height:40}}>
      <polyline fill="none" stroke={color} strokeWidth="2" points={pts.replace(/(\d+),/g,(m,p)=>`${p},`)}/>
    </svg>
  );
}
