import React from "react";
import axios from "axios";

const GeneratePDF = ({ qrCodes }) => {
    const handleDownload = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/download-pdf",
                { qrCodes },
                { responseType: "arraybuffer" } // Changed from blob to arraybuffer
            );
    
            // Create blob directly from ArrayBuffer
            const blob = new Blob([response.data], { type: 'application/pdf' });
            
            // Force download
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'qr_codes.pdf';
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            setTimeout(() => {
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            }, 100);
        } catch (err) {
            console.error("Download error:", err);
            alert('Download failed. Check console for details.');
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            {qrCodes.length > 0 && (
                <button style={{
                    padding: "10px 15px",
                    fontSize: "16px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }} onClick={handleDownload}>
                    Download QR Codes PDF
                </button>
            )}
        </div>
    );
};

export default GeneratePDF;