let cart = [];
async function getProductById(_id)
{
    let response_data 
    await fetch(`http://localhost:3000/api/products/${_id}`)
    .then((response) => response.json())
    .then((res) => response_data = res)
    .catch((error) => {
        console.log(error);   
    });
    return response_data.price
}


retrieveItemsFromCache()
cart.forEach((item) => {
    getProductById(item._id)
    .then((price) => displayItem(item, price))
    
})

let orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))

function retrieveItemsFromCache(){
    let numberOfItems = localStorage.length;
    for (let i = 0; i < numberOfItems; i++){
        let item = localStorage.getItem(localStorage.key(i)) || ""
        let itemObject = JSON.parse(item)
        cart.push(itemObject)
    }
}

function displayItem(item, price){
    let article = makeArticle(item)
    let imageDiv = makeImageDiv(item)
    article.appendChild(imageDiv)
    let cardItemContent = makeCartContent(item, price)
    article.appendChild(cardItemContent)
    displayArticle(article)
    displayTotalQuantity()
    displayTotalPrice()
}

function makeCartContent(item, price){
    let cardItemContent = document.createElement("div")
    cardItemContent.classList.add("cart__item__content")

    let description = makeDescription(item, price)
    let settings = makeSettings(item) 
    
    cardItemContent.appendChild(description)
    cardItemContent.appendChild(settings)
    return cardItemContent
    
}

function makeDescription(item, price){
    let description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    let h2 = document.createElement("h2")
    h2.textContent = item.name

    let p = document.createElement("p")
    p.textContent = item.color
    console.log(item)


    let span = document.createElement("p")
    span.textContent = price + " €"
    


    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(span)
    return description
}

function makeSettings(item){
    let settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    addQuantityToSettings(settings, item)
    addDeleteToSettings(settings, item)
    return settings
}
function addQuantityToSettings(settings, item){
    let quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")
    let p = document.createElement("p")
    p.textContent="Qté : "
    quantity.appendChild(p)
    let input =document.createElement("input")
    input.type = "number"
    input.classList.add = ("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    input.addEventListener("input", () => updatePriceAndQuantity(item._id, input.value,item))
    quantity.appendChild(input)
    settings.appendChild(quantity)
}
function updatePriceAndQuantity(_id, newValue,item){
  let itemToUpdate = cart.find((item) => item._id === _id)
  itemToUpdate.quantity = Number (newValue)
  item.quantity = itemToUpdate.quantity
  displayTotalQuantity()
  displayTotalPrice()
  saveNewDataToCache(item)
}

function deleteDataFromCache(item){
    let key = `${item._id}-${item.color}`
    localStorage.removeItem(key)
}

function saveNewDataToCache(item) {
  let dataToSave = JSON.stringify(item)
  let key = `${item._id}-${item.color}`
  localStorage.setItem(key, dataToSave)
}

function addDeleteToSettings(settings, item){
    let div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteItem (item))


    let p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}

function deleteItem(item){
  let itemToDelete = cart.findIndex((product) => product.id === item.id && product.color === item.color)
  cart.splice (itemToDelete, 1)
  displayTotalPrice ()
  displayTotalQuantity()
  deleteDataFromCache(item)
  deleteArticleFromPage(item)
}

function deleteArticleFromPage(item){
    let articleToDelete = document.querySelector(
        `article[data-id="${item._id}"][data-color="${item.color}]`
    )
    console.log("article supprimer", articleToDelete)
    articleToDelete.remove()
}

function displayTotalQuantity(){
  let totalQuantity = document.querySelector("#totalQuantity")
  let total = cart.reduce((total, item) => total + item.quantity,0)
  totalQuantity.textContent = total
}

async function displayTotalPrice() {
    let totalPrice = document.querySelector("#totalPrice");
    let total = 0;
    for ( j=0; j<=cart.length; j++ ) {
        const item = cart[j];
        let price = await getProductById(item._id);
        total = total + item.quantity * price;
        totalPrice.textContent = total
    }
}


function displayArticle(article){
    document.querySelector("#cart__items").appendChild(article)
}

function makeArticle(item){
    let article = document.createElement("article")
    article.classList.add("card__item")
    article.dataset.id = item._id
    article.dataset.color = item.color
    return article
}

function makeImageDiv(item){
    let div = document.createElement ("div")
    div.classList.add("cart__item__img")

    let image = document.createElement('img')
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}

                                    //FORMULAIRE//

function submitForm(e){
    e.preventDefault()
    if (cart.length === 0){
    alert ("s'il vous plaît veuillez acheter un produit")
    return
    }

    if (isFormInvalid()) return
    if (isEmailInvalid()) return

    let body = makeRequestBody()
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json())
        .then ((data) => console.log(data)) 
}
function isEmailInvalid(){
    let email = document.querySelector("#email").value
    console.log(email)
    let regex = /^[a-zA-z0-9+_.-]+@(.+)$/
    if (regex.test(email) === false){
        alert ("merci d'inscrire un email correct ")
        return true
    }
    return false
}
function isFormInvalid() {
    let form = document.querySelector(".cart__order__form")
    let inputs = form.querySelectorAll("input")
    inputs.forEach((input) => {
    if (input.value === "") {
    alert("merci de remplir tous les champs")
    return true
    }
    return false
})
}
function makeRequestBody(){
    let form = document.querySelector(".cart__order__form")
    let firstName = form.elements.firstName.value
    let lastName = form.elements.lastName.value
    let address = form.elements.address.value
    let city = form.elements.city.value
    let email = form.elements.email.value

    
    let body = {
        contact :{
            firstName : firstName,
            lastName :  lastName,
            address : address,
            city : city,
            email : email
        }, 
    products: getIdsFromCache()
    }
console.log(body)
    return body
}

function getIdsFromCache(){
    let numberOfProducts = localStorage.length
    let ids = []
    for (let i = 0; i < numberOfProducts; i++){
        let key = localStorage.key(i)
        console.log(key)
        let id = key.split("-")[0]
        ids.push(id)
    }
    console.log(ids)
    return ids
}