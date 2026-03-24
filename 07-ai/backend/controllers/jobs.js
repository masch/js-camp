import { JobModel } from "../models/job.js";
import { DEFAULTS } from "../config.js";

export class JobsController {

    static async getAll(req, res) {
        const { text, title, level, limit = DEFAULTS.LIMIT_PAGINATION, technology, offset = DEFAULTS.LIMIT_OFFSET } = req.query;

        const paginatedJobs = await JobModel.getAll({ text, title, level, limit, technology, offset });

        return res.json({
            data: paginatedJobs,
            total: paginatedJobs.length,
            limit,
            offset,
        });
    }

    static async getId(req, res) {
        const { id } = req.params;

        const job = await JobModel.getById({ id });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
            });
        }

        return res.json(job);
    }

    static async create(req, res) {
        const { titulo, empresa, ubicacion, data } = req.body;

        const newJob = await JobModel.create({ titulo, empresa, ubicacion, data });

        return res.status(201).json(newJob);
    }

    static async update(req, res) {
        const { id } = req.params;
        const { titulo, empresa, ubicacion, data } = req.body;

        const job = await JobModel.update({ id, titulo, empresa, ubicacion, data });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
            });
        }

        return res.json(job);
    }

    static async delete(req, res) {
        const { id } = req.params;

        const job = await JobModel.deleteById({ id });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
            });
        }

        return res.json({
            message: "Job deleted",
        });
    }

    static async partialUpdate(req, res) {
        const { id } = req.params;
        const { titulo, empresa, ubicacion, data } = req.body;

        const job = await JobModel.update({ id, titulo, empresa, ubicacion, data });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
            });
        }

        return res.json(job);
    }
}

export default new JobsController();
