const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

function loadTS(file) {
  const exports = {};
  const source = fs.readFileSync(file, 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
  new Function('require', 'exports', compiled)(require, exports);
  return exports;
}

const { CONSTELLATIONS } = loadTS('src/data/constellations.ts');
const { FLAGSHIP_PROJECTS, MILESTONES, PERSONAL_INFO, SOCIAL_LINKS } = loadTS('src/data/portfolioContent.ts');
const { getAllNotes } = loadTS('src/lib/markdown.ts');
const { PROJECT_MEDIA } = loadTS('src/data/projectMedia.ts');
assert.deepEqual(CONSTELLATIONS.map(item => item.name).sort(), ['Cassiopeia', 'Cygnus', 'Lyra', 'Orion']);
const languages = CONSTELLATIONS.flatMap(item => item.stars.map(star => star.code));
assert.equal(new Set(languages).size, languages.length, 'Each greeting star must represent a different language');
assert.equal(languages.length, 22);
const india = CONSTELLATIONS.find(item => item.id === 'orion');
for (const language of ['hi', 'mr', 'gu']) assert(india.stars.some(star => star.code === language));
for (const item of CONSTELLATIONS) {
  const reached = new Set([0]);
  for (const [a,b] of item.edges) {
    assert(item.stars[a] && item.stars[b] && a !== b, `${item.name}: invalid edge`);
  }
  for (let i = 0; i < item.stars.length; i++) for (const [a,b] of item.edges) {
    if (reached.has(a)) reached.add(b);
    if (reached.has(b)) reached.add(a);
  }
  assert.equal(reached.size, item.stars.length, `${item.name}: disconnected greeting`);
  for (const star of item.stars) assert(star.x > 0 && star.x < 100 && star.y > 0 && star.y < 100);
}
assert.equal(new Set(FLAGSHIP_PROJECTS.map(p => p.slug)).size, 5);
const localAssets = [ '/hero/hero-portrait.png', ...MILESTONES.map(item => item.proofImage), ...Object.values(PROJECT_MEDIA).flatMap(item => [item.src, item.poster]) ].filter(Boolean);
for (const asset of localAssets) assert(fs.existsSync(path.join('public', asset)), `Missing asset: ${asset}`);
assert.equal(PERSONAL_INFO.email, 'mpranav126@outlook.com');
for (const profile of Object.values(SOCIAL_LINKS)) assert.equal(new URL(profile.url).protocol, 'https:');
assert(!new URL(SOCIAL_LINKS.instagram.url).search, 'Instagram profile should not include tracking data');
const notes = getAllNotes();
assert.equal(notes.length, fs.readdirSync('content/notes').filter(name => name.endsWith('.md')).length);
for (const note of notes) {
  assert(note.title && note.slug && note.question, `Incomplete notebook: ${note.slug}`);
  assert(fs.existsSync(`content/notes/${note.slug}.md`));
}
assert(!/[\u0080-\u009f]|Ã¢|â€/.test(fs.readFileSync('src/data/portfolioContent.ts', 'utf8')), 'Corrupted text in portfolio data');
console.log(`Content checks passed: ${CONSTELLATIONS.length} connected constellations, ${languages.length} languages, ${FLAGSHIP_PROJECTS.length} projects, ${MILESTONES.length} certificates, ${notes.length} real notebook routes, direct email and four social profiles.`);
