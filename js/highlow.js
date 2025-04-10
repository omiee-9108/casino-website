let currentCard = 0;
let coins = 100;

const coinDisplay = document.getElementById("coinBalance");
const resultMsg = document.getElementById("resultMsg");
const nextCardBtn = document.getElementById("nextCardBtn");

function getRandomCard() {
  return Math.floor(Math.random() * 9) + 2; // 2 to 10
}

function startGame() {
  currentCard = getRandomCard();
  revealCard(currentCard);
  resultMsg.textContent = "";
  nextCardBtn.style.display = "none";
}
startGame();

function guess(type) {
  const nextCard = getRandomCard();
  revealCard(nextCard); // trigger card flip animation

  let result = "";
  if (
    (type === "higher" && nextCard > currentCard) ||
    (type === "lower" && nextCard < currentCard)
  ) {
    coins += 10;
    result = `✅ Correct! It was ${nextCard}`;
    triggerCoinRain(); // celebrate with coin rain
  } else if (nextCard === currentCard) {
    result = `😐 Same card! No change. It was ${nextCard}`;
  } else {
    coins -= 10;
    result = `❌ Wrong! It was ${nextCard}`;
  }

  currentCard = nextCard; // update for next round
  coinDisplay.textContent = coins;
  resultMsg.textContent = result;
  nextCardBtn.style.display = "inline-block";
}

function nextCard() {
  startGame();
}

function revealCard(value) {
  const cardContainer = document.getElementById("cardContainer");
  const cardValue = document.getElementById("cardValue");

  cardValue.textContent = value;
  cardContainer.classList.add("flipped");

  setTimeout(() => {
    cardContainer.classList.remove("flipped");
  }, 1500);
}

function triggerCoinRain() {
  const coinRain = document.getElementById("coinRain");
  coinRain.innerHTML = ""; // Clear previous

  for (let i = 0; i < 25; i++) {
    const coin = document.createElement("div");
    coin.classList.add("coin");
    coin.style.left = Math.random() * 100 + "vw";
    coin.style.animationDelay = Math.random() * 2 + "s";
    coinRain.appendChild(coin);
  }

  setTimeout(() => {
    coinRain.innerHTML = "";
  }, 4000);
}
