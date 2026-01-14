import { createServer } from "node:http";

process.loadEnvFile()

const port = process.env.PORT ?? 0

const server = createServer((req, res) => {
    console.log('Request received', req.method, req.url)

    res.statusCode = 200
    res.setHeader("Content-Type", "text/plain; charset=utf-8")
    res.end("Hello from Node.js 😁")
})

server.listen(port, () => {
    const address = server.address()

    console.log(`Server running at http://localhost:${address.port}`)
})