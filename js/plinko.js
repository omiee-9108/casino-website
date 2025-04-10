let coins = 1000;
const coinDisplay = document.getElementById("coins");
const resultMsg = document.getElementById("resultMsg");

const multipliers = [0, 2, 5, 10, 5, 2, 0];

function updateCoinDisplay() {
  coinDisplay.textContent = coins;
}

function createPlinkoBoard() {
  const board = document.getElementById("plinkoBoard");
  board.innerHTML = "";
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c <= r; c++) {
      const peg = document.createElement("div");
      peg.className = "peg";
      peg.style.top = `${r * 45}px`;
      peg.style.left = `${40 + c * 50 - (r * 25)}px`;
      board.appendChild(peg);
    }
  }
}

function createSlots() {
  const slotsContainer = document.getElementById("slotsContainer");
  slotsContainer.innerHTML = "";
  multipliers.forEach(mult => {
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.textContent = `x${mult}`;
    slotsContainer.appendChild(slot);
  });
}

function dropBall() {
  const bet = parseInt(document.getElementById("betAmount").value);
  if (isNaN(bet) || bet <= 0) {
    resultMsg.textContent = "Enter a valid bet.";
    return;
  }

  if (bet > coins) {
    resultMsg.textContent = "Not enough coins!";
    return;
  }

  coins -= bet;
  updateCoinDisplay();
  resultMsg.textContent = "";

  const ball = document.createElement("div");
  ball.className = "ball";
  const board = document.getElementById("plinkoBoard");
  board.appendChild(ball);

  let row = 0;
  let col = 3; // Start from center

  const drop = setInterval(() => {
    if (row >= 6) {
      clearInterval(drop);
      const multiplier = multipliers[col];
      const win = bet * multiplier;
      coins += win;
      updateCoinDisplay();

      resultMsg.innerHTML = multiplier > 0
        ? `🎉 You won ${win} coins!`
        : `😢 No win this time.`;

      if (win > 0) triggerCoinShower();
      ball.remove();
    } else {
      col += Math.random() < 0.5 ? -1 : 1;
      if (col < 0) col = 0;
      if (col >= multipliers.length) col = multipliers.length - 1;
      row++;

      ball.style.top = `${row * 45}px`;
      ball.style.left = `${40 + col * 50 - (row * 25)}px`;
    }
  }, 300);
}

function triggerCoinShower() {
  const coinShower = document.querySelector('.coin-shower');
  for (let i = 0; i < 30; i++) {
    const coin = document.createElement('div');
    coin.classList.add('coin');
    coin.style.left = `${Math.random() * 100}vw`;
    coin.style.animationDelay = `${Math.random()}s`;
    coinShower.appendChild(coin);
    setTimeout(() => coin.remove(), 3000);
  }
}

createPlinkoBoard();
createSlots();
updateCoinDisplay();
