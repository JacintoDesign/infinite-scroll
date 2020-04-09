const grid = document.getElementById("grid");
const loader = document.getElementById("loader");

let ready = true;
let photosArray = [];
const count = 30;
const accessKey = "jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek";
const apiEndpoint = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}`;

// Get photos from Unsplash API
function getPhotos() {
  fetch(apiEndpoint)
    .then((res) => res.json())
    .then((data) => {
      for (i = 0; i < data.length; i++) {
        photoItem = data[i];
        photoLink = data[i].urls.regular;
        if (photoLink !== undefined) {
          photosArray.push(photoItem);
        } else {
          console.log("undefined photo");
        }
      }
      console.log(photosArray);
      displayPhotos();
    });
}

// Show photos in DOM
function displayPhotos() {
  // window.scroll(0, -5000);
  grid.innerHTML = photosArray
    .map(
      (photo) => `
        <div>
            <a href="${photo.links.download}" target="_blank">
                <img src="${photo.urls.regular}" alt="${photo.alt_description}" title="${photo.alt_description}" style="width: 100%" loading="lazy">
            </a>
        </div>
        `
    )
    .join("");
  setTimeout(() => {
    loader.style.display = "none";
  }, 2000);
}

// Load More Photos, Show Loading Animation
function loadMore() {
  loader.style.display = "block";
  getPhotos();
}

// Check to see if scrolling near bottom of page, Load More
window.addEventListener("scroll", function () {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
    ready
  ) {
    ready = false;
    setTimeout(() => {
      ready = true;
      console.log("ready");
    }, 3000);
    loadMore();
  }
});

// On Load
getPhotos();
