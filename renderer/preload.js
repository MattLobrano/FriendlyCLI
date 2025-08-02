const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  runCommand: (cmd) => ipcRenderer.send('run-command', cmd),
  onCommandOutput: (callback) => ipcRenderer.on('command-output', (event, data) => callback(data))
});
