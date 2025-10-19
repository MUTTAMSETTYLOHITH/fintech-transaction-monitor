import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import KpiCard from "./KpiCard";
import Link from "next/link";

const f = (x) => Math.abs(Math.sin(x)); // deterministic 0..1

// Time-series (30 points) for revenue, fraud rate, approvals — deterministic
const ts = Array.from({length:30}).map((_,i)=>({
  d: "D" + String(i+1).padStart(2,"0"),
  revenue: Math.round(2_000_000 + f(i*0.27)*800_000),
  fraud: +(0.25 + f(i*0.41)*0.55).toFixed(2),    // %
  approval: Math.round(88 + f(i*0.19)*8),        // %
  volume: Math.round(80_000 + f(i*0.33)*35_000),
}));

// Allocation pie (deterministic)
const alloc = [
  {name:"Card", value:62},
  {name:"ACH", value:24},
  {name:"Wire", value:9},
  {name:"Other", value:5},
];
const COLORS = ["#3b82f6","#22c55e","#a78bfa","#f59e0b"];

// Saved dashboards
const SAVED = [
  {id:"ops", title:"Operations Health", desc:"Latency, error budget, queue depth", links:[{to:"/slas",label:"SLAs"},{to:"/streams",label:"Streams"}]},
  {id:"fraud", title:"Fraud & Risk", desc:"Anomaly score, return codes, watchlist hits", links:[{to:"/anomalies",label:"Anomalies"},{to:"/cases",label:"Case Queue"}]},
  {id:"business", title:"Business KPIs", desc:"Revenue, approvals, chargebacks", links:[{to:"/chargebacks",label:"Chargebacks"},{to:"/merchants",label:"Merchants"}]},
];

export default function DashboardsView(){
  const last = ts[ts.length-1];

  return (
    <>
      <div className="kpis">
        <KpiCard title="Monthly Volume" value={String(last.volume).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} delta="+6.2% vs 30d avg" good />
        <KpiCard title="Revenue (MTD)" value={"$" + String(last.revenue).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} delta="+2.1% WoW" good />
        <KpiCard title="Fraud Rate" value={last.fraud + "%"} delta="-0.08% vs 7d" good />
        <KpiCard title="Approval Rate" value={last.approval + "%"} delta="+0.6% vs 7d" good />
      </div>

      <div className="grid">
        <div className="card">
          <div style={{fontWeight:700, marginBottom:8}}>Revenue & Volume (30d)</div>
          <div style={{width:"100%", height:320}}>
            <ResponsiveContainer>
              <AreaChart data={ts}>
                <XAxis dataKey="d" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip /><Legend />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#1e3a8a" />
                <Area type="monotone" dataKey="volume" stroke="#22c55e" fill="#064e3b" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div style={{fontWeight:700, marginBottom:8}}>Fraud vs Approvals (30d)</div>
          <div style={{width:"100%", height:320}}>
            <ResponsiveContainer>
              <LineChart data={ts}>
                <XAxis dataKey="d" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip /><Legend />
                <Line type="monotone" dataKey="fraud" stroke="#ef4444" dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="approval" stroke="#10b981" dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div style={{fontWeight:700, marginBottom:8}}>Payment Mix</div>
          <div style={{width:"100%", height:320, display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
            <div style={{width:"100%", height:"100%"}}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={alloc} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={2} label>
                    {alloc.map((e,i)=><Cell key={i} fill={COLORS[i%COLORS.length]} />)}
                  </Pie>
                  <Legend /><Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div>
              <div className="legend">Share by rail</div>
              <ul style={{lineHeight:"1.9", marginTop:8}}>
                {alloc.map(a=><li key={a.name}>{a.name}: <b>{a.value}%</b></li>)}
              </ul>
              <div className="legend" style={{marginTop:12}}>Jump to details</div>
              <div style={{display:"flex", gap:8, flexWrap:"wrap", marginTop:6}}>
                <Link className="navlink" href="/transactions">Transactions</Link>
                <Link className="navlink" href="/merchants">Merchants</Link>
                <Link className="navlink" href="/anomalies">Anomalies</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{fontWeight:700, marginBottom:8}}>Error Buckets (30d)</div>
          <div style={{width:"100%", height:320}}>
            <ResponsiveContainer>
              <BarChart data={ts}>
                <XAxis dataKey="d" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip /><Legend />
                <Bar dataKey="fraud" name="Fraud %" fill="#a78bfa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="section-title">Saved Dashboards</div>
      <div className="grid" style={{gridTemplateColumns:"1fr 1fr"}}>
        {SAVED.map(card=>(
          <div key={card.id} className="card">
            <div style={{fontWeight:800, marginBottom:6}}>{card.title}</div>
            <div className="legend">{card.desc}</div>
            <div style={{display:"flex", gap:8, flexWrap:"wrap", marginTop:10}}>
              {card.links.map(l => <Link key={l.to} className="navlink" href={l.to}>{l.label}</Link>)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
