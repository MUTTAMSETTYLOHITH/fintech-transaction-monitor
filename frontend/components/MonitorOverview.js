import React, { useMemo, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, LineChart, Line, BarChart, Bar, Cell } from "recharts";
import KpiCard from "./KpiCard";
import AlertBanner from "./AlertBanner";
import TxnFilters from "./TxnFilters";
import TxnTable from "./TxnTable";

/* ---------- deterministic series builders (SSR-safe) ---------- */
const f = (x)=>Math.abs(Math.sin(x));
const makeSeries = (n)=>Array.from({length:n}).map((_,i)=>({
  i,
  label: (n===24? (String(i).padStart(2,"0")+":00") : "D"+String(i+1).padStart(2,"0")),
  volume: Math.round(80000 + f(i*0.33)*35000),
  revenue: Math.round(2000000 + f(i*0.27)*800000),
  approval: Math.round(88 + f(i*0.19)*8),            // %
  fraud: +(0.25 + f(i*0.41)*0.55).toFixed(2),        // %
  latency: Math.round(160 + f(i*0.23)*60),           // ms
  declines_ops: Math.round(40 + f(i*0.37)*30),
  declines_risk: Math.round(30 + f(i*0.29)*30),
  declines_bank: Math.round(25 + f(i*0.21)*25),
}));

const base24 = makeSeries(24);
const base7  = makeSeries(7);
const base30 = makeSeries(30);

const declinesPalette = ["#ef4444","#f59e0b","#64748b"];
const mixColors = ["#3b82f6","#22c55e","#a78bfa","#f59e0b"];

/* ---------- tiny helpers ---------- */
const fmtInt = (n)=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const sectionTitle = (t)=> (<div className="section-title" style={{marginTop:8}}>{t}</div>);

