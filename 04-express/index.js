import express from "express";

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
    return res.json({
        message: "Hello World!",
    });
});

app.get("/health", (req, res) => {
    return res.json({
        status: "OK",
        uptime: process.uptime(),
    });
});

app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
});