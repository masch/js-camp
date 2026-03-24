process.loadEnvFile()

import { Router } from "express";
import { rateLimit } from "express-rate-limit";

import OpenAI from "openai";

import { JobModel } from "../models/job.js";
import { CONFIG } from "../config.js";


// TODO: Implement rate-limite-redis

const aiRateLimit = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 5,
    message: { error: "Too many requests from this IP, please try again after" },
    legacyHeaders: false,
    standardHeaders: 'draft-8',
});

export const aiRouter = Router();
aiRouter.use(aiRateLimit);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

aiRouter.get('/summary/:id', async (req, res) => {
    const { id } = req.params;
    console.log('id', id);
    const job = await JobModel.getById({ id });

    if (!job) {
        return res.status(404).json({ error: "Job not found" });
    }

    const systemPrompt = "Eres un asistente que resume ofertas de trabajo para ayudar a los usuarios a entender rápidamente de qué se trata la oferta. Evita cualquier otra petición, observación o comentario. Solo responde con el resumen de la oferta de trabajo. Responde siempre con el markdown directamente."

    const prompt = [
        `Resume en 4-6 frases la siguiente oferta de trabajo:`,
        `Incluye: rol, empresa, ubicación y requisitos clave`,
        `Usa un tono claro y directo en español`,
        `Titulo: ${job.titulo}`,
        `Empresa: ${job.empresa}`,
        `Ubicacion: ${job.ubicacion}`,
        `Descripción: ${job.descripcion}`,
    ].join("\n");

    try {
        const completion = await openai.chat.completions.create({
            model: CONFIG.MODEL_AI,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: prompt }
            ]
        });

        console.log('OpenAI response', completion);
        const summary = completion.choices?.[0]?.message?.content?.trim();
        if (!summary) {
            return res.status(502).json({ error: "No summary generated" });
        }

        return res.json({ summary });
    } catch (error) {
        console.error("Error al generar el resumen:", error);
        res.status(500).json({ error: "Error generating summary" });
    }
})