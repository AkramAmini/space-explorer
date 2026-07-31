// ========================================
// ELEMENTS
// ========================================

const planetContainer = document.getElementById("planet-container");
const favoriteContainer = document.getElementById("favorite-container");

const searchInput = document.getElementById("search-input");

const modal = document.querySelector(".modal");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.querySelector(".close-btn");

const themeBtn = document.getElementById("theme-btn");

const menuBtn = document.getElementById("menu-btn");
const navbar = document.querySelector(".navbar");

// ========================================
// RENDER PLANETS
// ========================================

function renderPlanets(data = planets) {
  planetContainer.innerHTML = "";

  data.forEach((planet) => {
    const card = document.createElement("div");

    card.className = "planet-card";

    card.innerHTML = `

            <img src="${planet.image}" alt="${planet.name}">

            <div class="badge">
                ${planet.type}
            </div>

            <div class="planet-card-content">

                <h3>${planet.name}</h3>

                <p>${planet.description}</p>

                <div class="planet-info">

                    <span>🌍 ${planet.diameter}</span>

                    <span>🌙 ${planet.moons}</span>

                </div>

                <div class="card-buttons">

                    <button
                        class="favorite-btn"
                        data-id="${planet.id}"
                    >
                        ⭐ Favorite
                    </button>

                    <button
                        class="learn-btn"
                        data-id="${planet.id}"
                    >
                        Learn More
                    </button>

                </div>

            </div>

        `;

    planetContainer.appendChild(card);
  });
}

renderPlanets();

// ========================================
// SEARCH
// ========================================

searchInput.addEventListener("input", function () {
  const value = this.value.toLowerCase();

  const filtered = planets.filter((planet) =>
    planet.name.toLowerCase().includes(value),
  );

  renderPlanets(filtered);
});
// ========================================
// FAVORITES
// ========================================

planetContainer.addEventListener("click", function (e) {
  const id = Number(e.target.dataset.id);

  // Favorite Button
  if (e.target.classList.contains("favorite-btn")) {
    const planet = planets.find((p) => p.id === id);

    if (!isFavorite(id)) {
      addFavorite(planet);

      showToast(`${planet.name} added to favorites ⭐`);
    } else {
      removeFavorite(id);

      showToast(`${planet.name} removed from favorites ❌`);
    }

    renderFavorites();
  }

  // Learn More Button
  if (e.target.classList.contains("learn-btn")) {
    const planet = planets.find((p) => p.id === id);

    openModal(planet);
  }
});

// ========================================
// RENDER FAVORITES
// ========================================

function renderFavorites() {
  const favorites = getFavorites();

  favoriteContainer.innerHTML = "";

  if (favorites.length === 0) {
    favoriteContainer.innerHTML = `
            <p class="empty">
                No favorite planets yet.
            </p>
        `;

    return;
  }

  favorites.forEach((planet) => {
    favoriteContainer.innerHTML += `

        <div class="planet-card">

            <img src="${planet.image}" alt="${planet.name}">

            <div class="planet-card-content">

                <h3>${planet.name}</h3>

                <p>${planet.description}</p>

            </div>

        </div>

        `;
  });
}

renderFavorites();

// ========================================
// MODAL
// ========================================

function openModal(planet) {
  modalBody.innerHTML = `

        <img src="${planet.image}" alt="${planet.name}">

        <h2>${planet.name}</h2>

        <p>${planet.description}</p>

        <ul>

            <li><strong>Type:</strong> ${planet.type}</li>

            <li><strong>Diameter:</strong> ${planet.diameter}</li>

            <li><strong>Distance:</strong> ${planet.distance}</li>

            <li><strong>Moons:</strong> ${planet.moons}</li>

        </ul>

    `;

  modal.classList.add("active");
}

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

// ========================================
// DARK / LIGHT MODE
// ========================================

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "light");

    themeBtn.innerHTML = "☀️";
  } else {
    localStorage.setItem("theme", "dark");

    themeBtn.innerHTML = "🌙";
  }
});

// ========================================
// MOBILE MENU
// ========================================

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
}

// ========================================
// CLOSE MOBILE MENU AFTER CLICK
// ========================================

document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
  });
});

// ========================================
// SMOOTH SCROLL
// ========================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// ========================================
// SMALL CARD ANIMATION
// ========================================

const cards = document.querySelectorAll(".planet-card");

cards.forEach((card, index) => {
  card.style.opacity = "0";

  card.style.transform = "translateY(40px)";

  setTimeout(() => {
    card.style.transition = "0.5s";

    card.style.opacity = "1";

    card.style.transform = "translateY(0)";
  }, index * 120);
});

// ========================================
// SPACE FACTS
// ========================================

const facts = [
  "Mercury is the closest planet to the Sun.",

  "Venus is the hottest planet in the Solar System.",

  "Earth is the only known planet that supports life.",

  "Mars has the largest volcano in the Solar System.",

  "Jupiter is so large that more than 1,300 Earths could fit inside it.",

  "Saturn's rings are mostly made of ice.",

  "Uranus rotates on its side.",

  "Neptune has the fastest winds in the Solar System.",

  "The Sun contains over 99% of the Solar System's mass.",

  "One day on Venus is longer than one year on Venus.",
];

const factText = document.getElementById("fact-text");

const nextFactBtn = document.getElementById("next-fact");

nextFactBtn.addEventListener("click", () => {
  const random = Math.floor(Math.random() * facts.length);

  factText.textContent = facts[random];
});

// ========================================
// TOAST NOTIFICATION
// ========================================

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toast-message");

function showToast(message) {
  toastMessage.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}
