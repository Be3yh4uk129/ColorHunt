if (document.getElementById("game")) {
  const startBtn = document.getElementById("start-button");
  const nextBtn = document.getElementById("next-button");
  const restartBtn = document.getElementById("restart-button");

  const startScreen = document.getElementById("start-screen");
  const gameScreen = document.getElementById("game-screen");
  const resultScreen = document.getElementById("result-screen");

  const grid = document.getElementById("grid");
  const currentScore = document.getElementById("current-score");
  const finalScore = document.getElementById("final-score");
  const recordTime = document.getElementById("record-time");
  const timerDisplay = document.getElementById("timer");

  let answered = false;
  let score = 0;
  let round = 0;
  let correctColor = "";
  let startTime;
  let timerInterval;
  let bestTime = localStorage.getItem("bestTime")
    ? Number(localStorage.getItem("bestTime"))
    : null;

  function generateColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function slightlyDifferent(hex) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    const channel = Math.floor(Math.random() * 3);
    let diff = round >= 5 ? 10 : round >= 3 ? 20 : 35;
    const delta = Math.random() < 0.5 ? diff : -diff;
    if (channel === 0) r = clamp(r + delta);
    else if (channel === 1) g = clamp(g + delta);
    else b = clamp(b + delta);
    return "#" + toHex(r) + toHex(g) + toHex(b);
  }

  function clamp(value) {
    return Math.max(0, Math.min(255, value));
  }

  function toHex(num) {
    const hex = num.toString(16).toUpperCase();
    return hex.length === 1 ? "0" + hex : hex;
  }

  function generateGrid() {
  answered = false;
  grid.innerHTML = "";
  const baseColor = generateColor();
  correctColor = slightlyDifferent(baseColor);
  let count = round >= 5 ? 9 : round >= 3 ? 6 : 4;

  const colors = Array(count).fill(baseColor);
  const index = Math.floor(Math.random() * count);
  colors[index] = correctColor;

  const columns = Math.ceil(Math.sqrt(count));
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = `repeat(${columns}, minmax(80px, 1fr))`;
  grid.style.gap = "10px";
  grid.style.justifyItems = "center";

  colors.forEach((color) => {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.backgroundColor = color;
    square.onclick = () => handleSquareClick(color);
    grid.appendChild(square);
  });
}


  function handleSquareClick(selectedColor) {
    if (answered) return;
    if (selectedColor === correctColor) score++;
    currentScore.textContent = `Счёт: ${score}`;
    nextBtn.classList.remove("hide");
    answered = true;
  }

  function nextRound() {
    round++;
    if (round >= 6) {
      showResult();
    } else {
      nextBtn.classList.add("hide");
      generateGrid();
    }
  }

  function showResult() {
    clearInterval(timerInterval);
    gameScreen.classList.add("hide");
    resultScreen.classList.remove("hide");
    finalScore.textContent = `Ваш счёт: ${score} из 6`;

    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    recordTime.textContent = `Время: ${timeTaken} сек`;

    if (bestTime === null || timeTaken < bestTime) {
      bestTime = timeTaken;
      localStorage.setItem("bestTime", bestTime);
      recordTime.textContent += " (Новый рекорд!)";
    }

    let playerName = "NoName";

    try {
      const isLoggedIn = localStorage.getItem("loggedIn") === "true";
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (isLoggedIn && storedUser && storedUser.firstName) {
        playerName = storedUser.firstName;
      } else {
        playerName = "NoName";
      }
    } catch (err) {
      console.warn("Ошибка чтения user:", err);
    }

    const record = {
      name: playerName,
      score: `${score}/6 за ${timeTaken} сек`,
    };

    const tempRecords = JSON.parse(localStorage.getItem("tempRecords")) || [];
    tempRecords.push(record);
    localStorage.setItem("tempRecords", JSON.stringify(tempRecords));
    console.log("Сохранён рекорд:", record);

    createFireworks();
  }

  function startTimer() {
    startTime = Date.now();
    timerDisplay.textContent = "⏱ Время: 0 сек";
    timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      timerDisplay.textContent = `⏱ Время: ${elapsed} сек`;
    }, 1000);
  }

  startBtn.onclick = () => {
    startScreen.classList.add("hide");
    gameScreen.classList.remove("hide");
    score = 0;
    round = 0;
    currentScore.textContent = `Счёт: ${score}`;
    generateGrid();
    startTimer();
  };

  nextBtn.onclick = nextRound;

  restartBtn.onclick = () => {
    resultScreen.classList.add("hide");
    startScreen.classList.remove("hide");
    gameScreen.classList.add("hide");
    score = 0;
    round = 0;
    answered = false;
    clearInterval(timerInterval);
    currentScore.textContent = `Счёт: ${score}`;
    nextBtn.classList.add("hide");
  };

  function createFireworks() {
    const container = document.getElementById("fireworks-container");
    container.innerHTML = "";

    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        createSingleFirework(container);
      }, i * 100);
    }
  }

  function createSingleFirework(container) {
  const firework = document.createElement("div");
  firework.className = "firework";

  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;

  const colors = ["#FF006E", "#3A86FF", "#8338EC", "#FFBE0B", "#FB5607"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  const angle = Math.random() * Math.PI * 2;
  const distance = 50 + Math.random() * 100;
  const tx = Math.cos(angle) * distance;
  const ty = Math.sin(angle) * distance;

  firework.style.cssText = `
    left: ${x}px;
    top: ${y}px;
    background-color: ${color};
    --tx: ${tx}px;
    --ty: ${ty}px;
    box-shadow: 0 0 10px ${color};
  `;

  container.appendChild(firework);

  setTimeout(() => firework.remove(), 1500);
}

}
