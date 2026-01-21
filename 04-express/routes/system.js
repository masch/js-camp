import { Router } from "express";

export const systemRouter = Router();

systemRouter.use((req, res, next) => {
    const timeString = new Date().toLocaleDateString();
    console.log(`[${timeString}] ${req.method} ${req.url}`);

    next();
})

systemRouter.get("/health", (req, res) => {
    return res.json({
        status: "OK",
        uptime: process.uptime(),
    });
});
