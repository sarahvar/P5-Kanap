const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const _id = urlParams.get("_id")
console.log({queryString})

fetch(`http://localhost:3000/api/products/${_id}`)
	.then((response) => response.json())
    .then((res) => handleData(res))
    
function handleData(kanap){
    const altTxt = kanap.altTxt
    const colors = kanap.colors
    const description = kanap.description
    const imageUrl = kanap.imageUrl
    const name = kanap.name
    const price = kanap.price
    const _id = kanap._id
    makeImage(imageUrl, altTxt)
}

function makeImage(imageUrl, altTxt){
    const image = document.createElement("image")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector("item__img")
    parent.appendChild(image)
}