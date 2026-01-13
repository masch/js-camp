import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

const dir = process.argv[2] ?? '.'

const formatBytes = (bytes) => {
    if (bytes < 1024) return `${bytes} bytes`
    return `${(bytes / 1024).toFixed(2)} KB`
}

const files = await readdir(dir)

const entries = await Promise.all(
    files.map(async name => {

        const fullPath = join(dir, name)
        const info = await stat(fullPath)

        return {
            name,
            size: formatBytes(info.size),
            isDirectory: info.isDirectory()
        }
    })
)

for (const entry of entries) {
    const icon = entry.isDirectory ? '📁' : '📄'
    const size = entry.isDirectory ? '-' : `${entry.size}`
    console.log(`${icon} ${entry.name.padEnd(20)} ${size}`)
}