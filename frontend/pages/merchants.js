import Layout from "../components/Layout";
import { Drawer, Toolbar, Tag, Sparkline } from "../components/Toolkit";

const M = ["Amazon","Mercury","Stripe","Square","DoorDash","Uber","BestBuy"].map((name,i)=>({
  id: 800+i,
  name,
  status: ["Active","Monitoring","Active","Active","Monitoring","Active","Active"][i%7],
  risk: ["LOW","MED","HIGH","LOW","MED","LOW","LOW"][i%7],
  volume:  (2.1 + i*0.37).toFixed(2) + "M",
  disputes: (1.2 + i*0.27).toFixed(2) + "%",
  spark: Array.from({length:16}).map((_,k)=>12 + Math.abs(Math.sin((i+1)*(k+1)*0.21))*18),
}));

export default function Merchants(){
  const [open,setOpen] = require("react").useState(false);
  const [row,setRow] = require("react").useState(null);

  return (
    <Layout title="Merchants">
      <Toolbar onReset={()=>location.reload()}>
        <select><option>Status: All</option><option>Active</option><option>Monitoring</option></select>
        <select><option>Risk: All</option><option>LOW</option><option>MED</option><option>HIGH</option></select>
      </Toolbar>

      <div className="grid" style={{gridTemplateColumns:"repeat(3, 1fr)"}}>
        {M.map(m=>(
          <div key={m.id} className="card" style={{cursor:"pointer"}} onClick={()=>{setRow(m); setOpen(true);}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontWeight:800}}>{m.name}</div>
              <Tag tone={m.risk==="HIGH"?"bad":m.risk==="MED"?"warn":"ok"}>{m.risk}</Tag>
            </div>
            <div className="legend" style={{marginTop:6}}>Status: {m.status}</div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:10}}>
              <div className="card kpi"><h4>Monthly Volume</h4><div className="val">{m.volume}</div></div>
              <div className="card kpi"><h4>Dispute Rate</h4><div className="val">{m.disputes}</div></div>
            </div>
            <div style={{marginTop:10}}>
              <Sparkline data={m.spark} />
            </div>
          </div>
        ))}
      </div>

      <Drawer open={open} onClose={()=>setOpen(false)} title={row? row.name : "Merchant"}>
        {row && (
          <>
            <div className="kpis" style={{marginBottom:12}}>
              <div className="card kpi"><h4>Risk</h4><div className="val">{row.risk}</div></div>
              <div className="card kpi"><h4>Status</h4><div className="val">{row.status}</div></div>
              <div className="card kpi"><h4>Monthly Volume</h4><div className="val">{row.volume}</div></div>
              <div className="card kpi"><h4>Dispute Rate</h4><div className="val">{row.disputes}</div></div>
            </div>
            <div className="card" style={{marginBottom:12}}>
              <div style={{fontWeight:700, marginBottom:6}}>Performance</div>
              <Sparkline data={row.spark} />
            </div>
            <div className="card">
              <div style={{fontWeight:700, marginBottom:6}}>Actions</div>
              <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
                <button style={{padding:"10px 14px", borderRadius:10, background:"#ef4444", color:"white", border:"none"}}>Pause Merchant</button>
                <button style={{padding:"10px 14px", borderRadius:10, background:"#2563eb", color:"white", border:"none"}}>Open Case</button>
                <button style={{padding:"10px 14px", borderRadius:10, background:"#374151", color:"#e5e7eb", border:"1px solid #4b5563"}}>Email Notice</button>
              </div>
            </div>
          </>
        )}
      </Drawer>
    </Layout>
  );
}
