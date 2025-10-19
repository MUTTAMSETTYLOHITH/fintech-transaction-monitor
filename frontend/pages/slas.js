import Layout from "../components/Layout";
import { Sparkline, Tag } from "../components/Toolkit";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from "recharts";

const f = (x)=>Math.abs(Math.sin(x));
const series = Array.from({length:30}).map((_,i)=>({
  d: "D" + String(i+1).padStart(2,"0"),
  ingest_p95: Math.round(210 - f(i*0.27)*40),   // target < 250
  decision_p95: Math.round(270 - f(i*0.33)*50), // target < 300
  avail: +(99.8 + f(i*0.19)*0.2).toFixed(2),    // target >= 99.9
  chargeback: +(0.42 + f(i*0.11)*0.16).toFixed(2), // target <= 0.70
}));

const SLO = [
  {name:"Ingest p95 &lt; 250 ms", current:"182 ms", ok:true},
  {name:"Decision p95 &lt; 300 ms", current:"244 ms", ok:true},
  {name:"Availability ≥ 99.9%", current:"99.96%", ok:true},
  {name:"Chargeback rate ≤ 0.70%", current:"0.42%", ok:true},
];

export default function SLAs(){
  return (
    <Layout title="SLAs">
      <div className="kpis">
        {SLO.map((s,i)=>(
          <div key={i} className="card kpi">
            <h4 dangerouslySetInnerHTML={{__html:s.name}} />
            <div className="val">{s.current}</div>
            <div className={s.ok ? "delta good" : "delta bad"}>{s.ok ? "On track" : "Breaching"}</div>
          </div>
        ))}
      </div>

      <div className="grid">
        <div className="card">
          <div style={{fontWeight:700, marginBottom:8}}>Latency (30d)</div>
          <div style={{width:"100%", height:320}}>
            <ResponsiveContainer>
              <AreaChart data={series}>
                <XAxis dataKey="d" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip /><Legend />
                <Area type="monotone" dataKey="ingest_p95" name="Ingest p95 (ms)" stroke="#3b82f6" fill="#1e3a8a" />
                <Area type="monotone" dataKey="decision_p95" name="Decision p95 (ms)" stroke="#22c55e" fill="#064e3b" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div style={{fontWeight:700, marginBottom:8}}>Error Budget Burn (approx)</div>
          <Sparkline data={series.map(s=>1000 - Math.round(s.avail*10))} />
          <div className="legend" style={{marginTop:6}}>Lower is better • derived from availability</div>
        </div>
      </div>

      <div className="card" style={{marginTop:12}}>
        <div style={{fontWeight:700, marginBottom:8}}>SLA Compliance</div>
        <table style={{width:"100%", borderCollapse:"collapse"}}>
          <thead>
            <tr style={{color:"var(--muted)"}}>
              <th align="left">Objective</th><th align="left">Target</th><th align="left">Current</th><th align="left">Status</th><th align="left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{borderTop:"1px solid #1f2937"}}>
              <td>Ingest Latency</td><td>&lt; 250 ms</td><td>182 ms</td>
              <td><Tag tone="ok">ON TRACK</Tag></td>
              <td><button style={{padding:"8px 12px", borderRadius:8, background:"#374151", color:"#e5e7eb", border:"1px solid #4b5563"}}>Create Alert</button></td>
            </tr>
            <tr style={{borderTop:"1px solid #1f2937"}}>
              <td>Decision Latency</td><td>&lt; 300 ms</td><td>244 ms</td>
              <td><Tag tone="ok">ON TRACK</Tag></td>
              <td><button style={{padding:"8px 12px", borderRadius:8, background:"#374151", color:"#e5e7eb", border:"1px solid #4b5563"}}>Open Runbook</button></td>
            </tr>
            <tr style={{borderTop:"1px solid #1f2937"}}>
              <td>Availability</td><td>≥ 99.9%</td><td>99.96%</td>
              <td><Tag tone="ok">ON TRACK</Tag></td>
              <td><button style={{padding:"8px 12px", borderRadius:8, background:"#374151", color:"#e5e7eb", border:"1px solid #4b5563"}}>Drill Streams</button></td>
            </tr>
            <tr style={{borderTop:"1px solid #1f2937"}}>
              <td>Chargeback Rate</td><td>≤ 0.70%</td><td>0.42%</td>
              <td><Tag tone="ok">ON TRACK</Tag></td>
              <td><button style={{padding:"8px 12px", borderRadius:8, background:"#374151", color:"#e5e7eb", border:"1px solid #4b5563"}}>Open Playbook</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
