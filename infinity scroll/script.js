const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');



//Helper Function to Set Attribute on DOM Elements
function setAttribute(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}



// Creat Elements for link and photo

function displayPhoto() {
    //run function for each object in photosArray
    photosArray.forEach((photo) => {
        // creat <a> to link to unplash
        const item = document.createElement('a');
        setAttribute(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //Creat <img> for photo
        const img = document.createElement('img');
        setAttribute(img, {
            src: photo.urls.regular,
            alt: photo.description,
            title: photo.description,
        });
        //Put <img> inside <a> then put inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}




// unsplash API
let photosArray = [];
const count = 10;
const apiKey = `nzag7KxqyIddO38M9ckKXdFJYugiYI962qww8N7Ru2A`;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photo from unsplash API
async function getPhoto() {
    try {
        const Response = await fetch(apiUrl);
        photosArray = await Response.json();
        displayPhoto();
    } catch (error) {
        // error
    }
}
getPhoto();

// Check to use if scrolling near bottom of page Load More hoto
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        getPhoto();
        console.log('load more');
    }
});