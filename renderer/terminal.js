const { Terminal } = require('@xterm/xterm');
require('@xterm/css');

const term = new Terminal({
  cursorBlink: true,
  theme: { background: '#000000', foreground: '#ffffff' }
});

term.open(document.getElementById('terminal-container'));
term.write('Welcome to FriendlyCLI!\r\n$ ');

let buffer = '';

term.onData(data => {
  if (data === '\r') {
    window.electronAPI.runCommand(buffer);
    buffer = '';
  } else if (data === '\u007F') {
    if (buffer.length > 0) {
      buffer = buffer.slice(0, -1);
      term.write('\b \b');
    }
  } else {
    buffer += data;
    term.write(data);
  }
});

// Receive command output from main
window.electronAPI.onCommandOutput((data) => {
  term.write(data);
});

window.term = term;
