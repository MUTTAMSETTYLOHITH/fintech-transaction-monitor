import Layout from "../components/Layout";
import MonitorOverview from "../components/MonitorOverview";
import QuickActions from "../components/QuickActions";

export default function Home(){
  return (
    <Layout title="FinTech Transaction Monitor — Overview">
      <QuickActions />
      <div style={{height:12}} />
      <MonitorOverview />
    </Layout>
  );
}
