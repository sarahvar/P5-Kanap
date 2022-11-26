const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const _id = urlParams.get("_id")
console.log({queryString})

fetch(`http://localhost:3000/api/products/${_id}`)
	.then((response) => response.json())
    .then((res) => handleData(res))
    
function handleData(kanap){
    const { altTxt, colors, description, imageUrl, name, price, _id} = kanap
    makeImage(imageUrl, altTxt)
    makeTitle(name)
}
function makeImage(imageUrl, altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image)
}

function makeTitle(name){
    document.querySelector("#title").textContent = name
}