import axios from "axios";

const API_URL = "http://localhost:5000";

export const generateQRCodes = async (restaurantName, numTables, qrSize) => {
    const response = await axios.post(`${API_URL}/generate-qr`, {
        restaurantName, numTables, qrSize
    });
    return response.data;
};
