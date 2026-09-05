import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const locales = ['en-US', 'vi-VN'];
const roots = ['app', 'hooks', 'layouts', 'packages'];
const files = [];
const findFiles = (directory) => readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
  const path = join(directory, entry.name);
  if (entry.isDirectory()) findFiles(path);
  else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) files.push(path);
});
const valueAt = (resource, key) => key.split('.').reduce((value, part) => value?.[part], resource);
const errors = [];

roots.forEach(findFiles);
files.forEach((file) => {
  const source = readFileSync(file, 'utf8');
  for (const [, functionName, key] of source.matchAll(/\b(t_[A-Za-z0-9]+|t)\(\s*['\"]([^'\"]+)['\"]/g)) {
    const namespace = functionName === 't' ? 'common' : functionName.slice(2);
    locales.forEach((locale) => {
      const resourcePath = join('public', 'locales', locale, `${namespace}.json`);
      if (!existsSync(resourcePath) || valueAt(JSON.parse(readFileSync(resourcePath, 'utf8')), key) === undefined) {
        errors.push(`${locale}:${namespace}.${key} (${file})`);
      }
    });
  }
});

if (errors.length) {
  console.error(`Missing translation keys:\n${errors.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log('All literal translation keys exist in every supported locale.');
}
