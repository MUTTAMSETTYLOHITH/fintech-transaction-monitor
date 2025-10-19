import React from "react";

export function Heatmap(){
  // Deterministic 7 x 24 heatmap
  const val = (d,h)=>Math.round(Math.abs(Math.sin((d+1)*(h+1)*0.11))*100);
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const data = days.map((d,di)=>({ day:d, hours:Array.from({length:24}).map((_,h)=>val(di,h)) }));
  const color = (v)=>`hsl(${260 - v*1.5} 80% ${30 + v*0.25}%)`;

  return (
    <div className="card">
      <div style={{fontWeight:700, marginBottom:8}}>Anomaly Heatmap (7 × 24)</div>
      <div style={{display:"grid", gridTemplateColumns:"80px repeat(24, 1fr)", gap:4}}>
        <div />
        {Array.from({length:24}).map((_,h)=><div key={h} className="legend" style={{textAlign:"center"}}>{h}</div>)}
        {data.map((row,i)=>(
          <React.Fragment key={i}>
            <div className="legend" style={{display:"grid",placeItems:"center"}}>{row.day}</div>
            {row.hours.map((v,h)=><div key={h} style={{height:18, borderRadius:6, background:color(v)}} />)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
