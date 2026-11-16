const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = path.join(__dirname, '..', 'node_modules');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

async function getPkgInfo(name, version = 'latest') {
  const url = `https://registry.npmjs.org/${name}/${version}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch info for ${name}@${version}`);
  return await res.json();
}

async function installPackage(name, versionSpec = 'latest', installed = new Set()) {
  const cleanName = name.trim();
  if (cleanName.startsWith('@types/')) return; // Skip type definitions

  let cleanVer = versionSpec.replace(/[\^~>=<*]/g, '').trim();
  if (!cleanVer || cleanVer === '') cleanVer = 'latest';

  const info = await getPkgInfo(cleanName, cleanVer);
  const version = info.version;
  const key = `${cleanName}@${version}`;
  if (installed.has(key)) return;
  installed.add(key);

  console.log(`Downloading ${key}...`);
  const tarballUrl = info.dist.tarball;
  const tarRes = await fetch(tarballUrl);
  const buffer = Buffer.from(await tarRes.arrayBuffer());

  const tmpTar = path.join(__dirname, `tmp_${Date.now()}_${Math.random().toString(36).substr(2, 5)}.tgz`);
  fs.writeFileSync(tmpTar, buffer);

  let destDir = path.join(targetDir, cleanName);
  if (cleanName.startsWith('@')) {
    const [scope, pkg] = cleanName.split('/');
    const scopeDir = path.join(targetDir, scope);
    if (!fs.existsSync(scopeDir)) fs.mkdirSync(scopeDir, { recursive: true });
    destDir = path.join(scopeDir, pkg);
  }

  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  const tmpExtract = path.join(__dirname, `extract_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`);
  fs.mkdirSync(tmpExtract, { recursive: true });

  execSync(`tar -xzf "${tmpTar}" -C "${tmpExtract}"`);
  
  const pkgFolder = path.join(tmpExtract, 'package');
  if (fs.existsSync(pkgFolder)) {
    fs.cpSync(pkgFolder, destDir, { recursive: true });
  }

  try {
    fs.unlinkSync(tmpTar);
    fs.rmSync(tmpExtract, { recursive: true, force: true });
  } catch (e) {}

  console.log(`✓ Installed ${key}`);

  const deps = info.dependencies || {};
  for (const [depName, depVer] of Object.entries(deps)) {
    await installPackage(depName, depVer, installed);
  }
}

(async () => {
  try {
    console.log('Starting mongodb driver install...');
    await installPackage('mongodb', '6.10.0');
    console.log('All packages installed successfully!');
  } catch (err) {
    console.error('Install failed:', err);
    process.exit(1);
  }
})();
