/* Copyright © 2026 Zenin Easa Panthakkalakath */

import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { konjugateModule, repoRoot } from './konjugatePaths.mjs';

const { createPackageArchive } = await import(pathToFileURL(konjugateModule('src/packageArchive.mjs')));

const packageDirectory = join(repoRoot, 'package');
const outputDirectory = join(repoRoot, 'out');

// package.json is the single source of the version, so release tags always match the package.
const { version } = JSON.parse(await readFile(join(repoRoot, 'package.json'), 'utf8'));
const manifest = { ...JSON.parse(await readFile(join(packageDirectory, 'addon.json'), 'utf8')), version };
const files = {};
for (const name of await readdir(packageDirectory)) {
    if (name === 'addon.json') continue;
    files[name] = await readFile(join(packageDirectory, name));
}

const archive = createPackageArchive({
    packageManifest: {
        format: 'konjugate-package', formatVersion: 1, packageType: 'addon',
        packageId: manifest.addonId, name: manifest.name, version: manifest.version,
        contents: { manifest: 'addon.json' }
    },
    contributionManifest: manifest,
    files
});

await mkdir(outputDirectory, { recursive: true });
const target = join(outputDirectory, `${manifest.addonId}-${manifest.version}.kja`);
await writeFile(target, archive);
console.log(`Built ${target}`);
