const grid = document.getElementById('grid');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let imagesArray = [];

// Unsplash API
const count = 30;
const apiKey = config.API_KEY;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    // console.log('all images loaded');
    ready = true;
    loader.hidden = true;
  }
}

// Create Elements For Links & Images, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = imagesArray.length;
  // console.log(totalImages);
  for (let i = 0; i < imagesArray.length; i++) {
    // Create <a> to link to full photo
    const item = document.createElement('a');
    item.setAttribute('href', imagesArray[i].links.download);
    item.setAttribute('target', '_blank');
    // Create <img> for photo
    const img = document.createElement('img');
    img.setAttribute('src', imagesArray[i].urls.regular);
    img.setAttribute('alt', imagesArray[i].alt_description);
    img.setAttribute('title', imagesArray[i].alt_description);
    img.setAttribute('width', '100%');
    img.setAttribute('height', '100%');
    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    // Put <img> inside <a>, then put both inside Grid Element
    item.appendChild(img);
    grid.appendChild(item);
  }
}

// Get photos from Unsplash API
async function getPhotos() {
  imagesArray = [];
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
      const image = data[i];
      imagesArray.push(image);
    }
    // console.log(imagesArray);
    displayPhotos();
  } catch (error) {
    // Catch Error Here
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
