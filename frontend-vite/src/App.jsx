import React, { useState } from "react";
import { generateQRCodes } from "./api";
import QRPreview from "./components/QRPreview";
import GeneratePDF from "./components/GeneratePDF"; // 🆕 Import PDF Component

function App() {
    const [restaurantName, setRestaurantName] = useState("");
    const [numTables, setNumTables] = useState(1);
    const [qrSize, setQrSize] = useState(2);
    const [qrCodes, setQrCodes] = useState([]);

    const handleGenerate = async () => {
        const data = await generateQRCodes(restaurantName, numTables, qrSize);
        setQrCodes(data.qrCodes);
    };

    return (
        <div>
            <h2>Restaurant QR Code Generator</h2>
            <input type="text" placeholder="Restaurant Name" onChange={e => setRestaurantName(e.target.value)} />
            <input type="number" min="1" max="40" value={numTables} onChange={e => setNumTables(e.target.value)} />
            <select onChange={e => setQrSize(e.target.value)}>
                <option value="2">2"</option>
                <option value="3">3"</option>
                <option value="4">4"</option>
            </select>
            <button onClick={handleGenerate}>Generate QR Codes</button>

            <QRPreview qrCodes={qrCodes} />
            <GeneratePDF qrCodes={qrCodes} /> {/* 🆕 Add Download PDF Button */}
        </div>
    );
}

export default App;
