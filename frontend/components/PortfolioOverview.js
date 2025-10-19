import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import KpiCard from './KpiCard';

const pv = [
  {date:'2025-10-01', value:120000000},
  {date:'2025-10-02', value:121000000},
  {date:'2025-10-03', value:122500000},
  {date:'2025-10-04', value:124567890},
];

const alloc = [
  {name:'Equities', value:70},
  {name:'Bonds', value:20},
  {name:'Crypto', value:5},
  {name:'Cash', value:5}
];
const COLORS = ['#3b82f6','#22c55e','#f59e0b','#fb7185'];

export default function PortfolioOverview(){
  return (
    <>
      <div className="kpis">
        <KpiCard title="Total Portfolio Value" value=",567,890" delta="+1.72% WoW" good />
        <KpiCard title="Daily P&L" value="+,890" delta="+,120 vs prev day" good />
        <KpiCard title="VaR (1d, 99%)" value=",200,000" delta="-3.1% vs 7d avg" good />
        <KpiCard title="Open Risk Alerts" value="3" delta="1 Critical • 2 High" />
      </div>

      <div className="section-title">Portfolio Overview</div>
      <div className="grid">
        <div className="card">
          <div style={{marginBottom:10, fontWeight:700}}>Value Over Time</div>
          <div style={{width:'100%', height:320}}>
            <ResponsiveContainer>
              <LineChart data={pv}>
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#a78bfa" dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div style={{marginBottom:10, fontWeight:700}}>Asset Allocation</div>
          <div style={{width:'100%', height:320}}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={alloc} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={2} label>
                  {alloc.map((e,i) => <Cell key={i} fill={COLORS[i%COLORS.length]} />)}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
