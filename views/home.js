//@ts-nocheck
import startScreen from "./start.js";
import setScreen from "../index.js";
const content = `
<h2 class="setUp">Set Up Time</h2>
      <form action="" class="startForm">
        <label for="shortStudy">Short Time Study (minutes)</label>
        <input type="number" min="1" id="shortStudy" name="shortStudy" required />
        <label for="longStudy">Long Time Study = Number x Short Time Study</label>
        <input
          type="number"
           min="1"
          id="longStudy"
          name="longStudy"
          placeholder="Number"
        required
        />
        <label for="shortBreak">Short Time Break (minutes)</label>
        <input type="number"  min="1" id="shortBreak" name="shortBreak"  required/>
        <label for="longBreak">Long Time Break (minutes)</label>
        <input type="number"  min="1" id="longBreak" name="longBreak" required />
        <button class="start">Start</button>
      </form>`;

const onLoad = () => {
  let startForm = document.querySelector(".startForm");
  startForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let shortStudy = Number(startForm.shortStudy.value);
    let longStudy = Number(startForm.longStudy.value);
    let shortBreak = Number(startForm.shortBreak.value);
    let longBreak = Number(startForm.longBreak.value);
    const success =
      !isNaN(shortStudy) &&
      !isNaN(longStudy) &&
      !isNaN(shortBreak) &&
      !isNaN(longBreak);
    if (success) {
      startScreen.getData({ shortStudy, longStudy, shortBreak, longBreak });
      setScreen(startScreen);
    }
  });
};
export default {
  content,
  onLoad,
};
