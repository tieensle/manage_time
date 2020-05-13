import startScreen from "./views/home.js";
import homeScreen from "./views/home.js";
// const time = document.querySelector(".time");

// const shortStudyTime = 900;
// const n = 2;
// const longStudyTime = n * shortStudyTime;
// const shortBreakTime = 30;
// const longBreakTime = 60;
// const maxTime = 10 * shortStudyTime;
const app = document.querySelector(".app");
function setScreen(screen) {
  app.innerHTML = screen.content;
  screen.onLoad();
}

setScreen(homeScreen);

export default setScreen;
