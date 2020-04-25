const grid = document.getElementById('grid');
const loader = document.getElementById('loader');

const photosArray = [];
const count = 30;
const apiKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Show/Hide Loader
function toggleLoader() {
  loader.hidden = !loader.hidden;
}

// Send Photos to DOM Elements
function displayPhotos() {
  grid.innerHTML = photosArray
    .map(
      (photo) => `
        <div>
            <a href="${photo.links.download}" target="_blank">
                <img src="${photo.urls.regular}" alt="${photo.alt_description}" title="${photo.alt_description}" style="width: 100%" loading="lazy">
            </a>
        </div>
        `,
    )
    .join('');
  setTimeout(toggleLoader, 3000);
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
      const photoItem = data[i];
      photosArray.push(photoItem);
    }
    // console.log(photosArray);
    displayPhotos();
  } catch (error) {
    // Catch Error Here
  }
}

// Load More Photos, Show Loading Animation
function loadMore() {
  toggleLoader();
  getPhotos();
}

// Check to see if scrolling near bottom of page, Load More
window.addEventListener('scroll', () => {
  let ready = true;
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 500
    && ready === true
  ) {
    ready = false;
    setTimeout(() => {
      ready = true;
      // console.log('ready');
    }, 5000);
    loadMore();
  }
});

// On Load
getPhotos();
