import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API = "http://localhost:5000/api/batches";

function Batches() {
  const token = localStorage.getItem("token");

  const [batches, setBatches] = useState([]);
  const [name, setName] = useState("");
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
    setName("");
    setStatus("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !status.trim()) {
      setMessage("Please fill all fields.");
      return;
    }

    try {
      if (editingId) {
        await axios.put(
          `${API}/${editingId}`,
          { name, status },
          authConfig
        );
        setMessage("Batch updated successfully.");
      } else {
        await axios.post(
          API,
          { name, status },
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
    setName(batch.name);
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
          className="grid md:grid-cols-3 gap-4 mb-8"
        >
          <input
            className="border rounded p-2"
            placeholder="Batch Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

        <select
           className="border rounded p-2"
           value={status}
           onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Ready for Dispatch">Ready for Dispatch</option>
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
                  <th className="border p-2">Batch Name</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {batches.map((batch) => (
                  <tr key={batch._id}>
                    <td className="border p-2">{batch.name}</td>
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
