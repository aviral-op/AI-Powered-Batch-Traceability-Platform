const OpenAI = require("openai");

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

exports.generateQualityReport = async (req, res) => {
  try {
    const { batchId, product, quantity, status } = req.body;

    const prompt = `
You are a Quality Control Expert for a Herbal & Aromatics company.

Generate a professional AI Quality Report for the following batch.

Batch ID: ${batchId}
Product: ${product}
Quantity: ${quantity} liters
Status: ${status}

The report must contain ONLY these sections:

Do NOT include a report title.
Start directly with:

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

Use proper Markdown headings (#, ##, ###), bullet points and spacing.

Rules:
- Return clean Markdown.
- Keep the report between 180 and 250 words.
- Be concise and professional.
- Do NOT use placeholders like [Your Name], [Date], [Contact Information].
- Do NOT include "Prepared By".
- Do NOT include horizontal separators like ---.
- Recommendations must be specific to herbal products.

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