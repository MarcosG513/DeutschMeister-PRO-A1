import { test, expect } from '@playwright/test';

test.describe('DeutschMeister PRO A1 — Navegación E2E', () => {

  test('Debería cargar la página de inicio y verificar los componentes principales', async ({ page }) => {
    // Paso 1: Navegar al servidor local de Vite
    await page.goto('http://localhost:5173/');

    // Paso 2: Aseguramiento visual y aserciones básicas del layout
    // 1. Verificar el título HTML de la pestaña
    await expect(page).toHaveTitle(/DeutschMeister Pro A1/i);

    // 2. Verificar el encabezado principal de la aplicación (H1)
    const headerTitle = page.locator('h1:has-text("DeutschMeister")');
    await expect(headerTitle).toBeVisible();
    await expect(headerTitle).toContainText('DeutschMeister PRO A1');

    // 3. Verificar que se renderice la barra superior / header
    const headerElement = page.locator('header');
    await expect(headerElement).toBeVisible();

    // 4. Verificar que se cargue la sección principal de contenido
    const mainSection = page.locator('main');
    await expect(mainSection).toBeVisible();
  });

});
