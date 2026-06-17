import Loader from "../components/ui/Loader";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BatchCard from "../components/BatchCard";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Navbar />

      <Hero />

      <div className="p-6">
      <Input
       label="Product Name"
       placeholder="Enter Product Name"
      />

      <div className="mt-4">
      <Button
       text="Submit"
       onClick={() => alert("Button Clicked")}
      />
      </div>
    </div>

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
      <Loader />
      <Footer />
    </div>
  );
}

export default Home;