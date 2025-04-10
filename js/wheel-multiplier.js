const wheel = document.getElementById("wheel");
const coinDisplay = document.getElementById("coinBalance");
const resultDisplay = document.getElementById("result");
const betInput = document.getElementById("betAmount");
const coinShower = document.getElementById("coinShower");

let coins = 1000;
let bet = 100;
let currentRotation = 0;

const segments = ["x0.5", "x1", "x2", "x3", "x5", "x10"];
const colors = ["#ff4dd2", "#ffe066", "#ff884d", "#ff5e57", "#bf7fff", "#33ffc9"];
const anglePerSegment = 360 / segments.length;

function setupWheel() {
  segments.forEach((label, i) => {
    const segment = document.createElement("div");
    segment.className = "segment";
    segment.style.transform = `rotate(${i * anglePerSegment}deg)`;
    segment.style.background = colors[i % colors.length];
    segment.innerHTML = `<span>${label}</span>`;
    wheel.appendChild(segment);
  });
}

function placeBet() {
  const val = parseInt(betInput.value);
  if (isNaN(val) || val < 1 || val > coins) {
    resultDisplay.textContent = "Invalid bet!";
    return;
  }
  bet = val;
  resultDisplay.textContent = `Bet placed: ${bet} coins`;
}

function spinWheel() {
  if (bet > coins) {
    resultDisplay.textContent = "Not enough coins!";
    return;
  }

  const randIndex = Math.floor(Math.random() * segments.length);
  const multiplier = parseFloat(segments[randIndex].replace("x", ""));
  const spins = 5;
  const rotation = 360 * spins + (360 - randIndex * anglePerSegment - anglePerSegment / 2);
  currentRotation += rotation;

  wheel.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    const winnings = Math.floor(bet * multiplier);
    coins += winnings - bet;
    coinDisplay.textContent = coins;

    resultDisplay.textContent = `You spun ${segments[randIndex]} — You ${winnings > bet ? "Win!" : "Lose"} (Won ${winnings})`;

    if (winnings > bet) triggerCoinShower();
  }, 4000);
}
  

setupWheel();
