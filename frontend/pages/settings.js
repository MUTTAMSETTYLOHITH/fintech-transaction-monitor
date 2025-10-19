import Layout from '../components/Layout';
export default function Settings(){
  return (
    <Layout title="Settings">
      <div className="card">
        <div style={{fontWeight:700, marginBottom:10}}>Preferences</div>
        <p style={{color:'var(--muted)'}}>Theme, notifications, integrations…</p>
      </div>
    </Layout>
  );
}
