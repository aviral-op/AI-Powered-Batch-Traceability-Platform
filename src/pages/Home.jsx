import { useState } from "react";
import Modal from "../components/ui/Modal";
import Loader from "../components/ui/Loader";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BatchCard from "../components/BatchCard";
import Footer from "../components/Footer";
import Toast from "../components/ui/Toast";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <button
      onClick={() => setIsModalOpen(true)}
      className="bg-blue-600 text-white px-4 py-2 rounded"
      >
      Open Modal
      </button>
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

     <Modal
     isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    title="Batch Information"
     >
    <p>This is a demo modal for Week 3.</p>
    </Modal>

    <Toast message="Batch Saved Successfully!" />
    <Footer />
    </div>
  );
}

export default Home;