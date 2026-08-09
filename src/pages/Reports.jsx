import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import ReactMarkdown from "react-markdown";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Reports() {
  const [report, setReport] = useState("");
  const [batchInfo, setBatchInfo] = useState(null);

  useEffect(() => {
    const savedReport = localStorage.getItem("aiReport");
    const savedBatch = localStorage.getItem("aiReportBatch");

    if (savedReport) {
      setReport(savedReport);
    }

    if (savedBatch) {
      try {
        setBatchInfo(JSON.parse(savedBatch));
      } catch (error) {
        console.error("Failed to read batch information:", error);
      }
    }
  }, []);

  // =========================
  // EXPORT REPORT AS PDF
  // =========================
  const downloadPDF = () => {
    if (!report) {
      alert("No report available.");
      return;
    }

    try {
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 18;
      const contentWidth = pageWidth - margin * 2;

      let y = 20;

      // -------------------------
      // Header
      // -------------------------

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(20);
      pdf.setTextColor(0, 128, 60);

      pdf.text(
        "AI Quality & Compliance Report",
        margin,
        y
      );

      y += 12;

      // -------------------------
      // Batch Information
      // -------------------------

      pdf.setDrawColor(210, 210, 210);
      pdf.line(
        margin,
        y,
        pageWidth - margin,
        y
      );

      y += 10;

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.setTextColor(30, 30, 30);

      pdf.text("Batch Information", margin, y);

      y += 8;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);

      if (batchInfo) {
        pdf.text(
          `Batch ID: ${batchInfo.batchId || "N/A"}`,
          margin,
          y
        );

        pdf.text(
          `Product: ${batchInfo.product || "N/A"}`,
          margin + 75,
          y
        );

        y += 7;

        pdf.text(
          `Quantity: ${batchInfo.quantity || "N/A"} ${
            batchInfo.unit || ""
          }`,
          margin,
          y
        );

        pdf.text(
          `Status: ${batchInfo.status || "N/A"}`,
          margin + 75,
          y
        );

        y += 10;
      }

      pdf.setDrawColor(210, 210, 210);

      pdf.line(
        margin,
        y,
        pageWidth - margin,
        y
      );

      y += 10;

      // -------------------------
      // Parse AI Markdown
      // -------------------------

      const lines = report.split("\n");

      lines.forEach((originalLine) => {
        let line = originalLine.trim();

        if (!line) {
          y += 4;
          return;
        }

        // Remove markdown heading symbols
        if (line.startsWith("#")) {
          line = line.replace(/^#+\s*/, "");

          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(14);
          pdf.setTextColor(20, 55, 90);

          const headingLines = pdf.splitTextToSize(
            line,
            contentWidth
          );

          headingLines.forEach((headingLine) => {
            if (y > pageHeight - 25) {
              pdf.addPage();
              y = 20;
            }

            pdf.text(
              headingLine,
              margin,
              y
            );

            y += 7;
          });

          y += 3;

          return;
        }

        // Remove bullet markdown
        let isBullet = false;

        if (line.startsWith("- ")) {
          isBullet = true;
          line = line.substring(2);
        }

        // Remove bold markdown
        line = line.replace(/\*\*/g, "");

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        pdf.setTextColor(40, 40, 40);

        const textLines = pdf.splitTextToSize(
          line,
          isBullet
            ? contentWidth - 8
            : contentWidth
        );

        textLines.forEach((textLine, index) => {
          if (y > pageHeight - 20) {
            pdf.addPage();
            y = 20;
          }

          if (isBullet && index === 0) {
            pdf.text("•", margin, y);

            pdf.text(
              textLine,
              margin + 5,
              y
            );
          } else {
            pdf.text(
              textLine,
              isBullet
                ? margin + 5
                : margin,
              y
            );
          }

          y += 6;
        });

        y += 2;
      });

      // -------------------------
      // Footer
      // -------------------------

      const totalPages =
        pdf.internal.getNumberOfPages();

      for (let page = 1; page <= totalPages; page++) {
        pdf.setPage(page);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);
        pdf.setTextColor(120, 120, 120);

        pdf.text(
          "AI-Powered Batch Traceability & Quality Intelligence Platform",
          margin,
          pageHeight - 10
        );

        pdf.text(
          `Page ${page} of ${totalPages}`,
          pageWidth - margin - 25,
          pageHeight - 10
        );
      }

      const batchId =
        batchInfo?.batchId || "Batch";

      pdf.save(
        `AI-Quality-Report-${batchId}.pdf`
      );
    } catch (error) {
      console.error("PDF export error:", error);
      alert("Failed to export PDF.");
    }
  };

  // =========================
  // CLEAR REPORT
  // =========================

  const clearReport = () => {
    localStorage.removeItem("aiReport");
    localStorage.removeItem("aiReportBatch");

    setReport("");
    setBatchInfo(null);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 px-4 py-10">

        <div className="max-w-6xl mx-auto">

          {/* PAGE HEADER */}

          <div className="mb-8">

            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Reports
            </h1>

            <p className="text-gray-600">
              AI-generated quality and compliance reports.
            </p>

          </div>

          {/* NO REPORT */}

          {!report && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">

              <div className="text-6xl mb-5">
                📄
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                No Report Available
              </h2>

              <p className="text-gray-500">
                Generate an AI Quality Report from the
                Dashboard to view it here.
              </p>

            </div>
          )}

          {/* REPORT */}

          {report && (
            <>

              {/* REPORT SUMMARY CARD */}

              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                  <div>

                    <div className="flex items-center gap-3 mb-3">

                      <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                        📋
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold text-green-700">
                          AI Quality Report
                        </h2>

                        <p className="text-sm text-gray-500">
                          Quality & Compliance Analysis
                        </p>
                      </div>

                    </div>

                    {batchInfo && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">

                        <div>
                          <p className="text-xs uppercase tracking-wide text-gray-500">
                            Batch ID
                          </p>

                          <p className="font-semibold text-gray-800">
                            {batchInfo.batchId}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-wide text-gray-500">
                            Product
                          </p>

                          <p className="font-semibold text-gray-800">
                            {batchInfo.product}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-wide text-gray-500">
                            Status
                          </p>

                          <span
                            className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${
                              batchInfo.status === "Approved"
                                ? "bg-green-100 text-green-700"
                                : batchInfo.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : batchInfo.status === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {batchInfo.status}
                          </span>
                        </div>

                      </div>
                    )}

                  </div>

                  {/* ACTION BUTTONS */}

                  <div className="flex flex-wrap gap-3">

                    <button
                      onClick={downloadPDF}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
                    >
                      📥 Export PDF
                    </button>

                    <button
                      onClick={clearReport}
                      className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg font-semibold transition"
                    >
                      🗑 Clear Report
                    </button>

                  </div>

                </div>

              </div>

              {/* PROFESSIONAL REPORT DOCUMENT */}

              <article
                id="report-content"
                className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
              >

                {/* DOCUMENT HEADER */}

                <div className="bg-green-700 text-white px-8 py-7">

                  <div className="flex items-center gap-4">

                    <div className="text-4xl">
                      🌿
                    </div>

                    <div>

                      <h2 className="text-3xl font-bold">
                        AI Quality & Compliance Report
                      </h2>

                      <p className="text-green-100 mt-1">
                        AI-Powered Batch Traceability Platform
                      </p>

                    </div>

                  </div>

                </div>

                {/* BATCH INFORMATION */}

                {batchInfo && (
                  <div className="px-8 py-6 bg-gray-50 border-b">

                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                      Batch Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10">

                      <div>
                        <p className="text-sm text-gray-500">
                          Batch ID
                        </p>

                        <p className="font-semibold text-gray-900">
                          {batchInfo.batchId}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Product
                        </p>

                        <p className="font-semibold text-gray-900">
                          {batchInfo.product}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Quantity
                        </p>

                        <p className="font-semibold text-gray-900">
                          {batchInfo.quantity}{" "}
                          {batchInfo.unit}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Current Status
                        </p>

                        <p className="font-semibold text-gray-900">
                          {batchInfo.status}
                        </p>
                      </div>

                    </div>

                  </div>
                )}

                {/* AI REPORT CONTENT */}

                <div className="px-8 py-8">

                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => (
                        <h1 className="text-3xl font-bold text-green-700 mt-4 mb-6">
                          {children}
                        </h1>
                      ),

                      h2: ({ children }) => (
                        <div className="mt-8 mb-4 pb-2 border-b border-gray-200">
                          <h2 className="text-2xl font-bold text-gray-800">
                            {children}
                          </h2>
                        </div>
                      ),

                      h3: ({ children }) => (
                        <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">
                          {children}
                        </h3>
                      ),

                      p: ({ children }) => (
                        <p className="text-gray-700 leading-8 mb-4">
                          {children}
                        </p>
                      ),

                      ul: ({ children }) => (
                        <ul className="list-disc pl-7 space-y-2 mb-5 text-gray-700">
                          {children}
                        </ul>
                      ),

                      ol: ({ children }) => (
                        <ol className="list-decimal pl-7 space-y-2 mb-5 text-gray-700">
                          {children}
                        </ol>
                      ),

                      li: ({ children }) => (
                        <li className="leading-7">
                          {children}
                        </li>
                      ),

                      strong: ({ children }) => (
                        <strong className="font-bold text-gray-900">
                          {children}
                        </strong>
                      ),

                      hr: () => (
                        <hr className="my-8 border-gray-300" />
                      ),
                    }}
                  >
                    {report}
                  </ReactMarkdown>

                </div>

                {/* DOCUMENT FOOTER */}

                <div className="px-8 py-5 bg-gray-50 border-t">

                  <div className="flex flex-col md:flex-row md:justify-between gap-2 text-sm text-gray-500">

                    <p>
                      AI-Powered Batch Traceability & Quality Intelligence Platform
                    </p>

                    <p>
                      Generated Report
                    </p>

                  </div>

                </div>

              </article>

            </>
          )}

        </div>

      </main>

      <Footer />
    </>
  );
}

export default Reports;