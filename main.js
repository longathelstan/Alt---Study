const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;
let loadingWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1293,
    height: 750,
    resizable: false,
    icon: 'public/Alt-Study.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      disableBlinkFeatures: 'Scrollbars' 
    },
    show: false 
  });

  mainWindow.removeMenu(); 

  mainWindow.loadFile('dashboard.html');
}

function createLoadingWindow() {
  loadingWindow = new BrowserWindow({
    width: 340,
    height: 227,
    resizable: false,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      disableBlinkFeatures: 'Scrollbars',
    },
    show: false, 
    shape: 'roundedRect',
    roundedCorners: true,
    borderRadius: 10
  });

  loadingWindow.loadFile('loading.html');

  loadingWindow.once('ready-to-show', () => {
    loadingWindow.show();
    mainWindow.once('ready-to-show', () => {
      mainWindow.show();
      loadingWindow.close();
    });
  });
}


app.whenReady().then(() => {
  createLoadingWindow();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('run-bat', (event, args) => {
  const batFilePath = path.join(__dirname, 'Anticheat/start.bat'); // Thay đổi thành đường dẫn đúng của file .bat
  exec(batFilePath, (error, stdout, stderr) => {
    if (error) {
      event.sender.send('run-bat-reply', { error: error.message });
    } else {
      event.sender.send('run-bat-reply', { output: stdout });
    }
  });
});
