let coins = 1000;
const coinsDisplay = document.getElementById('coins');
const result = document.getElementById('resultMsg'); // Fixed ID to match HTML

function updateCoinsDisplay() {
  coinsDisplay.textContent = coins;
}

function playGame() {
  const guess = parseInt(document.getElementById('guess').value);
  const bet = parseInt(document.getElementById('bet').value);

  if (isNaN(guess) || guess < 1 || guess > 10 || isNaN(bet) || bet <= 0) {
    result.innerText = "❗ Enter a valid number (1-10) and bet amount!";
    return;
  }

  if (bet > coins) {
    result.innerText = "❌ Not enough coins!";
    return;
  }

  const drawn = Math.floor(Math.random() * 10) + 1;
  let isWin = false;
  let coinChange = 0;

  if (guess === drawn) {
    coinChange = bet * 10;
    coins += coinChange;
    isWin = true;
    result.innerHTML = `🎉 You guessed ${guess}, drawn number was ${drawn}. <br> You win ${coinChange} coins!`;
    triggerCoinShower();
  } else {
    coinChange = -bet;
    coins += coinChange;
    result.innerHTML = `😢 You guessed ${guess}, drawn number was ${drawn}. <br> You lost ${bet} coins.`;
  }

  updateCoinsDisplay();
  updateResultsTable(guess, drawn, isWin, coinChange);
}

function triggerCoinShower() {
  const coinShower = document.querySelector('.coin-shower');
  for (let i = 0; i < 40; i++) {
    const coin = document.createElement('div');
    coin.classList.add('coin');
    coin.style.left = `${Math.random() * 100}vw`;
    coin.style.animationDelay = `${Math.random()}s`;
    coinShower.appendChild(coin);
    setTimeout(() => coin.remove(), 3000);
  }
}

let resultCount = 0;

function updateResultsTable(playerPick, drawnNumber, isWin, coinsChange) {
  const tableBody = document.getElementById("resultsTableBody");
  resultCount++;

  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${resultCount}</td>
    <td>${playerPick}</td>
    <td>${drawnNumber}</td>
    <td class="${isWin ? 'win' : 'lose'}">${isWin ? 'Win' : 'Lose'}</td>
    <td class="${isWin ? 'win' : 'lose'}">${isWin ? '+' : ''}${coinsChange}</td>
  `;

  tableBody.appendChild(row);
  tableBody.scrollTop = tableBody.scrollHeight;
}

// Initialize coin display on load
updateCoinsDisplay();

