import Layout from "../components/Layout";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Sparkline } from "../components/Toolkit";
import EliteGrid from "../components/EliteGrid";

const f = (x)=>Math.abs(Math.sin(x)); // deterministic base

// deterministic seed rows (SSR-safe)
const seedRows = Array.from({length:15}).map((_,i)=>({
  id: 9000+i,
  ts: "2025-10-19 11:" + String((i*2)%60).padStart(2,"0") + ":00",
  rail: ["card","ach","wire"][i%3],
  merchant: ["Amazon","Mercury","Stripe","Square","Uber","DoorDash"][i%6],
  amount: +(11 + f(i*0.33)*1800).toFixed(2),
  status: ["ok","ok","held","ok","blocked"][i%5],
}));

// columns for grid
const cols = [
  {key:"id", label:"ID"},
  {key:"ts", label:"Timestamp"},
  {key:"rail", label:"Rail"},
  {key:"merchant", label:"Merchant"},
  {key:"amount", label:"Amount ($)", align:"right"},
  {key:"status", label:"Status"},
];

export default function Live(){
  const [rows,setRows] = useState(seedRows);
  const [mounted,setMounted] = useState(false);

  // client-only ticker; SSR shows seed rows to avoid hydration mismatch
  useEffect(()=>{
    setMounted(true);
    let n = 0;
    const timer = setInterval(()=>{
      n += 1;
      const i = rows.length + n;
      const next = {
        id: 9200+i,
        ts: "2025-10-19 12:" + String((i)%60).padStart(2,"0") + ":00",
        rail: ["card","ach","wire"][i%3],
        merchant: ["Amazon","Mercury","Stripe","Square","Uber","DoorDash"][i%6],
        amount: +(11 + f((i)*0.33)*1800).toFixed(2),
        status: ["ok","ok","held","ok","blocked"][i%5],
      };
      setRows(prev => [next, ...prev].slice(0,40));
    }, 1500);
    return ()=>clearInterval(timer);
  },[]);

  const tpsSeries = useMemo(()=>Array.from({length:24}).map((_,h)=>12 + Math.round(f(h*0.73)*8)),[]);
  const errSeries = useMemo(()=>Array.from({length:24}).map((_,h)=>+(0.2 + f(h*0.41)*0.5).toFixed(2)),[]);

  return (
    <Layout title="Live Feed">
      <div className="kpis">
        <div className="card kpi"><h4>Ingest TPS</h4><div className="val">{tpsSeries[tpsSeries.length-1]}</div></div>
        <div className="card kpi"><h4>Error Rate</h4><div className="val">{errSeries[errSeries.length-1] + "%"}</div></div>
        <div className="card kpi"><h4>p95 Latency</h4><div className="val">{"182 ms"}</div></div>
        <div className="card kpi"><h4>Open Alerts</h4><div className="val">7</div></div>
      </div>

      <div className="grid">
        <div className="card">
          <div style={{fontWeight:700, marginBottom:6}}>TPS (last 24)</div>
          <Sparkline data={tpsSeries} />
        </div>
        <div className="card">
          <div style={{fontWeight:700, marginBottom:6}}>Error % (last 24)</div>
          <Sparkline data={errSeries.map(v=>v*10)} />
        </div>
      </div>

      <div className="card" style={{display:"flex", gap:8, flexWrap:"wrap", marginTop:12}}>
        <button style={{padding:"10px 14px", borderRadius:10, background:"#374151", color:"#e5e7eb", border:"1px solid #4b5563"}}>Pause Ingest</button>
        <button style={{padding:"10px 14px", borderRadius:10, background:"#2563eb", color:"white", border:"none"}}>Resume</button>
        <Link className="navlink" href="/streams">Stream Health</Link>
        <Link className="navlink" href="/anomalies">Investigate</Link>
        <Link className="navlink" href="/cases">Case Queue</Link>
      </div>

      <div style={{height:12}} />
      <EliteGrid rows={rows} columns={cols} />
    </Layout>
  );
}
