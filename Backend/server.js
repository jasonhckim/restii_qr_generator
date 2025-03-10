const express = require("express");
const cors = require("cors");
const qr = require("qrcode");
const { generateRestaurantId } = require("./utils/generateId");
const tokens = require("./utils/tokens.json");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate-qr", async (req, res) => {
    const { restaurantName, numTables, qrSize } = req.body;

    if (!restaurantName || numTables < 1 || numTables > 40) {
        return res.status(400).json({ error: "Invalid input" });
    }

    const restaurantId = generateRestaurantId(restaurantName);
    const qrCodes = [];

    for (let i = 1; i <= numTables; i++) {
        const token = tokens[`table_${i}`] || "defaultToken";
        const qrData = `https://restii.com/table?id=${i}&token=${token}&restaurantId=${restaurantId}`;
        const qrImage = await qr.toDataURL(qrData, { width: qrSize * 96 });

        qrCodes.push({ table: i, qrImage });
    }

    res.json({ restaurantId, qrCodes });
});

app.listen(5000, () => console.log("Server running on port 5000"));
