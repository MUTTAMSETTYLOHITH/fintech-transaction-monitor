import Layout from '../components/Layout';
export default function Reports(){
  return (
    <Layout title="Reports & Compliance">
      <div className="card">
        <div style={{fontWeight:700, marginBottom:10}}>Scheduled & Historical Reports</div>
        <p style={{color:'var(--muted)'}}>Download PDF/HTML, compliance checklist…</p>
      </div>
    </Layout>
  );
}
