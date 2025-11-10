import { test, expect } from '@playwright/test';

test.describe('UI Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Card components should render correctly', async ({ page }) => {
    // Check for card elements (stat cards)
    const cards = page.locator('.p-6');
    await expect(cards.first()).toBeVisible();
  });

  test('Badge components should render correctly', async ({ page }) => {
    // Check for badges (Live badge, method badges, status badges)
    const badges = page.getByText('Live');
    await expect(badges).toBeVisible();
    
    // Check method badges
    await expect(page.getByText('POST').first()).toBeVisible();
    await expect(page.getByText('GET').first()).toBeVisible();
  });

  test('Button components should be interactive', async ({ page }) => {
    const dashboardBtn = page.getByRole('button', { name: /dashboard/i });
    const endpointsBtn = page.getByRole('button', { name: /endpoints/i });
    
    // Click should work
    await endpointsBtn.click();
    await page.waitForTimeout(300);
    
    // Navigate back
    await dashboardBtn.click();
    await page.waitForTimeout(300);
    
    await expect(page.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeVisible();
  });

  test('Icons should render from lucide-react', async ({ page }) => {
    // Check for SVG icons with lucide class
    const icons = page.locator('svg');
    const iconCount = await icons.count();
    
    expect(iconCount).toBeGreaterThan(0);
  });

  test('Table component should display data', async ({ page }) => {
    // Check table structure
    const table = page.locator('table');
    await expect(table).toBeVisible();
    
    // Check headers
    await expect(page.getByText('Endpoint')).toBeVisible();
    await expect(page.getByText('Method')).toBeVisible();
    await expect(page.getByText('Status')).toBeVisible();
    
    // Check data rows
    const rows = table.locator('tbody tr');
    const rowCount = await rows.count();
    
    expect(rowCount).toBeGreaterThan(0);
  });

  test('Alert components should display correctly', async ({ page }) => {
    // Warning alert (amber)
    await expect(page.getByText('Rate Limit Warning')).toBeVisible();
    
    // Success alert (emerald)
    await expect(page.getByText('System Status')).toBeVisible();
  });

  test('Responsive grid layout should work', async ({ page }) => {
    // Check for grid containers
    const gridContainers = page.locator('.grid');
    await expect(gridContainers.first()).toBeVisible();
    
    // Stat cards should be in a grid
    const statCards = page.locator('.grid-cols-1');
    await expect(statCards.first()).toBeVisible();
  });

  test('Tailwind CSS classes should be applied', async ({ page }) => {
    // Check for common Tailwind classes
    const sidebar = page.locator('aside');
    await expect(sidebar).toHaveClass(/bg-slate-900/);
    await expect(sidebar).toHaveClass(/text-white/);
    
    // Check for other styled elements
    const mainContent = page.locator('main');
    await expect(mainContent).toHaveClass(/flex-1/);
  });

  test('Typography should be properly styled', async ({ page }) => {
    // Check heading sizes
    const h1 = page.getByRole('heading', { name: 'Dashboard', level: 1 });
    await expect(h1).toHaveClass(/text-3xl/);
    
    // Check for text color classes
    const descriptions = page.locator('.text-slate-600');
    await expect(descriptions.first()).toBeVisible();
  });

  test('Spacing and padding should be consistent', async ({ page }) => {
    // Check for padding classes
    const paddedElements = page.locator('.p-8, .p-6, .p-4');
    const count = await paddedElements.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('Border and rounded corners should be applied', async ({ page }) => {
    // Check for rounded elements
    const roundedElements = page.locator('.rounded, .rounded-lg, .rounded-full');
    const count = await roundedElements.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('Color scheme should use emerald as primary', async ({ page }) => {
    // Check for emerald color usage
    const emeraldElements = page.locator('[class*="emerald"]');
    const count = await emeraldElements.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('Should have proper contrast for accessibility', async ({ page }) => {
    // Dark sidebar with white text
    const sidebar = page.locator('aside');
    await expect(sidebar).toHaveClass(/bg-slate-900/);
    await expect(sidebar).toHaveClass(/text-white/);
    
    // Light background for main content
    const body = page.locator('.bg-slate-50');
    await expect(body.first()).toBeVisible();
  });
});
