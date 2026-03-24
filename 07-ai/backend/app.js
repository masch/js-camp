import express from "express";
import { corsMiddleware } from "./middlewares/cors.js";
import { jobsRouter } from "./routes/jobs.js";
import { DEFAULTS } from "./config.js";
import { systemRouter } from "./routes/system.js";

const PORT = process.env.PORT || DEFAULTS.PORT;
const app = express();

app.use("/", systemRouter);

app.use(corsMiddleware());
app.use(express.json());

app.use("/jobs", jobsRouter);

if (process.env.NODE_ENV) {
    app.listen(PORT, () => {
        console.log(`Server started on port http://localhost:${PORT}`);
    });
}

export default app;