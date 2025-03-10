import React from "react";

function QRDownloadButton({ qrCodes }) {
    const handleDownload = (imgSrc, table) => {
        const link = document.createElement("a");
        link.href = imgSrc;
        link.download = `Table_${table}.png`;
        link.click();
    };

    return (
        <div>
            {qrCodes.map(({ table, qrImage }) => (
                <button key={table} onClick={() => handleDownload(qrImage, table)}>
                    Download Table {table} QR Code
                </button>
            ))}
        </div>
    );
}

export default QRDownloadButton;
