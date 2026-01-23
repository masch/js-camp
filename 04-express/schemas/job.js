import * as z from "zod";

const jobSchema = z.object({
    titulo: z.
        string({
            errorMap: (issue) => ({
                message: 'El titulo es requerido'
            })
        }).min(3, 'El titulo debe tener al menos 3 caracteres')
        .max(100, 'El titulo debe tener menos de 100 caracteres'),
    empresa: z.string(),
    ubicacion: z.string(),
    descripcion: z.string().optional(),
    data: z.object({
        tecnologia: z.array(z.string()),
        modalidad: z.string(),
        level: z.string(),
    }),
    content: z.object({
        descripcion: z.string(),
        responsibilities: z.string(),
        requirements: z.string(),
        about: z.string(),
    })
})

export function validateJob(input) {
    return jobSchema.safeParse(input)
}

export function validatePartialJob(input) {
    return jobSchema.partial().safeParse(input)
}