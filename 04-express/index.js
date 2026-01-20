import express from "express";
import cors from "cors";
import jobs from "./jobs.json" with { type: "json" }; // In order to read JSON files on ESM
import { DEFAULTS } from "./config.js";

const PORT = process.env.PORT || DEFAULTS.PORT;
const app = express();

const ACCEPTED_ORIGINS = [
    "http://localhost:5173",
    "https://jobs.com",
];


app.use(cors({
    origin: (origin, callback) => {
        if (ACCEPTED_ORIGINS.includes(origin)) {
            callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    }
}));

app.use(express.json());


app.use((req, res, next) => {
    const timeString = new Date().toLocaleDateString();
    console.log(`[${timeString}] ${req.method} ${req.url}`);

    next();
})

app.get("/", (req, res) => {
    return res.json({
        message: "Hello World!",
    });
});

app.get("/jobs", (req, res) => {
    const { text, title, level, limit = DEFAULTS.LIMIT_PAGINATION, technology, offset = DEFAULTS.LIMIT_OFFSET } = req.query;

    let filteredJobs = [...jobs];

    if (text) {
        const searchTerm = text.toLowerCase();
        filteredJobs = filteredJobs.filter((job) =>
            job.titulo.toLowerCase().includes(searchTerm)
            || job.descripcion.toLowerCase().includes(searchTerm)
        );
    }

    if (technology) {
        filteredJobs = filteredJobs.filter((job) =>
            job.data.tecnologia.includes(technology)
        );
    }

    if (level) {
        filteredJobs = filteredJobs.filter((job) =>
            job.data.nivel.includes(level)
        );
    }

    const limitNumber = Number(limit)
    const offsetNumber = Number(offset)

    const paginatedJobs = filteredJobs.slice(
        offsetNumber,
        offsetNumber + limitNumber);

    return res.json({
        data: paginatedJobs,
        total: filteredJobs.length,
        limit: limitNumber,
        offset: offsetNumber,
    });
});

app.get("/jobs/:id", (req, res) => {
    const { id } = req.params;

    const job = jobs.find((job) => job.id === id);

    if (!job) {
        return res.status(404).json({
            message: "Job not found",
        });
    }

    return res.json(job);
});

app.post("/jobs", (req, res) => {
    const { titulo, empresa, ubicacion, data } = req.body;

    const newJob = {
        id: crypto.randomUUID(),
        titulo,
        empresa,
        ubicacion,
        data,
    };

    jobs.push(newJob);

    return res.status(201).json(newJob);
});

app.delete("/jobs/:id", (req, res) => {
    // TODO: Implement delete job
});


app.put("/jobs/:id", (req, res) => {
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