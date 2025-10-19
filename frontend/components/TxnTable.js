import { useMemo, useState } from "react";

// deterministic pseudo-values
const d = (k) => Math.abs(Math.sin(k * 7.3));
const ALL = Array.from({length:40}).map((_,i)=>({
  id: 1000+i,
  ts: `2025-10-19 11:${(i%60).toString().padStart(2,"0")}:00`,
  type: ["card","ach","wire"][i%3],
  merchant: ["Amazon","BestBuy","Mercury","Stripe","Square"][i%5],
  amount: (10 + d(i) * 2000).toFixed(2), // deterministic amount
  risk: ["low","med","high"][i%3],
  status: ["ok","held","blocked"][i%3],
}));

export default function TxnTable(){
  const [page,setPage] = useState(1);
  const pageSize = 10;
  const data = useMemo(()=>ALL.slice((page-1)*pageSize, page*pageSize),[page]);

  return (
    <div className="card">
      <div style={{fontWeight:700, marginBottom:10}}>Recent Transactions</div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%", borderCollapse:"collapse"}}>
          <thead>
            <tr style={{color:"var(--muted)"}}>
              <th align="left">ID</th><th align="left">Timestamp</th><th align="left">Type</th>
              <th align="left">Merchant</th><th align="right">Amount ($)</th><th align="left">Risk</th><th align="left">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map(r=>(
              <tr key={r.id} style={{borderTop:"1px solid #1f2937"}}>
                <td>{r.id}</td><td>{r.ts}</td><td>{r.type.toUpperCase()}</td><td>{r.merchant}</td>
                <td align="right">{r.amount}</td>
                <td style={{color: r.risk==="high"?"#ef4444": r.risk==="med"?"#f59e0b":"#10b981"}}>{r.risk.toUpperCase()}</td>
                <td>{r.status.toUpperCase()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{display:"flex", gap:8, marginTop:12}}>
        <button onClick={()=>setPage(p=>Math.max(1,p-1))}>Prev</button>
        <div style={{opacity:.7}}>Page {page}</div>
        <button onClick={()=>setPage(p=>p+1)}>Next</button>
      </div>
    </div>
  );
}
