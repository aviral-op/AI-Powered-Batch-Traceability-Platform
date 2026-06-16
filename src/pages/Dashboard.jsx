import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="p-10 min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p>
          Analytics and overview of herbal batch traceability data.
        </p>
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;