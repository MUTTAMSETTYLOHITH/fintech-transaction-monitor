import Layout from "../components/Layout";
import Link from "next/link";

export default function Cases(){
  return (
    <Layout title="Case Queue">
      <div className="card">
        <div style={{fontWeight:700, marginBottom:8}}>Open Cases</div>
        <ul style={{lineHeight:"1.8"}}>
          <li>#C-2041 • Merchant: Mercury • Risk: HIGH • Status: NEW</li>
          <li>#C-2042 • Merchant: Stripe • Risk: CRITICAL • Status: TRIAGE</li>
          <li>#C-2043 • Merchant: Square • Risk: MED • Status: REVIEW</li>
        </ul>
        <div style={{marginTop:12, display:"flex", gap:10}}>
          <Link className="navlink" href="/anomalies">Back to Anomalies</Link>
          <Link className="navlink" href="/transactions">View Transactions</Link>
        </div>
      </div>
    </Layout>
  );
}
