import React from "react";

function QRExportCSV({ qrCodes }) {
    const handleExportCSV = () => {
        let csvContent = "data:text/csv;charset=utf-8,Table,URL\n";
        qrCodes.forEach(({ table, url }) => {
            csvContent += `${table},${url}\n`;
        });
        const link = document.createElement("a");
        link.href = encodeURI(csvContent);
        link.download = "qr_codes.csv";
        link.click();
    };

    return <button onClick={handleExportCSV}>Export QR Links as CSV</button>;
}

export default QRExportCSV;
