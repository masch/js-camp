import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { json } from "node:stream/consumers";

process.loadEnvFile()

const port = process.env.PORT ?? 0

const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
]

function sendJson(res, statusCode, data) {
    res.statusCode = statusCode
    res.setHeader("Content-Type", "application/json")
    return res.end(JSON.stringify(data))
}

const server = createServer(async (req, res) => {
    console.log('Request received', req.method, req.url)
    const { method, url } = req
    const [pathname, querystring] = url.split('?')
    const searchParams = new URLSearchParams(querystring)

    if (method === 'GET') {
        if (pathname === '/users') {
            const limit = Number(searchParams.get('limit')) || users.length
            const offset = Number(searchParams.get('offset')) || 0

            const paginatedUsers = users.slice(offset, offset + limit)

            return sendJson(res, 200, paginatedUsers)
        }

        if (pathname === '/health') {
            return sendJson(res, 200, { status: 'ok', uptime: process.uptime() })
        }
    }

    if (method === 'POST') {
        if (pathname === '/users') {
            const body = await json(req)

            if (!body || !body.name) {
                return sendJson(res, 400, { error: 'Missing name' })
            }

            const newUser = {
                id: randomUUID(),
                name: body.name,
            }

            users.push(newUser)
            return sendJson(res, 201, newUser)
        }
    }

    if (pathname === '/') {
        return sendJson(res, 200, "Hello from Node.js 😁")
    }


    return sendJson(res, 404, { error: "Not found" })
})

server.listen(port, () => {
    const address = server.address()

    console.log(`Server running at http://localhost:${address.port}`)
})