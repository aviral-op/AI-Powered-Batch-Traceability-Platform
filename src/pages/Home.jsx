import { useState, useEffect } from "react";
import axios from "axios";
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
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  axios
    .get("http://localhost:5000/api/batches")
    .then((response) => {
      setBatches(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }, []);
  if (loading) {
  return <Loader />;
  }
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
    {batches.map((batch) => (
    <BatchCard
      key={batch.id}
      batchId={batch.name}
      product="Herbal Product"
      status={batch.status}
     />
     ))}
    </div>

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