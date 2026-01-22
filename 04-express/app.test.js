import { test, describe, before, after } from "node:test";

import app from "./app.js";
import assert from "node:assert";

let server
const PORT = 3456
const BASE_URL = `http://localhost:${PORT}`

before(async () => {
    return new Promise((resolve, reject) => {
        server = app.listen(PORT, () => resolve())
        server.on("error", reject)
    })
})

after(async () => {
    return new Promise((resolve, reject) => {
        server.close((err) => {
            if (err) {
                reject(err)
            }
            resolve()
        })
    })
})

describe("GET /jobs", () => {
    test("should return 200 and an array of jobs", async () => {
        const response = await fetch(`${BASE_URL}/jobs`)
        assert.strictEqual(response.status, 200)

        const json = await response.json()
        assert.ok(Array.isArray(json.data), "Response should be an array")
    })

    test("should filter job with technology", async () => {
        const tech = "react"
        const response = await fetch(`${BASE_URL}/jobs?technology=${tech}`)
        assert.strictEqual(response.status, 200)

        const json = await response.json()
        assert.ok(json.data.every(job => job.data.tecnologia.includes(tech)), "All jobs should have technology react")
    })
})
