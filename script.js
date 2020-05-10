const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let imagesArray = [];

// Unsplash API
const count = 30;
const apiKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek';
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

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Images, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = imagesArray.length;
  // console.log(totalImages);
  // Create <a> to link to full photo
  imagesArray.forEach((image) => {
    const item = document.createElement('a');
    setAttributes(item, {
      href: image.links.download,
      target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: image.urls.regular,
      alt: image.alt_description,
      title: image.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  imagesArray = [];
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    data.forEach((image) => {
      imagesArray.push(image);
    });
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
