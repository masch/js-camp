import express from "express";
import { corsMiddleware } from "./middlewares/cors.js";
import { jobsRouter } from "./routes/jobs.js";
import { aiRouter } from "./routes/ai.js";
import { DEFAULTS } from "./config.js";
import { systemRouter } from "./routes/system.js";

const PORT = process.env.PORT || DEFAULTS.PORT;
const app = express();

// Trust the first proxy (e.g., Nginx, Cloudflare, or Docker's proxy)
// This is necessary to get the real client IP address
app.set('trust proxy', 1);

app.use("/", systemRouter);
app.use(corsMiddleware());
app.use(express.json());

app.use("/jobs", jobsRouter);
app.use("/ai", aiRouter);

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV) {
    app.listen(PORT, () => {
        console.log(`Server started on port http://localhost:${PORT}`);
    });
}

export default app;