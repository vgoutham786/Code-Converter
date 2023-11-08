const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
app.use(cors())
dotenv.config();

app.get("/get-api-key", (req, res) => {
    const apiKey = process.env.OPENAI_API_KEY;
    res.json({ apiKey });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
