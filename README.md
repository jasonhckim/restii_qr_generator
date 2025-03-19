# Restii QR Generator

A full-stack application for generating QR codes for restaurant tables. The app includes a backend for QR code generation and PDF export, and a frontend for previewing and downloading QR codes.

---

## Features

- **QR Code Generation**: Generate QR codes for restaurant tables with unique URLs.
- **PDF Export**: Download QR codes as a PDF with a clean, printable layout.
- **Frontend Preview**: Preview QR codes in a grid layout before downloading.
- **CSV Export**: Export QR code URLs as a CSV file.

---

## Technologies Used

- **Backend**: Node.js, Express, Puppeteer, QRCode
- **Frontend**: React, Vite, Axios
- **Styling**: Inline CSS (React), Plain CSS (Puppeteer)

---

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/jasonhckim/restii_qr_generator.git
   cd restii_qr_generator
   ```
2. **Install Backend Dependencies**:
   ```bash
   Copy
   cd backend
   npm install
   ```
3. **Install Frontend Dependencies**:
   ```bash
   Copy
   cd ../frontend-vite
   npm install
   ```
4. **Start the Backend Server**:
From the backend folder:
   ```bash
   Copy
   npm start
   ```
The backend will run on http://localhost:5000.

5. **Start the Frontend Development Server**:
From the frontend-vite folder:
   ```bash
   Copy
   npm run dev
   ```
The frontend will run on http://localhost:5173.

---

# Usage

1. **Generate QR Codes**:
- Enter the restaurant name, number of tables, and QR code size in the frontend.
- Click "Generate QR Codes" to preview the QR codes.
2. **Download PDF**:
- Click "Download QR Codes PDF" to download a PDF with all the QR codes.
3. **Export CSV**:
- Click "Export QR Links as CSV" to download a CSV file containing the QR code URLs.

---

# Project Structure
   ```bash
   Copy
   restii_qr_generator/
   ├── backend/                  # Backend code
   │   ├── server.js             # Express server and QR generation logic
   │   ├── utils/                # Utility functions (e.g., ID generation)
   │   └── package.json          # Backend dependencies
   ├── frontend-vite/            # Frontend code
   │   ├── src/                  # React components and logic
   │   └── package.json          # Frontend dependencies
   └── README.md                 # Project documentation
   ```
---

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](https://choosealicense.com/licenses/mit/) file for details.

---

## Acknowledgments  
- [QRCode](https://www.npmjs.com/package/qrcode) for QR code generation.  
- [Puppeteer](https://pptr.dev/) for PDF generation.  
- [Vite](https://vitejs.dev/) for fast frontend development.  
