import React from "react";

const QRPreview = ({ qrCodes }) => {
    return (
        <div style={styles.container}>
            {qrCodes.map(({ table, qrImage }) => (
                <div key={table} style={styles.qrWrapper}>
                    <div style={styles.qrBox}>
                        <img src={qrImage} alt={`Table ${table}`} style={styles.qrImage} />
                        <div style={styles.tableLabel}>Table {table}</div>
                    </div>
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
    },
    qrBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "15px",
        border: "4px solid black",
        borderRadius: "10px",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
        backgroundColor: "#fff",
    },
    qrImage: {
        width: "150px",
        height: "150px",
    },
    tableLabel: {
        marginTop: "5px",
        padding: "5px",
        backgroundColor: "white",
        color: "black",
        fontSize: "18px",
        fontWeight: "bold",
        textAlign: "center",
        width: "100px",
        borderRadius: "5px",
        border: "2px solid black",
    },
};

export default QRPreview;
