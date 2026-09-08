// Electron 主进程
// 1) 用 Node 内置 http 托管当前目录（server.js）
// 2) 在 BrowserWindow 中 loadURL 到本地地址
// 渲染层（index.html / app.js）无需任何改动 —— Monaco 已用 inline 空 worker，
// wasm 引擎走动态 import，在 http://localhost 下均正常工作。
const { app, BrowserWindow } = require('electron');
const path = require('path');
const { startServer } = require('./server');

let mainWindow = null;
let httpServer = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    title: '代码格式化器',
    backgroundColor: '#1e1e1e',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  const port = parseInt(process.env.PORT || '4317', 10);
  startServer(__dirname, port).then(({ server, port: p }) => {
    httpServer = server;
    if (mainWindow) mainWindow.loadURL(`http://127.0.0.1:${p}/`);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (httpServer) {
    httpServer.close();
    httpServer = null;
  }
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