export default function MonitorOverview(){
  const [range,setRange] = useState("24h"); // "24h" | "7d" | "30d"
  const data = range==="24h" ? base24 : range==="7d" ? base7 : base30;
  const last = data[data.length-1];

  const paymentMix = useMemo(()=>[
    {name:"Card", value:62},
    {name:"ACH", value:24},
    {name:"Wire", value:9},
    {name:"Other", value:5},
  ],[]);

  const topMerchants = useMemo(()=>[
    {name:"Amazon", vol:2.36, risk:"LOW"},
    {name:"Mercury", vol:1.82, risk:"MED"},
    {name:"Stripe", vol:1.55, risk:"HIGH"},
    {name:"Square", vol:1.33, risk:"LOW"},
    {name:"Uber", vol:1.12, risk:"LOW"},
  ],[]);

  /* ---------- header banner + KPIs ---------- */
  return (
    <>
      <AlertBanner level="high" text="Ops pulse: ingest healthy • anomaly hits steady • 1 policy threshold near limit" />

      <div className="kpis">
        <KpiCard title={"Volume (" + (range==="24h"?"24h":range) + ")"} value={fmtInt(last.volume)} delta="+6.2% vs baseline" good />
        <KpiCard title="Revenue (MTD)" value={"$"+fmtInt(last.revenue)} delta="+2.1% WoW" good />
        <KpiCard title="Approval Rate" value={last.approval + "%"} delta="+0.6% vs 7d" good />
        <KpiCard title="Fraud Rate" value={last.fraud + "%"} delta="-0.08% vs 7d" good />
      </div>

      {/* range switcher (client-side only state, deterministic data) */}
      <div className="card" style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginTop:8}}>
        <div className="legend">Range</div>
        <button onClick={()=>setRange("24h")} style={{padding:"8px 12px", borderRadius:10, background:(range==="24h"?"#2563eb":"#1b2a47"), color:"#e6eefc", border:"1px solid #273a60"}}>24h</button>
        <button onClick={()=>setRange("7d")}  style={{padding:"8px 12px", borderRadius:10, background:(range==="7d" ?"#2563eb":"#1b2a47"), color:"#e6eefc", border:"1px solid #273a60"}}>7d</button>
        <button onClick={()=>setRange("30d")} style={{padding:"8px 12px", borderRadius:10, background:(range==="30d"?"#2563eb":"#1b2a47"), color:"#e6eefc", border:"1px solid #273a60"}}>30d</button>

        <div style={{marginLeft:"auto",display:"flex",gap:8}}>
          <span className="badge">MTD</span>
          <span className="badge warn">WATCH</span>
        </div>
      </div>

      {sectionTitle("Key Trends")}
      <div className="grid">
        {/* Stacked Area: Revenue & Volume */}
        <div className="card">
          <div style={{fontWeight:800, marginBottom:6}}>Revenue & Volume ({range})</div>
          <div style={{width:"100%",height:320}}>
            <ResponsiveContainer>
              <AreaChart data={data}>
                <XAxis dataKey="label" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip /><Legend />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#3b82f6" fill="#1e3a8a" />
                <Area type="monotone" dataKey="volume"  name="Volume"  stroke="#22c55e" fill="#064e3b" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dual-axis Line: Approvals vs Fraud */}
        <div className="card">
          <div style={{fontWeight:800, marginBottom:6}}>Approvals vs Fraud ({range})</div>
          <div style={{width:"100%",height:320}}>
            <ResponsiveContainer>
              <LineChart data={data}>
                <XAxis dataKey="label" stroke="#9ca3af" />
                <YAxis yAxisId="left"  stroke="#9ca3af" />
                <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" />
                <Tooltip /><Legend />
                <Line yAxisId="left"  type="monotone" dataKey="approval" name="Approval %" stroke="#10b981" dot={false} strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="fraud"    name="Fraud %"    stroke="#ef4444" dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Decline Reasons */}
        <div className="card">
          <div style={{fontWeight:800, marginBottom:6}}>Decline Reasons ({range})</div>
          <div style={{width:"100%",height:320}}>
            <ResponsiveContainer>
              <BarChart data={data}>
                <XAxis dataKey="label" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip /><Legend />
                <Bar dataKey="declines_ops"  name="Ops"   fill={declinesPalette[2]} />
                <Bar dataKey="declines_risk" name="Risk"  fill={declinesPalette[1]} />
                <Bar dataKey="declines_bank" name="Bank"  fill={declinesPalette[0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Mix + Shortcuts */}
        <div className="card">
          <div style={{fontWeight:800, marginBottom:6}}>Payment Mix</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div>
              <ul style={{lineHeight:"1.8", marginTop:6}}>
                {paymentMix.map((p,i)=>(
                  <li key={p.name}>
                    <span style={{display:"inline-block", width:10, height:10, borderRadius:9999, background:mixColors[i%mixColors.length], marginRight:8}} />
                    {p.name}: <b>{p.value}%</b>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="legend">Quick links</div>
              <div style={{display:"flex", gap:8, flexWrap:"wrap", marginTop:6}}>
                <a className="navlink" href="/transactions">Transactions</a>
                <a className="navlink" href="/merchants">Merchants</a>
                <a className="navlink" href="/anomalies">Anomalies</a>
                <a className="navlink" href="/streams">Streams</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {sectionTitle("Operational Pulse")}
      <div className="grid">
        {/* Top Merchants card list */}
        <div className="card">
          <div style={{fontWeight:800, marginBottom:6}}>Top Merchants • Monthly Volume</div>
          <div style={{display:"grid", gap:10}}>
            {topMerchants.map((m,idx)=>(
              <div key={m.name} style={{display:"grid", gridTemplateColumns:"1fr auto", gap:10, alignItems:"center"}}>
                <div>
                  <div style={{fontWeight:700}}>{m.name}</div>
                  <div className="legend">Risk: {m.risk}</div>
                  <div style={{height:8, borderRadius:9999, background:"#0d1629", marginTop:6, position:"relative", overflow:"hidden"}}>
                    <div style={{position:"absolute", inset:"0 auto 0 0", width:(m.vol/3.2*100).toFixed(2)+"%", background:"linear-gradient(90deg,#3b82f6,#22c55e)", borderRadius:9999}} />
                  </div>
                </div>
                <div style={{fontWeight:800}}>{m.vol.toFixed(2)}M</div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity timeline */}
        <div className="card">
          <div style={{fontWeight:800, marginBottom:6}}>Activity</div>
          <ul style={{lineHeight:"1.9",margin:0,paddingLeft:18}}>
            <li>Policy R-245 updated • threshold tuned to 3% (15m)</li>
            <li>Case #C-2042 escalated • Stripe • CRITICAL</li>
            <li>New merchant onboarded • ACME Widgets • MONITORING</li>
            <li>Runbook v2.1 published • Decision latency mitigation</li>
          </ul>
          <div className="legend" style={{marginTop:8}}>Auto-generated from change log & events</div>
        </div>
      </div>

      {sectionTitle("Explore")}
      <TxnFilters />
      <TxnTable />
    </>
  );
}
