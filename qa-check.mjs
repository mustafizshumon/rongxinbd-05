import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const errors = [];
const pass = (message) => console.log(`PASS  ${message}`);
const fail = (message) => errors.push(message);
const adminDir = path.join(root, 'admin');
const adminJsFiles = fs.existsSync(adminDir) ? fs.readdirSync(adminDir).filter((name) => name.endsWith('.js')).map((name) => `admin/${name}`) : [];
const jsFiles = [...fs.readdirSync(root).filter((name) => name.endsWith('.js')), ...adminJsFiles];
for (const file of jsFiles) {
  const result = spawnSync(process.execPath, ['--check', file], { cwd: root, encoding: 'utf8' });
  if (result.status === 0) pass(`JavaScript syntax: ${file}`);
  else fail(`JavaScript syntax: ${file}\n${result.stderr}`);
}
const jsonFiles = ['navigation.json', 'product-categories.json', ...(fs.existsSync(adminDir) ? ['admin/navigation.json'] : [])];
for (const file of jsonFiles) {
  try { JSON.parse(fs.readFileSync(path.join(root, file), 'utf8')); pass(`JSON parse: ${file}`); }
  catch (error) { fail(`JSON parse: ${file}: ${error.message}`); }
}
const imagesText = fs.readFileSync(path.join(root, 'images.js'), 'utf8');
const imageNames = [...imagesText.matchAll(/local:\s*\[([^\]]+)\]/g)]
  .flatMap((match) => [...match[1].matchAll(/["']([^"']+)["']/g)].map((item) => item[1]));
const primaryImages = [...new Set(imageNames.filter((name) => name.endsWith('.webp') && !name.startsWith('img-')))];
for (const name of primaryImages) {
  if (fs.existsSync(path.join(root, name))) pass(`Local WebP exists: ${name}`);
  else fail(`Missing local WebP: ${name}`);
}
const appSource = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
for (const id of ['home','about','products','services','capabilities','network','quality','markets','sustainability','resources','faq','why-us','contact']) {
  if (appSource.includes(`"${id}"`) || appSource.includes(`id:"${id}"`)) pass(`Navigation section registered: ${id}`);
  else fail(`Navigation section missing: ${id}`);
}
const productModule = fs.readFileSync(path.join(root, 'module-products.js'), 'utf8');
const dataSource = fs.readFileSync(path.join(root, 'data.js'), 'utf8');
for (const key of ['productDenim','productWoven','productShirts','productKnit','productLadies','productKids']) {
  if (productModule.includes(key) || dataSource.includes(key)) pass(`Product image mapping present: ${key}`);
  else fail(`Product image mapping missing: ${key}`);
}
for (const file of ['hero-main.webp','hero-detail.webp','about-team.webp','capability-production.webp','supply-logistics.webp','responsible-materials.webp']) {
  if (fs.existsSync(path.join(root, file))) pass(`Section image exists: ${file}`);
  else fail(`Section image missing: ${file}`);
}


const htmlSource = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const match of htmlSource.matchAll(/(?:src|href)="\.\/([^"#?]+)"/g)) {
  const target = match[1];
  if (fs.existsSync(path.join(root, target))) pass(`HTML local reference resolves: ${target}`);
  else fail(`HTML local reference missing: ${target}`);
}
for (const token of ['<html lang="en">','<meta name="viewport"','<title>','name="description"','id="app"']) {
  if (htmlSource.includes(token)) pass(`HTML document requirement: ${token}`);
  else fail(`HTML document requirement missing: ${token}`);
}
for (const forbidden of ['Lorem ipsum','TODO:','FIXME:']) {
  const scanFiles = ['index.html','app.js','data.js','style.css','responsive.css','README.md'];
  const found = scanFiles.some((file) => fs.readFileSync(path.join(root, file), 'utf8').includes(forbidden));
  if (!found) pass(`No placeholder text: ${forbidden}`);
  else fail(`Placeholder text remains: ${forbidden}`);
}


const pageSources = ['app.js','module-hero.js','module-about.js','module-capabilities.js','module-network.js','module-sustainability.js','module-products.js'];
const combinedModules = pageSources.map((file) => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');
for (const key of ['heroMain','heroDetail','aboutTeam','capabilityProduction','supplyLogistics','responsibleMaterials','productDenim','productWoven','productShirts','productKnit','productLadies','productKids']) {
  if (imagesText.includes(`${key}:`) || combinedModules.includes(`imageKey:"${key}"`) || combinedModules.includes(`data-image-key\":\"${key}\"`)) pass(`Page image slot registered: ${key}`);
  else fail(`Page image slot missing: ${key}`);
}
const scripts = [...htmlSource.matchAll(/<script\b[^>]*src="\.\/([^"?]+)"/g)].map((m) => m[1]);
for (const file of scripts) {
  if (fs.existsSync(path.join(root, file))) pass(`Script dependency exists: ${file}`);
  else fail(`Script dependency missing: ${file}`);
}

const cssFiles = ['style.css','responsive.css'];
for (const file of cssFiles) {
  const css = fs.readFileSync(path.join(root, file), 'utf8');
  const opens = (css.match(/\{/g) || []).length;
  const closes = (css.match(/\}/g) || []).length;
  if (opens === closes) pass(`CSS brace balance: ${file} (${opens} blocks)`);
  else fail(`CSS brace mismatch: ${file} (${opens} opening / ${closes} closing)`);
}
for (const key of ['heroMain','heroDetail','aboutTeam','capabilityProduction','supplyLogistics','responsibleMaterials']) {
  if (imagesText.includes(`${key}:`)) pass(`Image registry key: ${key}`);
  else fail(`Image registry key missing: ${key}`);
}
if (!productModule.includes('filter-row') && !productModule.includes('filter-buttons')) pass('Public product category filter bar absent');
else fail('Public product category filter UI is still present');
for (const file of ['style.css','responsive.css','runtime.js','images.js','data.js','app.js','navigation.json','product-categories.json','Rongxin-Company-Profile.pdf','robots.txt','sitemap.xml']) {
  if (fs.existsSync(path.join(root, file))) pass(`Required root file: ${file}`);
  else fail(`Required root file missing: ${file}`);
}

if (fs.existsSync(adminDir)) {
  if (fs.existsSync(path.join(adminDir, 'product-category-control.html')) && fs.existsSync(path.join(adminDir, 'navigation-control.html'))) pass('Local Admin tools present');
  else fail('Local Admin tools missing');
  if (fs.existsSync(path.join(root, '.gitignore')) && fs.readFileSync(path.join(root, '.gitignore'), 'utf8').includes('/admin/')) pass('Private Admin folder excluded by .gitignore');
  else fail('Private Admin folder is not excluded by .gitignore');
} else {
  pass('Public package excludes private Admin folder');
}
if (fs.existsSync(path.join(root, 'Rongxin-Company-Profile.pdf'))) pass('Company profile PDF present');
else fail('Company profile PDF missing');
if (errors.length) {
  console.error(`\nFAIL: ${errors.length} issue(s)`);
  for (const error of errors) console.error(`\n${error}`);
  process.exit(1);
}
console.log(`\nPASS: ${jsFiles.length} JavaScript files, JSON, assets, mappings, sections and Admin boundary checked.`);
