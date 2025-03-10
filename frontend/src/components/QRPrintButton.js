import React from "react";

function QRPrintButton() {
    return (
        <button onClick={() => window.print()}>
            Print QR Codes
        </button>
    );
}

export default QRPrintButton;
