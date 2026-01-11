import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, basename, extname } from "node:path";

let content = ''
if (process.permission.has('fs.read', 'archivo.txt')) {
    content = await readFile("file.txt", "utf-8");
    console.log(content);
} else {
    console.log("No tienes permiso para leer el archivo");
}

if (process.permission.has('fs.write', 'archivo.txt')) {
    const output = join("output", "files");
    await mkdir(output, { recursive: true });

    const upperContent = content.toUpperCase();
    const outputFilePath = join(output, "file-uppercased.txt");

    console.log(`The file extension of "${outputFilePath}" is "${extname(outputFilePath)}"`);
    console.log(`The file name of "${outputFilePath}" is "${basename(outputFilePath)}"`);

    await writeFile(outputFilePath, upperContent);
    console.log("File uppercased");
} else {
    console.log("No tienes permiso para escribir el archivo");
}
