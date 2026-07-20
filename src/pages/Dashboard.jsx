import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState("");
  const [error, setError] = useState("");

  const generateReport = async () => {
    try {
      setLoading(true);
      setError("");
      setReport("");

      const res = await axios.post(
        "http://localhost:5000/api/ai/quality-report",
        {
          batchId: "HB101",
          product: "Tulsi Oil",
          quantity: 500,
          status: "Ready for Dispatch",
        }
      );

      setReport(res.data.report);
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
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>

        <p className="mb-6">
          Analytics and overview of herbal batch traceability data.
        </p>

        <button
          onClick={generateReport}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
        >
          Generate AI Report
        </button>

        {loading && (
          <p className="mt-6 text-blue-600 font-semibold">
            Generating AI Report...
          </p>
        )}

        {error && (
          <p className="mt-6 text-red-600 font-semibold">
            {error}
          </p>
        )}

        {report && (
          <div className="mt-8 bg-white rounded-xl shadow-xl border border-gray-200 p-8 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-5 text-green-700">
              AI Quality Report
            </h2>

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
  <ReactMarkdown>{report}</ReactMarkdown>
</div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;