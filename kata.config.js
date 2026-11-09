// Shared Vite + Vitest config used by every kata.
// You shouldn't need to edit this file while doing the katas.
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Serves JSON files from a kata's `api/` folder at `/api/...` during `pnpm dev`.
 * e.g. katas/07-fetch-data/api/users.json -> GET /api/users
 * Adds a small delay so you can actually see your loading state.
 */
function mockApi(kataDir) {
  return {
    name: 'kata-mock-api',
    configureServer(server) {
      server.middlewares.use('/api', (req, res) => {
        const name = req.url.split('?')[0].replace(/^\/+|\/+$/g, '');
        const file = path.join(kataDir, 'api', `${name}.json`);
        setTimeout(() => {
          if (!fs.existsSync(file)) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ error: `No mock data for /api/${name}` }));
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(fs.readFileSync(file));
        }, 800);
      });
    },
  };
}

export function kataConfig(kataDir) {
  const useSolution = process.env.KATA_SOLUTION === '1';

  return defineConfig({
    root: kataDir,
    plugins: [react(), mockApi(kataDir)],
    resolve: {
      // When running `pnpm test:solution`, the tests' `import App from './App.jsx'`
      // is pointed at solution/App.jsx instead of your src/App.jsx.
      alias: useSolution
        ? [{ find: /^\.\/App(\.jsx)?$/, replacement: path.join(kataDir, 'solution', 'App.jsx') }]
        : [],
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: [path.resolve(import.meta.dirname, 'test-setup.js')],
      include: ['src/**/*.test.jsx'],
    },
  });
}
