const fs = require('fs');
const path = require('path');
const vm = require('vm');

async function main() {
  const publicDir = path.join(__dirname, '../public');
  const babelPath = path.join(publicDir, 'babel.min.js');
  let babelCode;
  if (fs.existsSync(babelPath) && fs.statSync(babelPath).size > 100000) {
    console.log('Loading local babel.min.js from disk...');
    babelCode = fs.readFileSync(babelPath, 'utf8');
  } else {
    console.log('Fetching babel standalone...');
    const res = await fetch('https://unpkg.com/@babel/standalone@7.24.0/babel.min.js');
    babelCode = await res.text();
    fs.writeFileSync(babelPath, babelCode, 'utf8');
  }
  console.log('Babel loaded. Length:', babelCode.length);

  // Ensure local React & ReactDOM exist
  const reactPath = path.join(publicDir, 'react.production.min.js');
  if (!fs.existsSync(reactPath) || fs.statSync(reactPath).size < 1000) {
    try {
      console.log('Downloading local React 18...');
      const r = await fetch('https://unpkg.com/react@18/umd/react.production.min.js');
      fs.writeFileSync(reactPath, await r.text(), 'utf8');
    } catch (e) {
      console.log('Could not download react:', e.message);
    }
  }

  const reactDomPath = path.join(publicDir, 'react-dom.production.min.js');
  if (!fs.existsSync(reactDomPath) || fs.statSync(reactDomPath).size < 1000) {
    try {
      console.log('Downloading local ReactDOM 18...');
      const rd = await fetch('https://unpkg.com/react-dom@18/umd/react-dom.production.min.js');
      fs.writeFileSync(reactDomPath, await rd.text(), 'utf8');
    } catch (e) {
      console.log('Could not download react-dom:', e.message);
    }
  }

  const sandbox = {
    window: {},
    console: console,
    navigator: { userAgent: 'node' },
    process: { env: {} }
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(babelCode, sandbox);

  const Babel = sandbox.Babel || sandbox.window.Babel;
  if (!Babel) {
    throw new Error('Babel object not found in sandbox');
  }

  console.log('Reading public/app.bundle.jsx...');
  const bundle = fs.readFileSync(path.join(__dirname, '../public/app.bundle.jsx'), 'utf8');

  console.log('Compiling bundle with Babel...');
  try {
    const transformed = Babel.transform(bundle, {
      presets: ['react']
    });
    console.log('Transformed successfully! Code length:', transformed.code.length);
    fs.writeFileSync(path.join(__dirname, '../public/app.bundle.js'), transformed.code, 'utf8');
    console.log('Saved compiled plain JS to public/app.bundle.js');
  } catch (err) {
    console.error('Babel Compilation Failed:', err.message);
    if (err.loc) {
      console.error('Error Location:', err.loc);
      const lines = bundle.split('\n');
      console.error('Line content:', lines[err.loc.line - 1]);
    }
  }
}

main().catch(console.error);
