const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow } = electron;

let mainWindow;
function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadFile("index.html");
  win.webContents.openDevTools();
}
// function createNotifyWindow() {
//   let notifyWindow = new BrowserWindow({
//     width: 300,
//     height: 200,
//     webPreferences: {
//       nodeIntegration: true,
//     },
//   });
//   notifyWindow.loadURL(
//     url.format({
//       pathname: path.join(__dirname, "notifyWindow.html"),
//       protocol: "file:",
//       slashes: true,
//     })
//   );
//   // win.loadFile("notify.html");
//   // win.webContents.openDevTools();
// }

// let myNotification = new Notification("Title", {
//   body: "Lorem Ipsum Dolor Sit Amet",
// });

// myNotification.onclick = () => {
//   console.log("Notification clicked");
// };

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
