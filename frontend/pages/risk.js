import Layout from '../components/Layout';
export default function Risk(){
  return (
    <Layout title="Risk & Alerts">
      <div className="grid">
        <div className="card">
          <div style={{fontWeight:700, marginBottom:8}}>Current Alerts</div>
          <ul style={{marginTop:6, lineHeight:'1.8'}}>
            <li>⚠️ Tech sector volatility above 95th percentile</li>
            <li>⚠️ Liquidity risk on Bonds (BB tranche)</li>
            <li>⚠️ Crypto exposure above policy threshold</li>
          </ul>
        </div>
        <div className="card">
          <div style={{fontWeight:700, marginBottom:8}}>Stress Tests</div>
          <p style={{color:'var(--muted)'}}>Run shock, rate hike, and recession scenarios… (wire to backend later)</p>
        </div>
      </div>
    </Layout>
  );
}
