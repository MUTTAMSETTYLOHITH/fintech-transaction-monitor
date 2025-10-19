import Layout from "../components/Layout";
import EliteGrid from "../components/EliteGrid";
import { Drawer, Toolbar, Tag, Sparkline } from "../components/Toolkit";
import { useState } from "react";

const d = (k) => Math.abs(Math.sin(k*7.3));
const ALL = Array.from({length:120}).map((_,i)=>({
  id: 4000+i,
  ts: "2025-10-19 11:" + (i%60).toString().padStart(2,"0") + ":00",
  pan: "**** " + String(1200 + (i%8800)).padStart(4,"0"),
  type: ["card","ach","wire"][i%3],
  merchant: ["Amazon","BestBuy","Mercury","Stripe","Square","DoorDash","Uber"][i%7],
  amount: +(10 + d(i)*2500).toFixed(2),
  risk: ["low","med","high"][ (i*3)%3 ],
  status: ["ok","held","blocked"][ (i*5)%3 ],
}));

export default function Transactions(){
  const cols = [
    {key:"id", label:"ID"},
    {key:"ts", label:"Timestamp"},
    {key:"type", label:"Type"},
    {key:"merchant", label:"Merchant"},
    {key:"pan", label:"PAN"},
    {key:"amount", label:"Amount ($)", align:"right"},
    {key:"risk", label:"Risk"},
    {key:"status", label:"Status"},
  ];

  const onSearch = () => {}; // toolbar quicksearch is built into grid
  const onReset = () => location.reload();

  return (
    <Layout title="Transactions">
      <Toolbar onSearch={onSearch} onReset={onReset}>
        <select><option>Type: All</option><option>card</option><option>ach</option><option>wire</option></select>
        <select><option>Risk: All</option><option>low</option><option>med</option><option>high</option></select>
        <select><option>Status: All</option><option>ok</option><option>held</option><option>blocked</option></select>
      </Toolbar>

      <TxGrid columns={cols} rows={ALL} />
    </Layout>
  );
}

function TxGrid({ columns, rows }) {
  const [open,setOpen] = useState(false);
  const [row,setRow] = useState(null);
  return (
    <>
      <EliteGrid rows={rows} columns={columns} onRowClick={(r)=>{setRow(r); setOpen(true);}} />

      <Drawer open={open} onClose={()=>setOpen(false)} title={row ? ("Txn #" + row.id + " — " + row.merchant) : "Details"}>
        {row && (
          <>
            <div className="kpis" style={{marginBottom:12}}>
              <div className="card kpi"><h4>Amount</h4><div className="val">{"$" + row.amount.toFixed(2)}</div></div>
              <div className="card kpi"><h4>Type</h4><div className="val">{row.type.toUpperCase()}</div></div>
              <div className="card kpi"><h4>Status</h4><div className="val">{row.status.toUpperCase()}</div></div>
              <div className="card kpi"><h4>Risk</h4><div className="val">{row.risk.toUpperCase()}</div></div>
            </div>

            <div className="card" style={{marginBottom:12}}>
              <div style={{fontWeight:700, marginBottom:6}}>Velocity Sparkline (last 20)</div>
              <Sparkline data={Array.from({length:20}).map((_,i)=>10 + Math.abs(Math.sin((row.id+i)*0.13))*20)} />
            </div>

            <div className="card">
              <div style={{fontWeight:700, marginBottom:6}}>Actions</div>
              <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
                <button style={{padding:"10px 14px", borderRadius:10, background:"#ef4444", color:"white", border:"none"}}>Block PAN</button>
                <button style={{padding:"10px 14px", borderRadius:10, background:"#f59e0b", color:"black", border:"none"}}>Hold Settlement</button>
                <button style={{padding:"10px 14px", borderRadius:10, background:"#2563eb", color:"white", border:"none"}}>Create Case</button>
              </div>
            </div>
          </>
        )}
      </Drawer>
    </>
  );
}
