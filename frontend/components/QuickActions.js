"use client";
import { useRouter } from "next/router";

export default function QuickActions(){
  const router = useRouter();
  const btn = (label, path, tone="#2563eb") => (
    <button
      key={path}
      onClick={()=>router.push(path)}
      style={{padding:"10px 14px", borderRadius:10, background:tone, color:"white", border:"none"}}
    >
      {label}
    </button>
  );
  return (
    <div className="card" style={{display:"flex", gap:10, flexWrap:"wrap"}}>
      {btn("Go to Live Feed","/live","#1f6feb")}
      {btn("Open Case Queue","/cases","#7c3aed")}
      {btn("View Transactions","/transactions","#0ea5e9")}
      {btn("Merchants","/merchants","#16a34a")}
      {btn("Chargebacks","/chargebacks","#ef4444")}
    </div>
  );
}
