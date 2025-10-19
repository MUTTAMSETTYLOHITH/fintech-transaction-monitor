import { useMemo, useState } from "react";
import { StatusPill } from "./Toolkit";

export default function EliteGrid({ rows, columns, pageSize=12, onRowClick }) {
  const [page,setPage] = useState(1);
  const [sort,setSort] = useState({key:null, dir:"asc"});
  const [q,setQ] = useState("");

  const filtered = useMemo(()=>{
    const needle = q.trim().toLowerCase();
    let out = rows;
    if (needle) {
      out = out.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(needle)));
    }
    if (sort.key) {
      out = [...out].sort((a,b)=>{
        const av = a[sort.key], bv = b[sort.key];
        if (av===bv) return 0;
        return (av>bv?1:-1) * (sort.dir==="asc"?1:-1);
      });
    }
    return out;
  },[rows, q, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const data = useMemo(()=>filtered.slice((page-1)*pageSize, page*pageSize),[filtered,page,pageSize]);

  const onHeader = (key) => {
    setPage(1);
    setSort(s => s.key===key ? {key, dir: s.dir==="asc"?"desc":"asc"} : {key, dir:"asc"});
  };

  return (
    <div className="card">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <div style={{fontWeight:700}}>Results</div>
        <input placeholder="Quick search…" onChange={e=>{setQ(e.target.value); setPage(1);}} style={{width:220}}/>
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%", borderCollapse:"collapse"}}>
          <thead style={{position:"sticky", top:0, background:"rgba(15,23,42,.9)"}}>
            <tr style={{color:"var(--muted)"}}>
              {columns.map(c=>(
                <th key={c.key} align={c.align||"left"} style={{cursor:"pointer"}} onClick={()=>onHeader(c.key)}>
                  {c.label}{sort.key===c.key ? (sort.dir==="asc" ? " ▲":" ▼") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(r=>(
              <tr key={r.id} style={{borderTop:"1px solid #1f2937"}} onClick={()=>onRowClick?.(r)}>
                {columns.map(c=>{
                  let v = r[c.key];
                  if (c.render) return <td key={c.key} align={c.align||"left"}>{c.render(r)}</td>;
                  if (c.key==="status") return <td key={c.key}><StatusPill status={r.status} /></td>;
                  return <td key={c.key} align={c.align||"left"}>{v}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{display:"flex",gap:8,marginTop:12,justifyContent:"flex-end",alignItems:"center"}}>
        <div className="legend">Page {page} / {totalPages} • {filtered.length} rows</div>
        <button onClick={()=>setPage(p=>Math.max(1,p-1))}>Prev</button>
        <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))}>Next</button>
      </div>
    </div>
  );
}
