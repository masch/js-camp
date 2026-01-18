import express from "express";
import jobs from "./jobs.json" with { type: "json" }; // In order to read JSON files on ESM
import { DEFAULTS } from "./config.js";

const PORT = process.env.PORT || DEFAULTS.PORT;
const app = express();

app.get("/", (req, res) => {
    return res.json({
        message: "Hello World!",
    });
});

app.get("/get-jobs", (req, res) => {
    const { text, level, limit = DEFAULTS.LIMIT_PAGINATION, technology, offset = DEFAULTS.LIMIT_OFFSET } = req.query;

    let filteredJobs = [...jobs];

    if (text) {
        const searchTerm = text.toLowerCase();
        filteredJobs = filteredJobs.filter((job) =>
            job.title.toLowerCase().includes(searchTerm)
            || job.description.toLowerCase().includes(searchTerm)
        );
    }

    if (technology) {
        filteredJobs = filteredJobs.filter((job) =>
            job.data.technology.includes(technology)
        );
    }

    if (level) {
        filteredJobs = filteredJobs.filter((job) =>
            job.data.level.includes(level)
        );
    }

    const limitNumber = Number(limit)
    const offsetNumber = Number(offset)

    const paginatedJobs = filteredJobs.slice(
        offsetNumber,
        offsetNumber + limitNumber);

    return res.json({
        jobs: paginatedJobs
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