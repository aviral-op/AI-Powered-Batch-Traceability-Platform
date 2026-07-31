const OpenAI = require("openai");

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

exports.generateQualityReport = async (req, res) => {
  try {
    const { batchId, product, quantity, unit, status } = req.body;

 const prompt = `
You are an experienced Quality Control Expert working in a Herbal & Aromatics manufacturing company.

Analyze the following production batch and generate a professional quality report.

Batch Information:
- Batch ID: ${batchId}
- Product: ${product}
- Quantity: ${quantity} ${unit}
- Current Status: ${status}

Instructions:

- Tailor the report specifically for the given herbal product.
- Mention characteristics that are relevant to this product only.
- If the batch status is Pending, discuss possible concerns and additional quality checks before approval.
- If the batch status is Approved, explain why the batch appears acceptable for use.
- If the batch status is Ready for Dispatch, state that quality verification has been completed and include suitable storage, packaging, and transportation recommendations before shipment.
- If the batch status is Rejected, explain likely reasons for rejection and suggest corrective and preventive actions.
- Vary the wording naturally so reports for different batches are not identical.
- Provide practical recommendations based on the product type and batch status.
- Do not invent laboratory values or certification numbers.

Return ONLY Markdown.

Use exactly these sections:

## 1. Quality Assessment
- Product Description
- Quality Parameters
- Conclusion

## 2. Possible Risks
- Storage Risks
- Handling Risks
- Transport Risks

## 3. Storage Recommendation
- Temperature
- Humidity
- Light Protection
- Packaging

## 4. Compliance Remarks
- Regulatory Compliance
- Certifications (if applicable)

## 5. Final Recommendation

- Keep recommendations realistic for herbal and aromatic products.
- Ensure each report feels unique based on both the product type and batch status.

Rules:
- 180–250 words.
- Professional tone.
- Proper Markdown headings and bullet points.
- No report title.
- No placeholders.
- No horizontal separators.
- No "Prepared By".
`;

    const completion = await client.chat.completions.create({
      model: "Qwen/Qwen2.5-7B-Instruct:together",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const finalReport = `
${completion.choices[0].message.content}

---

### Prepared By

**Aviral Dabral**  
Quality Control Manager  
AI-Powered Batch Traceability & Quality Intelligence Platform  
Date: ${new Date().toLocaleDateString("en-GB")}
`;

    res.status(200).json({
      success: true,
      report: finalReport,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate AI report",
    });
  }
};