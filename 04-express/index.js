import express from "express";
import jobs from "./jobs.json" with { type: "json" }; // In order to read JSON files on ESM

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
    return res.json({
        message: "Hello World!",
    });
});

app.get("/get-jobs", (req, res) => {

    return res.json({
        jobs
    });
});

app.get("/get-job/:id", (req, res) => {
    const { id } = req.params;

    const idNumber = Number(id);

    if (isNaN(idNumber)) {
        return res.status(400).json({
            message: "Invalid job ID",
        });
    }

    return res.json({
        job: {
            id: idNumber,
            title: "Job 1",
            description: "Description 1",
        },
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