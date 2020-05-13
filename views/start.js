import setScreen from "../index.js";
import homeScreen from "./home.js";
const notifier = require("node-notifier");
const path = require("path");

const content = `
<div id="start-screen">
<h2 class="title" id="state">I'm studying! *_*</h2>
      <p class="time">00:00</p>
      <div id="bar">
        <div id="dot"></div>
        <div id="progress"></div>
      </div>
      <div class="controller">
        <button id="play-pause" class="controller-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="52"
            height="52"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FC766AFF"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-pause-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="10" y1="15" x2="10" y2="9"></line>
            <line x1="14" y1="15" x2="14" y2="9"></line>
          </svg>
        </button>
        <button id="refresh" class="controller-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FC766AFF"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-refresh-cw"
          >
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path
              d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
            ></path>
          </svg>
        </button>
        <button id="skip" class="controller-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="56"
          height="56"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FC766AFF"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-skip-forward"
        >
          <polygon points="5 4 15 12 5 20 5 4"></polygon>
          <line x1="19" y1="5" x2="19" y2="19"></line>
        </svg>
      </button>
      </div>
      </div>
`;

let shortStudy, longStudy, shortBreak, longBreak;
const getData = (data) => {
  shortStudy = data.shortStudy;
  longStudy = data.longStudy;
  shortBreak = data.shortBreak;
  longBreak = data.longBreak;
};

let isPausing = false;
let isStudying = true;

const onLoad = () => {
  function notice(msg) {
    /** https://github.com/mikaelbr/node-notifier */
    notifier.notify({
      title: "Alarm Clock",
      message: msg,
      icon: path.join(__dirname, "clock.ico"),
      sound: true,
    });
  }

  const refresh = document.querySelector("#refresh");
  refresh.addEventListener("click", (event) => {
    const answer = window.confirm("Do you want set up again?");
    if (answer) {
      setScreen(homeScreen);
      return;
    }
  });
  document.querySelector("#skip").addEventListener("click", (event) => {
    if (!isStudying) {
      allSeconds = shortStudy * 60;
      document.querySelector(".title").innerHTML = "I'm studying *_*";
      isStudying = true;
    }
  });
  let countLong = Number(longStudy);
  let time = document.querySelector(".time");

  let bar = document.querySelector("#bar");
  const dot = document.querySelector("#dot");

  let allSeconds = isStudying ? shortStudy * 60 : shortBreak * 60;
  let startTime = allSeconds;
  setInterval(() => {
    if (!isPausing) {
      const hours = Math.floor(allSeconds / 3600);
      const minutes = Math.floor((allSeconds - hours * 3600) / 60);
      const seconds = Math.floor(allSeconds - hours * 3600 - minutes * 60);

      // time.innerHTML =
      //   hours === 0
      //     ? `${minutes} : ${seconds}`
      //     : `${hours} : ${minutes} : ${seconds}`;
      if (hours === 0) {
        if (minutes < 10 && seconds < 10) {
          time.innerHTML = `0${minutes} : 0${seconds}`;
        } else if (minutes < 10) {
          time.innerHTML = `0${minutes} : ${seconds}`;
        } else if (seconds < 10) {
          time.innerHTML = `${minutes} : 0${seconds}`;
        } else {
          time.innerHTML = `${minutes} : ${seconds}`;
        }
      } else {
        if (hours <= 9) {
          if (minutes < 10) {
            if (seconds < 10) {
              time.innerHTML = `0${hours} : 0${minutes} : 0${seconds}`;
            } else {
              time.innerHTML = `0${hours} : 0${minutes} : ${seconds}`;
            }
          }
        }
      }

      if (hours === 0 && minutes === 0 && seconds === 0) {
        // alert("haha");
        let msg;
        if (isStudying) msg = "Time to relax! 😋";
        else msg = "Let's study! 💪";
        notice(msg);
        dot.setAttribute("style", `left : 0px`);

        isStudying = !isStudying;
        if (!isStudying) {
          countLong--;
        }
        allSeconds = isStudying
          ? shortStudy * 60
          : countLong === 0
          ? longBreak * 60
          : shortBreak * 60;
        document.querySelector(".title").innerHTML = isStudying
          ? "I'm studying *_*"
          : countLong === 0
          ? "I'm in the long break ~>.<~"
          : "I'm in the short break ~.~";
        if (countLong === 0) {
          countLong = longStudy;
        }
      }
      allSeconds--;
      dot.setAttribute(
        "style",
        `left : ${(400 / startTime) * (startTime - allSeconds) - 7}px`
      );
      console.log((400 / startTime) * (startTime - allSeconds));
    }
  }, 1000);

  const controller = document.querySelector("#play-pause");
  controller.addEventListener("click", (event) => {
    controller.innerHTML =
      isPausing === false
        ? `<svg
            xmlns="http://www.w3.org/2000/svg"
            width="52"
            height="52"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FC766AFF"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-play-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="10 8 16 12 10 16 10 8"></polygon>
          </svg>`
        : `<svg
            xmlns="http://www.w3.org/2000/svg"
            width="52"
            height="52"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FC766AFF"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-pause-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="10" y1="15" x2="10" y2="9"></line>
            <line x1="14" y1="15" x2="14" y2="9"></line>
          </svg>`;
    isPausing = !isPausing;
  });
};
export default {
  content,
  onLoad,
  getData,
};
