# PROMPTS.md

# Week 7 - AI Prompt Log

## Prompt Variation 1

### Prompt

Generate a quality assessment report for the following herbal batch.

Include:
- Product description
- Quality assessment
- Risks
- Storage recommendations
- Compliance remarks
- Final recommendation

### Example Input

Batch ID: HB101

Product: Tulsi Oil

Purity: 95%

Color: Pale Yellow

Storage: Cool and Dry Place

### Example Output

A structured quality report describing the product, quality parameters, possible risks, storage recommendations, compliance remarks, and final recommendation.

---

## Prompt Variation 2

### Prompt

You are a Quality Control Manager of a herbal manufacturing company.

Generate a professional quality report for the given batch.

Use clear headings and bullet points.

Keep the report concise and suitable for industry documentation.

### Example Input

Batch ID: HB101

Product: Tulsi Oil

Purity: 95%

### Example Output

A concise professional report with quality assessment, risks, compliance status, and recommendations.

---

## Prompt Variation 3 (Final Prompt)

### Prompt

You are an experienced Quality Control Manager in a herbal manufacturing company.

Generate a professional Batch Quality Report in Markdown.

Include:

1. Quality Assessment
2. Possible Risks
3. Storage Recommendations
4. Compliance Remarks
5. Final Recommendation

Use clear headings, bullet points where appropriate, and concise professional language.

Do not use placeholders.

### Example Input

Batch ID: HB101

Product: Tulsi Oil

Purity: 95%

Color: Pale Yellow

Storage: Cool and Dry Place

### Example Output

A complete Markdown-based quality report including quality assessment, risks, storage recommendations, compliance remarks, and final recommendation.

---

# Best Prompt

Prompt Variation 3 produced the best results because it generated a well-structured Markdown report with clear headings and professional formatting. It consistently included all required sections such as quality assessment, risks, storage recommendations, compliance remarks, and the final recommendation. The Markdown output also integrated seamlessly with the React Markdown renderer used in the application, making it the most suitable prompt for the final implementation.

---

# System Role Used

You are an experienced Quality Control Manager in a herbal manufacturing company responsible for preparing professional batch quality reports for herbal products.