const crypto = require("crypto");

function generateRestaurantId(name) {
    return crypto.createHash("sha256").update(name).digest("hex").substring(0, 15);
}

module.exports = { generateRestaurantId };
