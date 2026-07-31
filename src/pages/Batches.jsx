import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API = "http://localhost:5000/api/batches";

function Batches() {
  const token = localStorage.getItem("token");

  const [batches, setBatches] = useState([]);
  const [batchId, setBatchId] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [status, setStatus] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchBatches = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setBatches(res.data);
    } catch {
      setMessage("Failed to load batches.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  useEffect(() => {
  if (!message) return;

  const timer = setTimeout(() => {
    setMessage("");
  }, 3000);

  return () => clearTimeout(timer);
}, [message]);

  const resetForm = () => {
    setBatchId("");
    setProduct("");
    setQuantity("");
    setUnit("");
    setStatus("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
     !batchId.trim() ||
     !product.trim() ||
     Number(quantity) <=0 ||
     !unit.trim() ||
     !status.trim()
     ) {
      setMessage("Please fill all fields.");
      return;
    }

    try {
      if (editingId) {
        await axios.put(
          `${API}/${editingId}`,
          {
            batchId,
            product,
            quantity: Number(quantity),
            unit,
            status,
          },
          authConfig
        );
        setMessage("Batch updated successfully.");
      } else {
        await axios.post(
          API,
          {
             batchId,
             product,
             quantity: Number(quantity),
             unit,
             status,
          },
          authConfig
        );
        setMessage("Batch added successfully.");
      }

      resetForm();
      fetchBatches();
    } catch {
      setMessage("Operation failed.");
    }
  };

  const handleEdit = (batch) => {
    setEditingId(batch._id);
    setBatchId(batch.batchId);
    setProduct(batch.product);
    setQuantity(batch.quantity);
    setUnit(batch.unit);
    setStatus(batch.status);
    };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this batch?")) return;

    try {
      await axios.delete(`${API}/${id}`, authConfig);
      setMessage("Batch deleted.");
      fetchBatches();
    } catch {
      setMessage("Delete failed.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto p-8 min-h-screen">
        <h1 className="text-4xl font-bold mb-6">
          Batch Management
        </h1>

        {message && (
          <div className="mb-4 bg-green-100 border border-green-400 p-3 rounded">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-6 gap-4 mb-8"
        >
         <input
          className="border rounded p-2"
          placeholder="Batch ID"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value.toUpperCase())}
          />

          <input
          className="border rounded p-2"
          placeholder="Product Name"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          />

          <input
          type="number"
          min="1"
          className="border rounded p-2"
          placeholder="Quantity (Liters)"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          />

          <select
          className="border rounded p-2"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          >
          <option value="" disabled hidden>
          Select Unit
          </option>
          <option value="L">Liter (L)</option>
          <option value="Kg">Kilogram (Kg)</option>
          <option value="g">Gram (g)</option>
          </select>


        <select
           className="border rounded p-2"
           value={status}
           onChange={(e) => setStatus(e.target.value)}
        >
          <option value="" disabled hidden>Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Ready for Dispatch">Ready for Dispatch</option>
          <option value="Rejected">Rejected</option>
        </select>

         <div className="flex gap-2">
        <button
        className="bg-green-600 text-white rounded p-2 w-full"
        type="submit"
        >
        {editingId ? "Update Batch" : "Add Batch"}
        </button>

        {editingId && (
        <button
        type="button"
        onClick={resetForm}
        className="bg-gray-500 text-white rounded p-2"
        >
        Cancel
      </button>
      )}
          </div>
        </form>

        {loading ? (
          <p>Loading batches...</p>
        ) : batches.length === 0 ? (
          <div className="border rounded p-6 text-center">
            No batches found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">Batch ID</th>
                  <th className="border p-2">Product</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Actions</th>
                  </tr>
              </thead>

              <tbody>
                {batches.map((batch) => (
                  <tr key={batch._id}>
                    <td className="border p-2">{batch.batchId}</td>
                    <td className="border p-2">{batch.product}</td>
                    <td className="border p-2"> {batch.quantity} {batch.unit}</td>
                    <td className="border p-2">{batch.status}</td>
                    <td className="border p-2 space-x-2">
                      <button
                        onClick={() => handleEdit(batch)}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(batch._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Batches;
