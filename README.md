# AI-Powered Batch Traceability Platform

An AI-powered full-stack web application designed for herbal and aromatic product batch traceability, quality monitoring, batch management, analytics, and AI-generated quality and compliance reporting.

The platform allows users to securely authenticate, manage production batches, monitor batch status, generate product-specific AI quality reports, and export professional reports as PDF documents.

---

## Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- React Icons
- Recharts
- React Markdown
- jsPDF
- html2canvas

### Backend

- Node.js
- Express.js
- JWT Authentication
- Passport.js
- Google OAuth 2.0
- Express Session
- bcrypt
- dotenv

### Database

- MongoDB Atlas
- Mongoose

### AI Integration

- Hugging Face Router API
- OpenAI SDK
- Qwen/Qwen2.5-7B-Instruct model

### Deployment

- Vercel – Frontend
- Render – Backend
- MongoDB Atlas – Database

---

# Features

## 1. User Authentication

- User registration
- User login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes
- Google OAuth authentication
- Session-based Google authentication
- Logout functionality

---

## 2. Batch Management

Users can manage herbal product production batches through CRUD operations.

### Supported Operations

- Create a new batch
- View all batches
- View batch details
- Update batch information
- Delete batches
- Search batches
- Filter batches by status

### Batch Information

Each batch contains:

- Batch ID
- Product Name
- Quantity
- Unit
- Current Status

### Supported Units

- Liters (L)
- Kilograms (Kg)
- Grams (g)

### Supported Statuses

- Approved
- Pending
- Ready for Dispatch
- Rejected

---

## 3. Dashboard & Analytics

The dashboard provides an overview of the current batch data.

### Dashboard Metrics

- Total Batches
- Approved Batches
- Pending Batches
- Rejected Batches

### Batch Status Overview

A dynamic pie chart is implemented using Recharts to visualize the distribution of batches according to their current status.

The chart displays:

- Approved
- Pending
- Ready for Dispatch
- Rejected

The analytics are generated dynamically from the batch data stored in MongoDB Atlas.

---

# 4. AI-Powered Quality Report Generator

The application includes an AI-powered quality and compliance report generator.

The system uses the Hugging Face Router API through the OpenAI SDK to generate professional reports based on the selected batch.

The AI receives:

- Batch ID
- Product
- Quantity
- Unit
- Current Status

The generated report is tailored according to the product type and batch status.

---

## AI Report Sections

Each generated report contains:

### 1. Quality Assessment

- Product Description
- Quality Parameters
- Conclusion

### 2. Possible Risks

- Storage Risks
- Handling Risks
- Transport Risks

### 3. Storage Recommendation

- Temperature
- Humidity
- Light Protection
- Packaging

### 4. Compliance Remarks

- Regulatory Compliance
- Certifications, where applicable

### 5. Final Recommendation

The AI provides practical recommendations based on the product and its current batch status.

The system is instructed not to invent laboratory values or certification numbers.

---

# 5. Product & Status-Specific AI Reports

The report generation logic changes according to the batch status.

### Pending

The report discusses:

- Potential quality concerns
- Additional quality checks
- Conditions required before approval

### Approved

The report explains:

- Why the batch appears acceptable
- Quality considerations
- Storage and handling recommendations

### Ready for Dispatch

The report focuses on:

- Completed quality verification
- Storage requirements
- Packaging requirements
- Transportation recommendations

### Rejected

The report discusses:

- Possible reasons for rejection
- Corrective actions
- Preventive actions

---

# 6. Reports Page

A dedicated Reports page is implemented for viewing generated AI reports.

The Reports page displays:

- Batch ID
- Product
- Quantity
- Current Status
- AI Quality & Compliance Report
- Quality Assessment
- Risk Analysis
- Storage Recommendations
- Compliance Remarks
- Final Recommendation

The report interface has been designed with a professional report-style layout suitable for quality-control documentation.

---

# 7. PDF Report Export

Generated AI reports can be exported as professionally formatted PDF documents.

The PDF report includes:

- AI Quality & Compliance Report title
- Batch Information
- Batch ID
- Product
- Quantity
- Current Status
- Quality Assessment
- Possible Risks
- Storage Recommendations
- Compliance Remarks
- Final Recommendation

The report is formatted as a structured document rather than simply downloading the raw Markdown text.

