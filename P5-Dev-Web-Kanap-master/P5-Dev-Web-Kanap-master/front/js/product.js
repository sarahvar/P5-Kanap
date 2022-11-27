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
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
}
function makeImage(imageUrl, altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image)
}

function makeTitle(name){
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
}

function makePrice(price){
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}

function makeDescription(description){
    const p = document.querySelector("#description")
    if ( p != null) p.textContent = description
}

function makeColors(colors){
    const select = document.querySelector("#colors")
    if (select != null){
        colors.forEach((color) => {
            option.value = color
            const option = document.createElement(option)
        })
    
    }
}