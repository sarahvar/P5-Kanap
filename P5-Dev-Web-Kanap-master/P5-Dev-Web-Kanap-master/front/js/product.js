const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const _id = urlParams.get("_id")
if (_id != null){
    let itemPrice = 0
    let imgUrl, altText, articleName
}

fetch(`http://localhost:3000/api/products/${_id}`)
	.then((response) => response.json())
    .then((res) => handleData(res))
    .catch((error) => {
        console.log(error);   
    });
    
    
function handleData(kanap){
    const { altTxt, colors, description, imageUrl, name, price } = kanap
    imgUrl = imageUrl
    altText = altTxt
    articleName = name
    itemPrice = price
    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeCartContent(description)
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

function makeCartContent(description){
    const p = document.querySelector("#description")
    if ( p != null) p.textContent = description
}

function makeColors(colors){
    const select = document.querySelector("#colors")
    if (select != null){
        colors.forEach((color) => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            select.appendChild(option)
        })
    
    }
}

const button = document.querySelector("#addToCart")
button.addEventListener("click", handleClick)


function handleClick(){
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value

    if (isOrderInvalid(color,quantity)) return
    saveOrder(color, quantity)
    redirectToCart()
}


function saveOrder(color, quantity) {
    const data= {
        _id: _id,
        color: color,
        quantity: Number (quantity),
        imageUrl: imgUrl,
        altTxt: altText,
        name: articleName
    }
    localStorage.setItem(_id, JSON.stringify (data))
}
function isOrderInvalid(color,quantity){
    if (color == null || color === "" || quantity == null ||quantity <= 0 || quantity >= 101) {
        alert("S'il vous plaît selectionnez une couleur ET une quantité")
        return true
    }
}
function redirectToCart(){
    window.location.href = "cart.html"
}