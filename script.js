// DOM Elements
const initialScreen = document.getElementById("initialScreen");
const magicButton = document.getElementById("magicButton");
const explosion = document.getElementById("explosion");
const portfolio = document.getElementById("portfolio");

// Button teleportation state
let clickCount = 0;
const maxClicks = 5;

// Create explosion particles
function createExplosion(x, y) {
  explosion.innerHTML = "";
  const particleCount = 100;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random direction and speed
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 4;
    const size = 4 + Math.random() * 8;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    // Vintage color palette
    const colors = ["#8b7355", "#a38f6d", "#c9a96e", "#b8860b", "#6d5c3e"];
    particle.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    // Animation
    particle.style.animation = `
                    particleMove ${0.5 + Math.random() * 1}s ease-out forwards,
                    particleFade ${0.5 + Math.random() * 1}s ease-out forwards
                `;

    // Set custom properties for animation
    particle.style.setProperty("--angle", `${angle}rad`);
    particle.style.setProperty("--speed", `${speed}`);

    explosion.appendChild(particle);
  }

  // Add CSS for particle animation
  const style = document.createElement("style");
  style.textContent = `
                @keyframes particleMove {
                    to {
                        transform: translate(
                            calc(cos(var(--angle)) * var(--speed) * 100px),
                            calc(sin(var(--angle)) * var(--speed) * 100px)
                        );
                    }
                }
                
                @keyframes particleFade {
                    0% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                    }
                }
            `;
  document.head.appendChild(style);
}

// Teleport button to random position
function teleportButton() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const buttonWidth = magicButton.offsetWidth;
  const buttonHeight = magicButton.offsetHeight;

  // Calculate safe area (avoid edges)
  const safeMargin = 50;
  const maxX = screenWidth - buttonWidth - safeMargin;
  const maxY = screenHeight - buttonHeight - safeMargin;

  const randomX = safeMargin + Math.random() * maxX;
  const randomY = safeMargin + Math.random() * maxY;

  magicButton.style.left = `${randomX}px`;
  magicButton.style.top = `${randomY}px`;

  // Add shake effect
  magicButton.style.animation = "shake 0.5s ease";
  setTimeout(() => {
    magicButton.style.animation = "";
  }, 500);
}

// Handle button click
magicButton.addEventListener("click", function () {
  clickCount++;

  if (clickCount < maxClicks) {
    // Teleport button
    teleportButton();

    // Change button text randomly
    const messages = [
      "Seek and you shall find",
      "The journey continues",
      "Patience reveals beauty",
      "Almost discovered",
      "The final revelation",
    ];
    magicButton.textContent = messages[clickCount - 1];
  } else {
    // Final click - explode and reveal portfolio
    const rect = magicButton.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    createExplosion(x, y);
    explosion.classList.add("active");

    // Hide initial screen and show portfolio
    setTimeout(() => {
      initialScreen.classList.add("hidden");
      portfolio.classList.add("visible");

      // Add CSS for shake animation
      const shakeStyle = document.createElement("style");
      shakeStyle.textContent = `
                        @keyframes shake {
                            0%, 100% { transform: translateX(0); }
                            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
                            20%, 40%, 60%, 80% { transform: translateX(10px); }
                        }
                    `;
      document.head.appendChild(shakeStyle);
    }, 1000);
  }
});

// Add hover effect to all cards
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
});

// Form submission
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert(
      "Thank you for your message! I look forward to creating something beautiful together."
    );
    this.reset();
  });
}
