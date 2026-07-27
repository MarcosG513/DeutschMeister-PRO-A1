import { test, expect } from '@playwright/test';

test.describe('DeutschMeister PRO A1 — Interacción E2E con Tutor IA', () => {

  test('Debería poder abrir el chat, enviar una consulta y recibir respuesta del Tutor IA', async ({ page }) => {
    // Paso 1: Navegar al servidor de Vite
    await page.goto('http://localhost:5173/');

    // Paso 2: Abrir el menú lateral
    const menuButton = page.getByRole('button', { name: 'Menú' });
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    // Paso 3: Abrir el panel del Tutor IA
    const tutorButton = page.getByRole('button', { name: 'Tutor IA' });
    await expect(tutorButton).toBeVisible();
    await tutorButton.click();

    // Paso 4: Validar la apertura del panel del chat
    const tutorHeading = page.getByRole('heading', { name: 'Tutor Alemán' });
    await expect(tutorHeading).toBeVisible();

    // Paso 5: Escribir y enviar consulta sobre el caso acusativo
    const chatInput = page.getByPlaceholder('Pregúntame algo en alemán o español...');
    await expect(chatInput).toBeVisible();
    await chatInput.fill('Hola, no entiendo cómo funciona el caso acusativo.');
    await chatInput.press('Enter');

    // Paso 6: Verificar que el mensaje del alumno se muestra en el chat
    const studentMessage = page.getByText('Hola, no entiendo cómo funciona el caso acusativo.');
    await expect(studentMessage).toBeVisible();

    // Paso 7: Esperar y verificar la respuesta del Tutor IA
    // Ubicamos las burbujas de respuesta del tutor (model role)
    const tutorReplies = page.locator('aside').locator('div.bg-white.border.border-slate-200.text-slate-800');
    
    // Debería haber 2 burbujas del modelo: la de bienvenida (1) y la respuesta a la consulta (2)
    // Usamos un timeout generoso de 20 segundos para la respuesta remota del LLM
    await expect(tutorReplies).toHaveCount(2, { timeout: 20000 });

    // Validar que la respuesta contenga texto y esté visible
    const secondReply = tutorReplies.nth(1);
    await expect(secondReply).toBeVisible();
    await expect(secondReply).not.toBeEmpty();
  });

});
