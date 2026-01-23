import { Router } from "express";
import { JobsController } from "../controllers/jobs.js";
import { validateJob, validatePartialJob } from "../schemas/job.js";

export const jobsRouter = Router();

function validateCreate(req, res, next) {
    const result = validateJob(req.body)
    if (!result.success) {
        console.log(result)
        return res.status(400).json({ error: 'Invalid request', details: result.error })
    }

    req.body = result.data
    next()
}

function validateUpdate(req, res, next) {
    const result = validatePartialJob(req.body)
    if (!result.success) {
        return res.status(400).json({ error: 'Invalid request', details: result.error.errors })
    }

    req.body = result.data
    next()
}

jobsRouter.get("/", JobsController.getAll);
jobsRouter.get("/:id", JobsController.getId);

jobsRouter.post("/", validateCreate, JobsController.create);
jobsRouter.patch("/:id", validateUpdate, JobsController.partialUpdate);

jobsRouter.put("/:id", JobsController.update);
jobsRouter.delete("/:id", JobsController.delete);


