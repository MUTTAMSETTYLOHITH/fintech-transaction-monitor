import Layout from "../components/Layout";
import { Drawer, Toolbar, Tag } from "../components/Toolkit";
import EliteGrid from "../components/EliteGrid";
import { Heatmap } from "../sections/HeatmapAnoms";
import { useState } from "react";

const SIGS = [
  { id:"A-102", name:"Velocity — Card swipes", descr:"> 8 per 5m per PAN", sev:"high" },
  { id:"A-245", name:"ACH return rate", descr:">= 3% per 15m", sev:"med" },
  { id:"A-331", name:"Wire out-of-profile", descr:"risk>=MED", sev:"high" },
];

const d = (k)=>Math.abs(Math.sin(k*0.77));
const ROWS = Array.from({length:60}).map((_,i)=>({
  id: 6000+i,
  ts: `2025-10-19 10:${(i%60).toString().padStart(2,"0")}:00`,
  signature: SIGS[i%SIGS.length].id,
  merchant: ["Mercury","Stripe","Square","DoorDash","Uber"][i%5],
  hits: Math.round(5 + d(i)*30),
  sev: ["high","med","low"][i%3],
  status: ["open","triage","resolved"][i%3],
}));

export default function Anomalies(){
  const cols = [
    {key:"id", label:"ID"},
    {key:"ts", label:"Timestamp"},
    {key:"signature", label:"Signature"},
    {key:"merchant", label:"Merchant"},
    {key:"hits", label:"Hits", align:"right"},
    {key:"sev", label:"Severity"},
    {key:"status", label:"Status"},
  ];

  return (
    <Layout title="Anomalies">
      <Toolbar onReset={()=>location.reload()}>
        <select><option>Severity: All</option><option>low</option><option>med</option><option>high</option></select>
        <button style={{padding:"10px 14px",borderRadius:10,background:"#ef4444",color:"white",border:"none"}}>Pause Merchant</button>
        <button style={{padding:"10px 14px",borderRadius:10,background:"#2563eb",color:"white",border:"none"}}>Open Case</button>
      </Toolbar>

      <div className="grid">
        <div className="card">
          <div style={{fontWeight:700, marginBottom:8}}>Top Signatures</div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10}}>
            {SIGS.map(s=>(
              <div key={s.id} className="card" style={{padding:12}}>
                <div style={{fontWeight:700}}>{s.id} — {s.name}</div>
                <div className="legend">{s.descr.replace(">=","&gt;=").replace(">","&gt;")}</div>
                <div style={{marginTop:8}}><Tag tone={s.sev==="high"?"bad":s.sev==="med"?"warn":"ok"}>{s.sev.toUpperCase()}</Tag></div>
              </div>
            ))}
          </div>
        </div>
        <Heatmap />
      </div>

      <AnnoGrid rows={ROWS} columns={cols} />
    </Layout>
  );
}

function AnnoGrid({ rows, columns }) {
  const [open,setOpen] = useState(false);
  const [row,setRow] = useState(null);
  return (
    <>
      <EliteGrid rows={rows} columns={columns} onRowClick={(r)=>{setRow(r); setOpen(true);}} />
      <Drawer open={open} onClose={()=>setOpen(false)} title={row ? ("Anomaly " + row.id) : "Details"}>
        {row && (
          <>
            <div className="kpis" style={{marginBottom:12}}>
              <div className="card kpi"><h4>Signature</h4><div className="val">{row.signature}</div></div>
              <div className="card kpi"><h4>Merchant</h4><div className="val">{row.merchant}</div></div>
              <div className="card kpi"><h4>Hits</h4><div className="val">{row.hits}</div></div>
              <div className="card kpi"><h4>Severity</h4><div className="val">{row.sev.toUpperCase()}</div></div>
            </div>
            <div className="card">
              <div style={{fontWeight:700, marginBottom:6}}>Triage</div>
              <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
                <button style={{padding:"10px 14px", borderRadius:10, background:"#ef4444", color:"white", border:"none"}}>Pause Merchant</button>
                <button style={{padding:"10px 14px", borderRadius:10, background:"#2563eb", color:"white", border:"none"}}>Open Case</button>
                <button style={{padding:"10px 14px", borderRadius:10, background:"#374151", color:"#e5e7eb", border:"1px solid #4b5563"}}>Mark Resolved</button>
              </div>
            </div>
          </>
        )}
      </Drawer>
    </>
  );
}
