/**
 * start.js
 * 1. Starts XAMPP MySQL if not already running on port 3309
 * 2. Kills anything occupying port 5000
 * 3. Starts the backend server
 */
const { execSync, exec, spawn } = require('child_process');
const net = require('net');

const PORT = process.env.PORT || 5000;
const DB_PORT = parseInt(process.env.DB_PORT || '3309');

// ── Helper: check if a port is open ─────────────────────────────────────────
function isPortOpen(port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(2000);
    socket
      .on('connect', () => { socket.destroy(); resolve(true); })
      .on('error',   () => { socket.destroy(); resolve(false); })
      .on('timeout', () => { socket.destroy(); resolve(false); })
      .connect(port, '127.0.0.1');
  });
}

// ── Helper: sleep ────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── Step 1: Ensure MySQL is running ─────────────────────────────────────────
async function ensureMySQL() {
  const running = await isPortOpen(DB_PORT);
  if (running) {
    console.log(`✅ MySQL already running on port ${DB_PORT}`);
    return;
  }

  console.log(`🔄 MySQL not running. Starting XAMPP MySQL on port ${DB_PORT}...`);
  const mysqldPath = 'C:\\xampp\\mysql\\bin\\mysqld.exe';
  const myIniPath  = 'C:\\xampp\\mysql\\bin\\my.ini';

  try {
    spawn(mysqldPath, [`--defaults-file=${myIniPath}`], {
      detached: true,
      stdio: 'ignore',
      windowsHide: true,
    }).unref();
  } catch (e) {
    console.error('❌ Could not start MySQL:', e.message);
    process.exit(1);
  }

  // Wait up to 15 seconds for MySQL to be ready
  for (let i = 0; i < 15; i++) {
    await sleep(1000);
    if (await isPortOpen(DB_PORT)) {
      console.log(`✅ MySQL started successfully on port ${DB_PORT}`);
      return;
    }
    process.stdout.write('.');
  }
  console.error(`\n❌ MySQL did not start within 15 seconds.`);
  process.exit(1);
}

// ── Step 2: Free port 5000 ───────────────────────────────────────────────────
function freeServerPort() {
  try {
    const result = execSync(`netstat -ano | findstr :${PORT}`, {
      shell: 'cmd.exe',
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore'],
    });
    const pids = [...new Set(
      result.split('\n')
        .filter(l => l.includes('LISTENING'))
        .map(l => l.trim().split(/\s+/).pop())
        .filter(p => p && p !== '0')
    )];
    pids.forEach(pid => {
      try {
        execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
        console.log(`✅ Freed port ${PORT} (killed PID ${pid})`);
      } catch {}
    });
  } catch {
    // Port was free
  }
}

// ── Step 3: Start the backend ────────────────────────────────────────────────
function startServer() {
  const proc = spawn(
    'node',
    ['-e', "require('ts-node').register({ transpileOnly: true }); require('./src/server.ts')"],
    { stdio: 'inherit', shell: false }
  );
  proc.on('exit', (code) => process.exit(code || 0));
}

// ── Main ─────────────────────────────────────────────────────────────────────
(async () => {
  await ensureMySQL();
  freeServerPort();
  await sleep(300);
  startServer();
})();
