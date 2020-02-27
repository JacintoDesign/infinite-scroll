const grid = document.getElementById('grid');
const loader = document.getElementById('loader');

let ready = true;
let photosArray = [];
const count = 10;
const accessKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek';
const apiEndpoint = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}`

// Get photos from Unsplash API
function getPhotos() {
    fetch(apiEndpoint)
    .then(res => res.json())
    .then(data => {
        for (i = 0; i < data.length; i++) {
            photoItem = data[i];
            photoLink = data[i].urls.regular;
            if (photoLink !== undefined) {               
                photosArray.unshift(photoItem);
            } else {
                console.log('undefined photo');
            }
        }
        console.log(photosArray);
        displayPhotos();
    })
}

// Show photos in DOM
function displayPhotos() {
    window.scroll(0, -5000);
    grid.innerHTML = photosArray.map(
        photo => `
        <div>
            <a href="${photo.links.download}" target="_blank">
                <img src="${photo.urls.regular}" alt="${photo.alt_description}" title="${photo.alt_description}" style="width: 100%">
            </a>
        </div>
        `
    ).join('');
    setTimeout( () => {
        loader.style.display = 'none';
    }, 2000);
}

function loadMore() {
    loader.style.display = 'block';
    getPhotos();
}

window.addEventListener('scroll', function() {
    if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) && ready) {
        ready = false; 
        setTimeout( () => {
            ready = true;
            console.log('ready');
        }, 3000);
        loadMore();
    }
  });

getPhotos();