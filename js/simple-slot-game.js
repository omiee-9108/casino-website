const symbols = ['🍒', '🍋', '🍊', '🍉', '💎'];
const spinBtn = document.getElementById('spinBtn');
const slot = document.getElementById('slot');
const resultMsg = document.getElementById('resultMsg');

// Get or set coins
if (!localStorage.getItem('coins')) {
  localStorage.setItem('coins', 1000);
}

function updateCoinDisplay() {
  document.getElementById('coinBalance').textContent = localStorage.getItem('coins');
}

function spinSlot() {
  let coins = parseInt(localStorage.getItem('coins'));

  if (coins < 100) {
    resultMsg.textContent = "Not enough coins to play!";
    return;
  }

  coins -= 100; // cost to play

  // Generate 3 random symbols
  const result = [
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)]
  ];

  slot.textContent = result.join(' ');

  if (result[0] === result[1] && result[1] === result[2]) {
    coins += 500; // big win!
    resultMsg.textContent = "🎉 JACKPOT! You won 500 coins!";
  } else if (result[0] === result[1] || result[1] === result[2] || result[0] === result[2]) {
    coins += 200; // minor win
    resultMsg.textContent = "👍 Nice! You won 200 coins!";
  } else {
    resultMsg.textContent = "😢 Better luck next time!";
  }

  localStorage.setItem('coins', coins);
  updateCoinDisplay();
}

spinBtn.addEventListener('click', spinSlot);
updateCoinDisplay();
