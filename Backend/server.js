const express = require("express");
const cors = require("cors");
const qr = require("qrcode");
const { generateRestaurantId } = require("./utils/generateId");
const tokens = require("./utils/tokens.json");
const puppeteer = require('puppeteer');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.post("/generate-qr", async (req, res) => {
    try {
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
    } catch (error) {
        console.error("QR generation error:", error);
        res.status(500).json({ error: "QR generation failed" });
    }
});

app.post('/download-pdf', async (req, res) => {
    try {
        const { qrCodes } = req.body;
        if (!qrCodes) return res.status(400).send("Invalid request");

        const browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });
        const page = await browser.newPage();
        
        // Simplified HTML/CSS with no shadows
        const htmlContent = `
        <html>
            <head>
                <style>
                    body { 
                        padding: 20px; 
                        font-family: Arial, sans-serif; 
                        background-color: #fff; /* White background */
                        margin: 0; /* Remove default margin */
                    }
                    .container { 
                        display: flex; 
                        flex-wrap: wrap; 
                        justify-content: center; 
                        gap: 20px; 
                        padding: 20px; 
                        background-color: #fff; /* Ensure white background */
                    }
                    .qrWrapper { 
                        text-align: center; 
                        margin: 0; /* Remove margin */
                        padding: 0; /* Remove padding */
                    }
                    .qrBox { 
                        display: flex; 
                        flex-direction: column; 
                        align-items: center; 
                        padding: 15px; 
                        border: 4px solid black; /* Keep border */
                        border-radius: 10px; 
                        background-color: #fff; /* Ensure white background */
                        margin: 0; /* Remove margin */
                        /* No box-shadow */
                    }
                    .qrImage { 
                        width: 150px; 
                        height: 150px; 
                        margin: 0; /* Remove margin */
                    }
                    .tableLabel { 
                        margin-top: 5px; 
                        padding: 5px; 
                        background-color: white; 
                        color: black; 
                        font-size: 18px; 
                        font-weight: bold; 
                        text-align: center; 
                        width: 100px; 
                        border-radius: 5px; 
                        border: 2px solid black; 
                        margin: 0; /* Remove margin */
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    ${qrCodes.map(({ table, qrImage }) => `
                        <div class="qrWrapper">
                            <div class="qrBox">
                                <img src="${qrImage}" class="qrImage" />
                                <div class="tableLabel">Table ${table}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </body>
        </html>`;

        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        await page.waitForSelector('.qrBox', { timeout: 5000 });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
            scale: 0.8,
            timeout: 30000
        });

        await browser.close();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="qr_codes.pdf"');
        res.send(Buffer.from(pdfBuffer));

    } catch (error) {
        console.error("PDF Error:", error);
        res.status(500).send("PDF generation failed");
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));