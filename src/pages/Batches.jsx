import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Batches() {
  return (
    <>
      <Navbar />

      <div className="p-10 min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Batches</h1>
        <p>
          Track and manage herbal product batches.
        </p>
      </div>

      <Footer />
    </>
  );
}

export default Batches;