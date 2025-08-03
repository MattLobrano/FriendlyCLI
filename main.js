const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'renderer', 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

ipcMain.on('run-command', (event, command) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      event.sender.send('command-output', `\x1b[31m${error.message}\x1b[0m\r\n`);
      return;
    }
    if (stderr) event.sender.send('command-output', `\x1b[33m${stderr}\x1b[0m\r\n`);
    if (stdout) event.sender.send('command-output', stdout + '\r\n');
    event.sender.send('command-output', '$ ');
  });
});

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
