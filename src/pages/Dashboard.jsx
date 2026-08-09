import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

import {
  FaBoxes,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState("");
  const [error, setError] = useState("");

  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");

  // =========================
  // Batch Statistics
  // =========================

  const totalBatches = batches.length;

  const approvedBatches = batches.filter(
    (batch) => batch.status === "Approved"
  ).length;

  const pendingBatches = batches.filter(
    (batch) => batch.status === "Pending"
  ).length;

  const readyBatches = batches.filter(
    (batch) => batch.status === "Ready for Dispatch"
  ).length;

  const rejectedBatches = batches.filter(
    (batch) => batch.status === "Rejected"
  ).length;

  // =========================
  // Chart Data
  // =========================

  const chartData = [
    {
      name: "Approved",
      value: approvedBatches,
    },
    {
      name: "Pending",
      value: pendingBatches,
    },
    {
      name: "Rejected",
      value: rejectedBatches,
    },
    {
      name: "Ready for Dispatch",
      value: readyBatches,
    },
  ];

  const chartColors = [
    "#16a34a",
    "#eab308",
    "#dc2626",
    "#9333ea",
  ];

  // =========================
  // Fetch Batches
  // =========================

  const fetchBatches = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/batches`
      );

      setBatches(res.data);

      if (res.data.length > 0) {
        setSelectedBatch(res.data[0]._id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  // =========================
  // Generate AI Report
  // =========================

  const generateReport = async () => {
    try {
      setLoading(true);
      setError("");
      setReport("");

      const batch = batches.find(
        (b) => b._id === selectedBatch
      );

      if (!batch) {
        setError("Please select a batch.");
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/ai/quality-report`,
        {
          batchId: batch.batchId,
          product: batch.product,
          quantity: batch.quantity,
          unit: batch.unit,
          status: batch.status,
        }
      );

      setReport(res.data.report);
      localStorage.setItem("aiReport", res.data.report);

      localStorage.setItem(
      "aiReportBatch",
      JSON.stringify(batch)
      );
    } catch (err) {
      console.error(err);
      setError("Failed to generate AI report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-10 min-h-screen">

        {/* =========================
            Dashboard Heading
        ========================= */}

        <h1 className="text-4xl font-bold mb-4">
          Dashboard
        </h1>

        <p className="mb-6">
          Analytics and overview of herbal batch traceability data.
        </p>

        {/* =========================
            Analytics Cards
        ========================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          {/* Total Batches */}

          <div className="bg-blue-100 rounded-xl p-6 shadow hover:shadow-xl transition">
            <FaBoxes className="text-3xl text-blue-600 mb-3" />

            <h3 className="text-lg font-semibold">
              Total Batches
            </h3>

            <p className="text-3xl font-bold">
              {totalBatches}
            </p>
          </div>


          {/* Approved */}

          <div className="bg-green-100 rounded-xl p-6 shadow hover:shadow-xl transition">
            <FaCheckCircle className="text-3xl text-green-600 mb-3" />

            <h3 className="text-lg font-semibold">
              Approved
            </h3>

            <p className="text-3xl font-bold">
              {approvedBatches}
            </p>
          </div>


          {/* Pending */}

          <div className="bg-yellow-100 rounded-xl p-6 shadow hover:shadow-xl transition">
            <FaClock className="text-3xl text-yellow-600 mb-3" />

            <h3 className="text-lg font-semibold">
              Pending
            </h3>

            <p className="text-3xl font-bold">
              {pendingBatches}
            </p>
          </div>


          {/* Rejected */}

          <div className="bg-red-100 rounded-xl p-6 shadow hover:shadow-xl transition">
            <FaTimesCircle className="text-3xl text-red-600 mb-3" />

            <h3 className="text-lg font-semibold">
              Rejected
            </h3>

            <p className="text-3xl font-bold">
              {rejectedBatches}
            </p>
          </div>

        </div>


        {/* =========================
            Batch Status Chart
        ========================= */}

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">

          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Batch Status Overview
          </h2>

          <div className="w-full h-80">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >

                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={chartColors[index]}
                    />
                  ))}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* =========================
            Batch Selection
        ========================= */}

        <select
          value={selectedBatch}
          onChange={(e) =>
            setSelectedBatch(e.target.value)
          }
          className="border p-3 rounded mb-6 block w-80"
        >

          {batches.map((batch) => (
            <option
              key={batch._id}
              value={batch._id}
            >
              {batch.batchId} - {batch.product} (
              {batch.status})
            </option>
          ))}

        </select>


        {/* =========================
            Generate AI Report Button
        ========================= */}

        <button
          onClick={generateReport}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
        >
          Generate AI Report
        </button>


        {/* =========================
            Loading
        ========================= */}

        {loading && (
          <p className="mt-6 text-blue-600 font-semibold">
            Generating AI Report...
          </p>
        )}


        {/* =========================
            Error
        ========================= */}

        {error && (
          <p className="mt-6 text-red-600 font-semibold">
            {error}
          </p>
        )}


        {/* =========================
            AI Quality Report
        ========================= */}

        {report && (
          <div className="mt-8 bg-white rounded-xl shadow-xl border border-gray-200 p-8 max-w-5xl mx-auto">

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-2xl font-bold text-green-700">
                AI Quality Report
              </h2>

            </div>


            <div
              className="
                max-w-none
                leading-8
                text-gray-800
                space-y-4
                [&>h1]:text-3xl
                [&>h1]:font-bold
                [&>h1]:text-green-700
                [&>h2]:text-2xl
                [&>h2]:font-bold
                [&>h2]:mt-8
                [&>h2]:mb-3
                [&>h3]:text-xl
                [&>h3]:font-semibold
                [&>p]:mb-4
                [&>ul]:list-disc
                [&>ul]:pl-6
                [&>ol]:list-decimal
                [&>ol]:pl-6
                [&>li]:mb-2
                [&>hr]:my-6
              "
            >

              <ReactMarkdown>
                {report}
              </ReactMarkdown>

            </div>

          </div>
        )}


        {/* =========================
            Clear Report
        ========================= */}

        {report && (
          <div className="max-w-5xl mx-auto mt-4 flex justify-end">

            <button
              onClick={() => setReport("")}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
            >
              Clear Report
            </button>

          </div>
        )}

      </div>

      <Footer />
    </>
  );
}

export default Dashboard;