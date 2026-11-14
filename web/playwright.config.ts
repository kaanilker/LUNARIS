import { defineConfig, devices } from '@playwright/test';

// Testler derleme çıktısını yerel Apache'de (.htaccess açık) açar: cPanel'e en yakın ortam.
export default defineConfig({
	testDir: 'tests',
	testMatch: '**/*.e2e.ts',
	fullyParallel: true,
	reporter: 'list',
	use: { baseURL: 'http://127.0.0.1:4174' },
	projects: [
		{ name: 'masaustu', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } } },
		{ name: 'mobil-375', use: { ...devices['Desktop Chrome'], viewport: { width: 375, height: 667 } } }
	],
	webServer: {
		command: 'bash tests/apache/sun.sh',
		url: 'http://127.0.0.1:4174/tr/',
		reuseExistingServer: false,
		timeout: 30_000
	}
});
