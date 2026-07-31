// =========================================
// LOCAL STORAGE
// =========================================

const STORAGE_KEY = "favoritePlanets";

// Get favorites from Local Storage
function getFavorites() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Save favorites
function saveFavorites(favorites) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

// Add a planet to favorites
function addFavorite(planet) {
  const favorites = getFavorites();

  const exists = favorites.some(item => item.id === planet.id);

  if (!exists) {
    favorites.push(planet);
    saveFavorites(favorites);
  }
}

// Remove a planet from favorites
function removeFavorite(id) {
  const favorites = getFavorites().filter(
    planet => planet.id !== id
  );

  saveFavorites(favorites);
}

// Check if a planet is already a favorite
function isFavorite(id) {
  return getFavorites().some(
    planet => planet.id === id
  );
}