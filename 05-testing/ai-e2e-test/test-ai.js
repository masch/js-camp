process.loadEnvFile();

import { test } from "node:test";
import assert from "node:assert";

import { Stagehand } from "@browserbasehq/stagehand";

test("IA - Act as a user and buy two tickets by 287.98", async () => {
    const stagehand = new Stagehand({
        env: "LOCAL",
        model: "google/gemini-2.5-flash",
    });


    await stagehand.init();

    const [page] = stagehand.context.pages()

    await page.goto("https://jsconf.es")

    // What to do
    await stagehand.act('Clicar en el botón de "Comprar entradas"')
    await stagehand.act(`Click on the + button next to "Entrada general" to add a new ticket`)
    await stagehand.act(`Click in the + button to add a second ticket`)

    // Extract information
    const { extraction } = await stagehand.extract("Get the subtotal from the page")

    console.log(`Subtotal: ${extraction}`)

    assert.equal(extraction, "€287.98")

    await stagehand.close()
});