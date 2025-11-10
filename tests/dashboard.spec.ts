import { test, expect } from '@playwright/test';

test.describe('Financial API Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the application', async ({ page }) => {
    await expect(page).toHaveTitle(/Financial API Interface Design|Vite/);
  });

  test('should display the sidebar with branding', async ({ page }) => {
    // Check for FinanceAPI branding
    await expect(page.getByText('FinanceAPI')).toBeVisible();
    await expect(page.getByText('Payment Platform')).toBeVisible();
  });

  test('should have all navigation items', async ({ page }) => {
    // Check navigation items
    await expect(page.getByRole('button', { name: /dashboard/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /endpoints/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /settings/i })).toBeVisible();
  });

  test('should display user info in sidebar', async ({ page }) => {
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('Admin')).toBeVisible();
  });

  test('dashboard view should be visible by default', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeVisible();
    await expect(page.getByText('Monitor your API performance and usage metrics')).toBeVisible();
  });

  test('should display stat cards on dashboard', async ({ page }) => {
    // Check for stat cards
    await expect(page.getByText('API Requests')).toBeVisible();
    await expect(page.getByText('1,284,392')).toBeVisible();
    
    await expect(page.getByText('Transactions Processed')).toBeVisible();
    await expect(page.getByText('$2.4M')).toBeVisible();
    
    await expect(page.getByText('Success Rate')).toBeVisible();
    await expect(page.getByText('99.7%')).toBeVisible();
    
    await expect(page.getByText('Avg Response Time')).toBeVisible();
    await expect(page.getByText('142ms')).toBeVisible();
  });

  test('should display recent API calls table', async ({ page }) => {
    await expect(page.getByText('Recent API Calls')).toBeVisible();
    await expect(page.getByText('Latest requests to your financial API')).toBeVisible();
    
    // Check table headers
    await expect(page.getByText('Endpoint')).toBeVisible();
    await expect(page.getByText('Method')).toBeVisible();
    await expect(page.getByText('Status')).toBeVisible();
    await expect(page.getByText('Response Time')).toBeVisible();
    await expect(page.getByText('Timestamp')).toBeVisible();
    
    // Check for sample endpoint
    await expect(page.getByText('/api/v1/transactions/create')).toBeVisible();
  });

  test('should display alerts section', async ({ page }) => {
    await expect(page.getByText('Rate Limit Warning')).toBeVisible();
    await expect(page.getByText('System Status')).toBeVisible();
    await expect(page.getByText('All payment processing systems operational')).toBeVisible();
  });

  test('should navigate to Endpoints view', async ({ page }) => {
    await page.getByRole('button', { name: /endpoints/i }).click();
    
    // Wait for navigation
    await page.waitForTimeout(300);
    
    // Verify we're on the Endpoints view (it should not show Dashboard heading)
    const dashboardHeading = page.getByRole('heading', { name: 'Dashboard', level: 1 });
    await expect(dashboardHeading).not.toBeVisible();
  });

  test('should navigate to Settings view', async ({ page }) => {
    await page.getByRole('button', { name: /settings/i }).click();
    
    // Wait for navigation
    await page.waitForTimeout(300);
    
    // Verify we're on the Settings view (it should not show Dashboard heading)
    const dashboardHeading = page.getByRole('heading', { name: 'Dashboard', level: 1 });
    await expect(dashboardHeading).not.toBeVisible();
  });

  test('should navigate back to Dashboard', async ({ page }) => {
    // Navigate away
    await page.getByRole('button', { name: /endpoints/i }).click();
    await page.waitForTimeout(300);
    
    // Navigate back
    await page.getByRole('button', { name: /dashboard/i }).click();
    await page.waitForTimeout(300);
    
    // Verify we're back on Dashboard
    await expect(page.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeVisible();
  });

  test('should highlight active navigation item', async ({ page }) => {
    const dashboardBtn = page.getByRole('button', { name: /dashboard/i });
    const endpointsBtn = page.getByRole('button', { name: /endpoints/i });
    
    // Dashboard should be active by default (has emerald background)
    await expect(dashboardBtn).toHaveClass(/bg-emerald-600/);
    
    // Click Endpoints
    await endpointsBtn.click();
    await page.waitForTimeout(300);
    
    // Endpoints should now be active
    await expect(endpointsBtn).toHaveClass(/bg-emerald-600/);
  });

  test('should display Live badge', async ({ page }) => {
    await expect(page.getByText('Live')).toBeVisible();
  });

  test('should display status badges in table', async ({ page }) => {
    // Check for method badges (POST, GET)
    const postBadge = page.locator('text=POST').first();
    const getBadge = page.locator('text=GET').first();
    
    await expect(postBadge).toBeVisible();
    await expect(getBadge).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Sidebar should still be visible (might be adjusted in real app)
    await expect(page.getByText('FinanceAPI')).toBeVisible();
    
    // Dashboard content should be visible
    await expect(page.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeVisible();
  });

  test('should have proper color scheme', async ({ page }) => {
    const sidebar = page.locator('aside');
    
    // Sidebar should have dark background
    await expect(sidebar).toHaveClass(/bg-slate-900/);
  });

  test('should display icons correctly', async ({ page }) => {
    // Check that lucide icons are rendered (they have specific classes)
    const icons = page.locator('svg.lucide');
    await expect(icons.first()).toBeVisible();
  });
});
