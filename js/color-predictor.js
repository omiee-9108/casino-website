let coins = 1000;
let selectedColor = null;
const coinDisplay = document.getElementById("coins");
const resultMsg = document.getElementById("resultMsg");
const spinner = document.getElementById("spinner");

function updateCoinsDisplay() {
  coinDisplay.textContent = coins;
}

function selectColor(color) {
  selectedColor = color;
  resultMsg.textContent = `You selected ${color.toUpperCase()}`;
}

function spinWheel() {
  const bet = parseInt(document.getElementById("betAmount").value);
  if (!selectedColor || isNaN(bet) || bet <= 0) {
    resultMsg.textContent = "Select a color and enter a valid bet!";
    return;
  }

  if (bet > coins) {
    resultMsg.textContent = "Not enough coins!";
    return;
  }

  spinner.style.display = "block";
  resultMsg.textContent = "Spinning...";

  setTimeout(() => {
    spinner.style.display = "none";

    const colors = ['red', 'green', 'black'];
    const result = colors[Math.floor(Math.random() * 3)];

    if (result === selectedColor) {
      const winAmount = bet * 2;
      coins += winAmount;
      resultMsg.innerHTML = `🎉 It was <b>${result}</b>. You won <b>${winAmount}</b> coins!`;
      triggerCoinShower();
    } else {
      coins -= bet;
      resultMsg.innerHTML = `❌ It was <b>${result}</b>. You lost <b>${bet}</b> coins.`;
    }

    updateCoinsDisplay();
  }, 2000);
}

function triggerCoinShower() {
  const shower = document.querySelector(".coin-shower");
  for (let i = 0; i < 30; i++) {
    const coin = document.createElement("div");
    coin.classList.add("coin");
    coin.style.left = `${Math.random() * 100}vw`;
    coin.style.animationDelay = `${Math.random()}s`;
    shower.appendChild(coin);
    setTimeout(() => coin.remove(), 3000);
  }
}

updateCoinsDisplay();
