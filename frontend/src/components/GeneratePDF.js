import React from "react";
import { Page, Text, View, Document, StyleSheet, Image, PDFDownloadLink } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    qrContainer: {
        width: "30%", // 3 QR codes per row
        textAlign: "center",
        marginBottom: 20,
        padding: 10,
        border: "1px solid #000", // Adds a border around each QR code
    },
    qrImage: {
        width: 100,
        height: 100,
    },
    tableText: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 5,
    },
});

const QRCodePDF = ({ qrCodes }) => (
    <Document>
        <Page size="LETTER" style={styles.page}>
            {qrCodes.map(({ table, qrImage }) => (
                <View key={table} style={styles.qrContainer}>
                    <Image style={styles.qrImage} src={qrImage} />
                    <Text style={styles.tableText}>Table {table}</Text>
                </View>
            ))}
        </Page>
    </Document>
);

const GeneratePDF = ({ qrCodes }) => (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
        {qrCodes.length > 0 && (
            <PDFDownloadLink document={<QRCodePDF qrCodes={qrCodes} />} fileName="restaurant_qr_codes.pdf">
                {({ loading }) => (
                    <button style={buttonStyle}>{loading ? "Generating PDF..." : "Download QR Codes PDF"}</button>
                )}
            </PDFDownloadLink>
        )}
    </div>
);

const buttonStyle = {
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
};

export default GeneratePDF;
