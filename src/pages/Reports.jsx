import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Reports() {
  return (
    <>
      <Navbar />

      <div className="p-10 min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Reports</h1>
        <p>
          AI-generated quality and compliance reports.
        </p>
      </div>

      <Footer />
    </>
  );
}

export default Reports;