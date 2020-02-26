const grid = document.getElementById('grid');
const loader = document.getElementById('loader');

const count = 10;
const accessKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek';
const apiEndpoint = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}`

async function getPhotos() {
    const res = await fetch(apiEndpoint);
    const data = await res.json();
    console.log(data);
    return data;
}

getPhotos();