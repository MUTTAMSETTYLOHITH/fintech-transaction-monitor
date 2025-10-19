import Layout from "../components/Layout";
import Link from "next/link";

export default function Chargebacks(){
  return (
    <Layout title="Chargebacks">
      <div className="card">
        <div style={{fontWeight:700, marginBottom:8}}>Disputes</div>
        <ul style={{lineHeight:"1.8"}}>
          <li>#D-801 • PAN **** 2211 • Reason: Fraudulent • Amount: $182.40</li>
          <li>#D-802 • PAN **** 9934 • Reason: Not as described • Amount: $62.19</li>
        </ul>
        <div style={{marginTop:12, display:"flex", gap:10}}>
          <Link className="navlink" href="/transactions">View Related Transactions</Link>
          <Link className="navlink" href="/cases">Create Case</Link>
        </div>
      </div>
    </Layout>
  );
}
