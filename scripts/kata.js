#!/usr/bin/env node
// Tiny helper so you can run katas from the repo root by number:
//   pnpm dev 3            -> start kata 03 in the browser
//   pnpm test 3           -> run kata 03's tests against YOUR code (watch mode)
//   pnpm test:solution 3  -> run kata 03's tests against the solution
//   pnpm katas            -> show all katas
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const katasDir = path.join(root, 'katas');
const katas = fs
  .readdirSync(katasDir)
  .filter((d) => fs.statSync(path.join(katasDir, d)).isDirectory())
  .sort();

const [command, which] = process.argv.slice(2);

function findKata(query) {
  if (!query) {
    console.error(`Which kata? e.g. "pnpm ${command} 1". Run "pnpm katas" to see them all.`);
    process.exit(1);
  }
  const padded = String(query).padStart(2, '0');
  const match = katas.find((k) => k.startsWith(`${padded}-`)) ?? katas.find((k) => k.includes(query));
  if (!match) {
    console.error(`No kata matching "${query}". Run "pnpm katas" to see them all.`);
    process.exit(1);
  }
  return path.join(katasDir, match);
}

function run(args, cwd, env = {}) {
  return new Promise((resolve) => {
    const child = spawn('pnpm', ['exec', ...args], {
      cwd,
      stdio: 'inherit',
      env: { ...process.env, ...env },
      shell: process.platform === 'win32',
    });
    child.on('exit', (code) => resolve(code ?? 1));
  });
}

switch (command) {
  case 'list': {
    console.log('\nReact katas:\n');
    for (const k of katas) {
      const readme = fs.readFileSync(path.join(katasDir, k, 'README.md'), 'utf8');
      const title = readme.split('\n')[0].replace(/^#\s*/, '').replaceAll('`', '');
      console.log(`  ${title}`);
    }
    console.log('\nStart one with: pnpm dev <number>\n');
    break;
  }
  case 'dev':
    process.exit(await run(['vite', '--open'], findKata(which)));
  case 'test':
    process.exit(await run(['vitest'], findKata(which)));
  case 'test:solution':
    process.exit(await run(['vitest', 'run'], findKata(which), { KATA_SOLUTION: '1' }));
  case 'test:all-solutions': {
    let failed = 0;
    for (const k of katas) {
      console.log(`\n=== ${k} ===`);
      failed += (await run(['vitest', 'run'], path.join(katasDir, k), { KATA_SOLUTION: '1' })) ? 1 : 0;
    }
    process.exit(failed ? 1 : 0);
  }
  default:
    console.error('Usage: pnpm katas | pnpm dev <n> | pnpm test <n> | pnpm test:solution <n>');
    process.exit(1);
}
