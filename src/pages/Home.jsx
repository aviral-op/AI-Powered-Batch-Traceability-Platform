import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BatchCard from "../components/BatchCard";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Navbar />

      <Hero />

      <div className="grid md:grid-cols-2 gap-6 p-8">
        <BatchCard
          batchId="HB001"
          product="Ashwagandha"
          status="Approved"
        />

        <BatchCard
          batchId="HB002"
          product="Tulsi"
          status="Pending"
        />
      </div>

      <Footer />
    </div>
  );
}

export default Home;