import Layout from "../components/Layout";

export default function Rules(){
  return (
    <Layout title="Rules">
      <div className="card">
        <div style={{fontWeight:700, marginBottom:8}}>Runtime Rules</div>
        <ul style={{lineHeight:"1.8"}}>
          <li>R-102: Card velocity (window=5m, threshold=8)</li>
          <li>R-245: ACH return rate (window=15m, threshold=3%)</li>
          <li>R-331: Wire out-of-profile (risk&gt;=MED)</li>
        </ul>
        <button
          style={{ padding:"10px 14px", borderRadius:10, background:"#2563eb", color:"white", border:"none" }}
        >
          Add Rule
        </button>
      </div>
    </Layout>
  );
}
