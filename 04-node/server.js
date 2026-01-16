import { createServer } from "node:http";
import { uptime } from "node:process";

process.loadEnvFile()

const port = process.env.PORT ?? 0

function sendJson(res, statusCode, data) {
    res.statusCode = statusCode
    res.setHeader("Content-Type", "application/json")
    return res.end(JSON.stringify(data))
}

const server = createServer((req, res) => {
    console.log('Request received', req.method, req.url)

    if (req.url === '/') {
        return sendJson(res, 200, "Hello from Node.js 😁")
    }

    if (req.url === '/users') {
        return sendJson(res, 200, [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Doe' },
        ])
    }

    if (req.url == '/health') {
        return sendJson(res, 200, { status: 'ok', uptime: process.uptime() })
    }

    return sendJson(res, 404, { error: "Not found" })
})

server.listen(port, () => {
    const address = server.address()

    console.log(`Server running at http://localhost:${address.port}`)
})