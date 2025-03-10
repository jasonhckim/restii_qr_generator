import React from "react";

const QRPreview = ({ qrCodes }) => {
    return (
        <div style={styles.container}>
            {qrCodes.map(({ table, qrImage }) => (
                <div key={table} style={styles.qrWrapper}>
                    <img src={qrImage} alt={`Table ${table}`} style={styles.qrImage} />
                    <p style={styles.tableText}>Table {table}</p>
                </div>
            ))}
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
        padding: "20px",
    },
    qrWrapper: {
        textAlign: "center",
        padding: "15px",
        border: "2px solid black",
        borderRadius: "10px",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
        backgroundColor: "#fff",
    },
    qrImage: {
        width: "150px",
        height: "150px",
    },
    tableText: {
        fontSize: "16px",
        fontWeight: "bold",
        marginTop: "10px",
    },
};

export default QRPreview;
