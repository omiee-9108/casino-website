const board = document.getElementById("board");
const coinsDisplay = document.getElementById("coins");
const status = document.getElementById("status");
const ball = document.getElementById("ball");
const historyList = document.getElementById("history");

let selectedChip = 10;
let coins = 10000;
let bets = {};
let lastBets = {};

const redNumbers = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
const blackNumbers = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];

function selectChip(value) {
  selectedChip = value;
}

function createBoard() {
  for (let i = 0; i <= 36; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("id", `cell-${i}`);
    if (i === 0) cell.classList.add("green");
    else if (redNumbers.includes(i)) cell.classList.add("red");
    else cell.classList.add("black");

    cell.textContent = i;
    cell.onclick = () => placeBet(i);
    board.appendChild(cell);
  }

  createExtraBettingAreas();
}

function createExtraBettingAreas() {
  const controls = document.querySelector(".controls");
  const extraDiv = document.createElement("div");
  extraDiv.classList.add("chips");

  const rangeBets = [
    { label: "1 to 18", type: "1to18" },
    { label: "19 to 36", type: "19to36" },
    { label: "1st Dozen", type: "dozen1" },
    { label: "2nd Dozen", type: "dozen2" },
    { label: "3rd Dozen", type: "dozen3" }
  ];

  rangeBets.forEach(({ label, type }) => {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.onclick = () => betRange(type);
    extraDiv.appendChild(btn);
  });

  controls.before(extraDiv);
}

function placeBet(number) {
  if (coins < selectedChip) {
    alert("Not enough coins!");
    return;
  }

  // 🎧 Try to play the sound safely
  const chipAudio = document.getElementById("chipSound");
  if (chipAudio) {
    chipAudio.volume = 1;
    chipAudio.muted = false;
    chipAudio.play().catch((e) => {
      console.warn("Chip sound failed to play:", e);
    });
  }

  coins -= selectedChip;
  bets[number] = (bets[number] || 0) + selectedChip;
  updateCoins();
  showChipOnCell(number);
}


function showChipOnCell(number) {
  const cell = document.getElementById(`cell-${number}`);
  let chip = cell.querySelector(".chip");
  if (!chip) {
    chip = document.createElement("div");
    chip.classList.add("chip");
    cell.appendChild(chip);
  }
  chip.textContent = bets[number];
}

function updateCoins() {
  coinsDisplay.textContent = coins;
}

function spinWheel() {
  const result = Math.floor(Math.random() * 37); // 0-36
  let angle = 360 * 5 + (result / 37) * 360;

  ball.style.transition = "transform 4s ease-out";
  ball.style.transform = `rotate(${angle}deg)`;

  setTimeout(() => {
    evaluateResult(result);
    ball.style.transition = "none";
    ball.style.transform = "rotate(0deg)";
  }, 4000);
}

function evaluateResult(number) {
  let win = 0;
  if (bets[number]) {
    win += bets[number] * 35;
  }

  if (bets['even'] && number !== 0 && number % 2 === 0) win += bets['even'] * 2;
  if (bets['odd'] && number % 2 === 1) win += bets['odd'] * 2;

  if (bets['1to18'] && number >= 1 && number <= 18) win += bets['1to18'] * 2;
  if (bets['19to36'] && number >= 19 && number <= 36) win += bets['19to36'] * 2;

  if (bets['dozen1'] && number >= 1 && number <= 12) win += bets['dozen1'] * 3;
  if (bets['dozen2'] && number >= 13 && number <= 24) win += bets['dozen2'] * 3;
  if (bets['dozen3'] && number >= 25 && number <= 36) win += bets['dozen3'] * 3;

  coins += win;
  updateCoins();

  status.innerHTML = `<strong>Result:</strong> ${number} ${getColor(number)}<br>` +
                     (win > 0 ? `🎉 You won ${win} coins!` : `💸 You lost.`);

  addToHistory(number, win > 0);
  lastBets = { ...bets };
  clearChips();
  bets = {}; // reset bets
}

function getColor(number) {
  if (number === 0) return "Green";
  if (redNumbers.includes(number)) return "Red";
  return "Black";
}

function addToHistory(number, won) {
  const item = document.createElement("div");
  item.textContent = `🎯 ${number} - ${won ? "Win" : "Loss"}`;
  item.style.color = won ? "lime" : "red";
  historyList.prepend(item);
}

function clearChips() {
  for (let i = 0; i <= 36; i++) {
    const cell = document.getElementById(`cell-${i}`);
    const chip = cell.querySelector(".chip");
    if (chip) cell.removeChild(chip);
  }
}

function rebet() {
  Object.entries(lastBets).forEach(([num, amount]) => {
    if (coins >= amount) {
      if (!isNaN(parseInt(num))) {
        placeBet(parseInt(num));
      } else {
        coins -= amount;
        bets[num] = amount;
      }
    }
  });
  updateCoins();
}

function betEvenOdd(type) {
  if (coins < selectedChip) {
    alert("Not enough coins!");
    return;
  }
  bets[type] = (bets[type] || 0) + selectedChip;
  coins -= selectedChip;
  updateCoins();
}

function betRange(type) {
  if (coins < selectedChip) {
    alert("Not enough coins!");
    return;
  }
  bets[type] = (bets[type] || 0) + selectedChip;
  coins -= selectedChip;
  updateCoins();
}

createBoard();
