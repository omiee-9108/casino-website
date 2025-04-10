// Smooth Scroll for nav links
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function (e) {
        const targetSelector = this.getAttribute('href');
        if (targetSelector.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(targetSelector);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Active link highlighting on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('nav ul li a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Back to Top Button
const backToTop = document.createElement('button');
backToTop.innerText = "↑";
backToTop.classList.add('back-to-top');
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 🔍 Game Search Filter
const searchInput = document.getElementById("gameSearch");
const gameBoxes = document.querySelectorAll(".game-box");

if (searchInput) {
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();

        gameBoxes.forEach(box => {
            const title = box.querySelector("h4")?.innerText.toLowerCase() || '';
            if (title.includes(searchTerm)) {
                box.style.display = "block";
            } else {
                box.style.display = "none";
            }
        });
    });
}
// Contact Form Handler with Animation
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const button = contactForm.querySelector("button");
    button.disabled = true;
    button.innerText = "Sending...";

    // Add sending animation
    button.classList.add("sending");

    setTimeout(() => {
      button.innerText = "Sent!";
      formMessage.textContent = "🎉 Thanks for reaching out! We'll reply ASAP.";
      formMessage.classList.add("fade-in");
      contactForm.reset();

      // Reset the button after a short delay
      setTimeout(() => {
        button.disabled = false;
        button.innerText = "Send Message";
        button.classList.remove("sending");
        formMessage.classList.remove("fade-in");
        formMessage.textContent = "";
      }, 3000);
    }, 2000); // simulate delay
  });
}

// Mock leaderboard data (you can fetch from server later)
const players = [
    { name: "omiee", points: 1830 },
    { name: "SpinQueen", points: 1300 },
    { name: "HighRoller21", points: 1250 },
    { name: "JackpotJoe", points: 1180 },
    { name: "CasinoCat", points: 1125 }
  ];
  
  const leaderboardBody = document.getElementById("leaderboard-data");
  
  if (leaderboardBody) {
    players.forEach((player, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>#${index + 1}</td>
        <td>${player.name}</td>
        <td>${player.points}</td>
      `;
      leaderboardBody.appendChild(row);
    });
  }
// Avatar Upload Preview
  const avatarUpload = document.getElementById('avatar-upload');
const avatarPreview = document.getElementById('avatar-preview');

avatarUpload.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      avatarPreview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});
/************COIN BALANCE***********/
// Set default coins if not already set
if (!localStorage.getItem('coins')) {
  localStorage.setItem('coins', 1000);
}

function updateCoinDisplay() {
  const coinDisplay = document.getElementById('coinBalance');
  if (coinDisplay) {
    coinDisplay.textContent = localStorage.getItem('coins');
  }
}

updateCoinDisplay();
let isMusicPlaying = false;

function toggleMusic() {
  const music = document.getElementById("bgMusic");
  if (!isMusicPlaying) {
    music.volume = 0.5; // set a chill volume
    music.play().catch(err => console.log("Autoplay blocked:", err));
    isMusicPlaying = true;
  } else {
    music.pause();
    isMusicPlaying = false;
  }
}

function toggleMusic() {
  const music = document.getElementById("bgMusic");
  const button = document.getElementById("musicToggle");

  if (!isMusicPlaying) {
    music.volume = 0.5;
    music.play().catch(err => console.log("Autoplay blocked:", err));
    isMusicPlaying = true;
    button.classList.add("active");
  } else {
    music.pause();
    isMusicPlaying = false;
    button.classList.remove("active");
  }
}

  
  