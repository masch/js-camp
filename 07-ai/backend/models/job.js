import jobs from "../jobs.json" with { type: "json" }; // In order to read JSON files on ESM    
import { DEFAULTS } from "../config.js";

export class JobModel {

    static async getAll({ text, title, level, limit = DEFAULTS.LIMIT_PAGINATION, technology, offset = DEFAULTS.LIMIT_OFFSET }) {

        let filteredJobs = jobs;

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

        return paginatedJobs;
    }

    static async create({ titulo, empresa, ubicacion, data }) {
        const newJob = {
            id: crypto.randomUUID(),
            titulo,
            empresa,
            ubicacion,
            data,
        };

        jobs.push(newJob);

        return newJob;
    }

    static async getById({ id }) {
        const job = jobs.find((job) => job.id === id);
        return job;
    }

    static async update({ id, titulo, empresa, ubicacion, data }) {
        const jobIndex = jobs.findIndex((job) => job.id === id);
        if (jobIndex === -1) {
            throw new Error("Job not found");
        }
        jobs[jobIndex] = {
            ...jobs[jobIndex],
            titulo,
            empresa,
            ubicacion,
            data,
        };
        return jobs[jobIndex];
    }


    static async deleteById({ id }) {
        const jobIndex = jobs.findIndex((job) => job.id === id);
        if (jobIndex === -1) {
            throw new Error("Job not found");
        }
        jobs.splice(jobIndex, 1);
    }


}