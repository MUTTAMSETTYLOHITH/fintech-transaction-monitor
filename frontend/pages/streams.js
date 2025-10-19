import Layout from "../components/Layout";
import { Sparkline, Tag } from "../components/Toolkit";

const f = (x)=>Math.abs(Math.sin(x));

const topics = [
  {id:"transactions.card", tps:190, lag:[2,2,0,1,0,3,1,0,0,2,0,1].map((_,i)=>Math.round(f(i*0.41)*5))},
  {id:"transactions.ach",  tps:88,  lag:[12,11,10,9,8,7,9,12,7,8,6,5].map((_,i)=>Math.round(5+f(i*0.33)*8))},
  {id:"transactions.wire", tps:41,  lag:[0,0,1,0,0,0,0,1,0,0,0,0]},
];

const consumers = [
  {group:"txn-card-cg-1", topic:"transactions.card", lag:3,  status:"healthy"},
  {group:"txn-card-cg-2", topic:"transactions.card", lag:0,  status:"healthy"},
  {group:"txn-ach-cg-1",  topic:"transactions.ach",  lag:12, status:"degraded"},
  {group:"txn-wire-cg-1", topic:"transactions.wire", lag:0,  status:"healthy"},
];

export default function Streams(){
  return (
    <Layout title="Streams">
      <div className="grid">
        {topics.map(t=>(
          <div key={t.id} className="card">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontWeight:800}}>{t.id}</div>
              <Tag tone={t.tps>150?"ok":t.tps>60?"default":"warn"}>{String(t.tps) + " tps"}</Tag>
            </div>
            <div className="legend" style={{marginTop:6}}>Lag (last 12 intervals)</div>
            <Sparkline data={t.lag.map(v=>v*10)} color="#f59e0b" />
          </div>
        ))}
      </div>

      <div style={{height:12}} />
      <div className="card">
        <div style={{fontWeight:700, marginBottom:8}}>Consumer Groups</div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%", borderCollapse:"collapse"}}>
            <thead>
              <tr style={{color:"var(--muted)"}}>
                <th align="left">Group</th><th align="left">Topic</th><th align="right">Lag</th><th align="left">Status</th><th align="left">Action</th>
              </tr>
            </thead>
            <tbody>
              {consumers.map(c=>(
                <tr key={c.group} style={{borderTop:"1px solid #1f2937"}}>
                  <td>{c.group}</td>
                  <td>{c.topic}</td>
                  <td align="right">{c.lag}</td>
                  <td>
                    <span style={{color: c.status==="healthy"?"#10b981":"#f59e0b", fontWeight:700}}>
                      {c.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <button style={{padding:"8px 12px", borderRadius:8, background:"#374151", color:"#e5e7eb", border:"1px solid #4b5563"}}>Rebalance</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
