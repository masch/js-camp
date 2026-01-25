// @ts-check
import { test, expect } from '@playwright/test';

// Recommendation priority to find elements: 
// - Use roles to find elements, aria labels
// - label text, placeholder, names
// - data-testid
// - css selectors
test('find jobs and apply to one of them', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  const searchInput = page.getByRole('searchbox');
  await searchInput.fill('React');

  await page.getByRole('button', { name: 'Buscar' }).click();

  const jobCards = page.locator('.job-listing-card');

  await expect(jobCards.first()).toBeVisible();

  const firstJobTitle = jobCards.first().getByRole('heading', { level: 3 });
  await expect(firstJobTitle).toHaveText("Desarrollador de Software Senior");

  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  const applyButton = page.getByRole('button', { name: 'Aplicar' }).first();
  await applyButton.click();

  page.getByRole('button', { name: 'Aplicado' }).first()

})