The application provides an:

**Export PDF**

button on the Reports page.

---

# 8. Markdown Report Rendering

AI-generated responses are returned in Markdown format.

The frontend uses React Markdown to render:

- Headings
- Bold text
- Bullet points
- Numbered sections
- Paragraphs
- Report formatting

This makes the generated AI report easier to read and present professionally.

---

# Project Structure

```text
AI-Powered-Batch-Traceability-Platform/
│
├── backend/
│   ├── config/
│   │   └── passport.js
│   │
│   ├── controllers/
│   │   ├── aiController.js
│   │   └── authController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Batch.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── aiRoutes.js
│   │   └── authRoutes.js
│   │
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Toast.jsx
│   │   │
│   │   ├── BatchCard.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/
│   │   ├── Batches.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── OAuthSuccess.jsx
│   │   ├── Register.jsx
│   │   └── Reports.jsx
│   │
│   ├── services/
│   │   ├── authService.js
│   │   └── batchService.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env
├── .gitignore
├── index.html
├── package.json
├── README.md
├── vercel.json
└── vite.config.js
 ```

---

# Known Limitations

- Backend is hosted on Render Free Tier.
- Render free instances may spin down after inactivity.
- The first request after inactivity may take approximately 30–60 seconds.
- AI report generation depends on Hugging Face Router API availability.
- Google OAuth requires correctly configured Google Cloud OAuth credentials and callback URLs.
- Role-Based Access Control is not currently implemented.
- Batch history and audit trail are not currently implemented.

---

# Security

The application implements the following security features:

- Password hashing using bcrypt
- JWT-based authentication
- Protected frontend routes
- Google OAuth authentication
- Session-based authentication
- Environment variables for sensitive credentials

Sensitive credentials such as MongoDB connection strings, JWT secrets, Google OAuth credentials, and Hugging Face API keys are stored in environment variables and should not be committed to GitHub.

---

# Error Handling

The application includes error handling for:

- Invalid login credentials
- Registration errors
- Failed API requests
- Database connection errors
- AI report generation failures
- Invalid batch data
- Empty batch selection
- PDF export failures

User-friendly error messages are displayed when an operation fails.

---

# Application Workflow

```text
User
  |
  v
Authentication
  |
  +-- Email / Password
  |
  +-- Google OAuth
  |
  v
Dashboard
  |
  +-- Batch Statistics
  +-- Batch Status Chart
  |
  v
Batch Management
  |
  +-- Create Batch
  +-- View Batches
  +-- Update Batch
  +-- Delete Batch
  +-- Search Batch
  +-- Filter by Status
  |
  v
Select Batch
  |
  v
AI Quality Report Generation
  |
  +-- Quality Assessment
  +-- Possible Risks
  +-- Storage Recommendations
  +-- Compliance Remarks
  +-- Final Recommendation
  |
  v
Reports Page
  |
  +-- View AI Report
  +-- Clear Report
  +-- Export PDF
```

  ---

# Project Status

The AI-Powered Batch Traceability Platform is currently in a functional and deployed state.

The core features required for batch management, authentication, analytics, AI-powered quality reporting, and report generation have been implemented.

## Implemented Features

- User Registration and Login
- JWT-based Authentication
- Google OAuth Authentication
- Protected Routes
- Batch Creation
- Batch Viewing
- Batch Updating
- Batch Deletion
- Batch Search
- Batch Status Filtering
- MongoDB Atlas Integration
- Dashboard Statistics
- Batch Status Analytics using Recharts
- AI-Powered Quality Report Generation
- Product-Specific AI Analysis
- Status-Specific AI Recommendations
- Dedicated Reports Page
- Professional AI Report Layout
- Markdown Report Rendering
- PDF Report Export
- Frontend Deployment on Vercel
- Backend Deployment on Render

The application is ready for demonstration and further development.

---

# License

This project is developed for educational purposes as part of the **TBI-GEU Summer Internship 2026**.

The source code is intended for learning, academic evaluation, and demonstration of full-stack web development and AI integration concepts.

© 2026 Aviral Dabral. All rights reserved.

---

# Author

**Aviral Dabral**  
B.Tech Computer Science & Engineering  
TBI-GEU Summer Internship 2026

**Project:**  
AI-Powered Batch Traceability & Quality Intelligence Platform