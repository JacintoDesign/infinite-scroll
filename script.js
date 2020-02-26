const grid = document.getElementById('grid');
const loader = document.getElementById('loader');

const count = 10;
const accessKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek';
const apiEndpoint = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}`

// Get photos from Unsplash API
async function getPhotos() {
    const res = await fetch(apiEndpoint);
    const data = await res.json();
    console.log(data);
    return data;
}

// Show photos in DOM
async function updateDOM() {
    const photos = await getPhotos();

    photos.forEach(photo => {
        grid.innerHTML += `
        <div>
            <a href="${photo.links.download}" target="_blank">
                <img src="${photo.urls.regular}" alt="${photo.alt_description}" title="${photo.alt_description}" style="width: 100%">
            </a>
        </div>
        `
    }

    )
}

updateDOM();