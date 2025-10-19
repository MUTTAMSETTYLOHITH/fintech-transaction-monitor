import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Item = ({ href, label, badge, tone }) => {
  const { pathname } = useRouter();
  const active = pathname === href;
  return (
    <Link href={href} className={`navlink ${active ? "active" : ""}`}>
      <span className="icon">•</span>
      <span>{label}</span>
      {badge ? <span className={`badge ${tone || ""}`}>{badge}</span> : null}
    </Link>
  );
};

export default function Layout({ children, title = "FinTech Transaction Monitor" }) {
  const [now, setNow] = useState(null);
  useEffect(() => { const t = setInterval(()=>setNow(new Date()), 1000); setNow(new Date()); return ()=>clearInterval(t); }, []);
  const ts = now ? now.toISOString().slice(0,19).replace("T"," ") : "";

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">🧭 FinTech Transaction Monitor</div>

        <div className="sechead">Monitoring</div>
        <nav className="nav">
          <Item href="/" label="Overview" />
          <Item href="/live" label="Live Feed" badge="realtime" />
          <Item href="/streams" label="Streams" />
          <Item href="/slas" label="SLAs" />
          <Item href="/dashboards" label="Dashboards" />
        </nav>

        <div className="sechead">Investigation</div>
        <nav className="nav">
          <Item href="/anomalies" label="Anomalies" badge="12" tone="warn" />
          <Item href="/cases" label="Case Queue" badge="4" tone="bad" />
          <Item href="/transactions" label="Transactions" />
          <Item href="/chargebacks" label="Chargebacks" />
          <Item href="/merchants" label="Merchants" />
          <Item href="/reports" label="Reports" />
        </nav>

        <div className="sechead">Configuration</div>
        <nav className="nav">
          <Item href="/rules" label="Rules" />
          <Item href="/rulesets" label="Rule Sets" />
          <Item href="/sources" label="Sources & Ingest" />
          <Item href="/schedules" label="Schedules" />
        </nav>

        <div className="sechead">Administration</div>
        <nav className="nav">
          <Item href="/users" label="Users & Roles" />
          <Item href="/apikeys" label="API Keys" />
          <Item href="/settings" label="Settings" />
        </nav>
      </aside>

      <main>
        <div className="topbar">
          <div style={{ fontWeight: 800 }}>{title}</div>
          <div className="legend">{ts && <>UTC {ts}</>}</div>
        </div>
        <div className="content">{children}</div>
      </main>
    </div>
  );
}
