import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, basename, extname } from "node:path";

const content = await readFile("file.txt", "utf-8");
console.log(content);

const output = join("output", "files");
await mkdir(output, { recursive: true });

const upperContent = content.toUpperCase();
const outputFilePath = join(output, "file-uppercased.txt");

console.log(`The file extension of "${outputFilePath}" is "${extname(outputFilePath)}"`);
console.log(`The file name of "${outputFilePath}" is "${basename(outputFilePath)}"`);

await writeFile(outputFilePath, upperContent);
console.log("File uppercased");
