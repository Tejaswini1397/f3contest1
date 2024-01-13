let activeTimers = [];

const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const startNewTimerButton = document.getElementById("start-new-timer");
const current=document.getElementById("current");

startNewTimerButton.addEventListener("click", () => {
  const hours = parseInt(hoursInput.value) || 0;
  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;

  const duration = hours * 3600 + minutes * 60 + seconds;

  if (duration > 0) {
    startNewTimer(duration);
  }
 current.textContent="";
});


function startNewTimer(duration) {
    const intervalId = setInterval(() => {
        duration--;
        if (duration < 0) {
            clearInterval(intervalId);
            completeTimer(intervalId);
        } else {
            const timerDisplay = document.querySelector(`.timer-display[data-interval-id="${intervalId}"] .time-remaining-display`);
            if (timerDisplay) {
                timerDisplay.textContent = formatTime(duration);
            }
        }
    }, 1000);

    const newTimer = {
        duration: duration,
        intervalId: intervalId,
    };

    activeTimers.push(newTimer);
    displayTimer(newTimer);
}

function completeTimer(intervalId) {
  const timerDisplay = document.querySelector(
    `.timer-display[data-interval-id="${intervalId}"]`
  );
  timerDisplay.classList.add("ended");
  timerDisplay.innerText = "Timer Is Up!";
  timerDisplay.className = "timer-input-section1";
  //  timerDisplay.style.color="yellow";
  timerDisplay.style.fontSize = "20px";

  const stopTimerButton = document.createElement("button");
  stopTimerButton.classList.add("stop-timer-button");
  stopTimerButton.textContent = "Stop";
  stopTimerButton.id = "start-new-timer1";
  stopTimerButton.style.backgroundColor = "black";
  stopTimerButton.style.color = "white";

  timerDisplay.appendChild(stopTimerButton);
  const audio = new Audio("path/to/audio/file.mp3");
  audio.play();
  stopTimerButton.addEventListener("click", () => {
    timerDisplay.remove();
  });
}

function displayTimer(timer) {
  const timerDisplay = document.createElement("div");
  timerDisplay.className = "timer-input-section";
  timerDisplay.classList.add("timer-display");
  timerDisplay.setAttribute("data-interval-id", timer.intervalId);
 

  const timeRemainingDisplay = document.createElement("div");
  timeRemainingDisplay.classList.add("time-remaining-display");
  timeRemainingDisplay.textContent = formatTime(timer.duration);


  const h1 = document.createElement("h3");
  h1.innerText = "Timer Left :";
  h1.style.color = "#ffff";
  h1.style.fontSize = "15px";
  h1.style.alignContent="left";

  const stopTimerButton = document.createElement("button");
  stopTimerButton.classList.add("stop-timer-button");
  stopTimerButton.textContent = "Delete";
  stopTimerButton.id = "start-new-timer";
  stopTimerButton.style.alignItems="right";

  timerDisplay.appendChild(h1);
  timerDisplay.appendChild(timeRemainingDisplay);
  timerDisplay.appendChild(stopTimerButton);

  const activeTimersDisplaySection = document.querySelector(
    ".active-timers-display-section"
  );
  activeTimersDisplaySection.appendChild(timerDisplay);

  stopTimerButton.addEventListener("click", () => {
    stopTimer(timer.intervalId);

    timerDisplay.remove();
  });
}

function stopTimer(intervalId) {
  clearInterval(intervalId);
  const timer = activeTimers.find((t) => t.intervalId === intervalId);
  if (timer) {
    const index = activeTimers.indexOf(timer);
    if (index > -1) {
      activeTimers.splice(index, 1);
    }
  }
}

function formatTime(timeInSeconds) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}