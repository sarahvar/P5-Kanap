const cart = [];

retrieveItemsFromCache()
cart.forEach((item) => displayItem(item))

const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))

function retrieveItemsFromCache(){
    const numberOfItems = localStorage.length;
for (let i = 0; i < numberOfItems; i++){
    const item = localStorage.getItem(localStorage.key(i)) || ""
    const itemObject = JSON.parse(item)
    cart.push(itemObject)
}
}

function displayItem(item){
    const article = makeArticle(item)
    const imageDiv = makeImageDiv(item)
    article.appendChild(imageDiv)
    const cardItemContent = makeCartContent(item)
    article.appendChild(cardItemContent)
    displayArticle(article)
    displayTotalQuantity()
    displayTotalPrice()
}

function makeCartContent(item){
    const cardItemContent = document.createElement("div")
    cardItemContent.classList.add("cart__item__content")

    const description = makeDescription(item)
    const settings = makeSettings(item) 
    
    cardItemContent.appendChild(description)
    cardItemContent.appendChild(settings)
    return cardItemContent
    
}

function makeDescription(item){
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.textContent = item.name

    const p = document.createElement("p")
    p.textContent = item.color

    const span = document.createElement("p")
    span.textContent = item.price + " €"
    console.log(span)
    //soucis ici //


    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(span)
    return description
}

function makeSettings(item){
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    addQuantityToSettings(settings, item)
    addDeleteToSettings(settings, item)
    return settings
}
function addQuantityToSettings(settings, item){
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")
    const p = document.createElement("p")
    p.textContent="Qté : "
    quantity.appendChild(p)
    const input =document.createElement("input")
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
  const itemToUpdate = cart.find((item) => item._id === _id)
  itemToUpdate.quantity = Number (newValue)
  item.quantity = itemToUpdate.quantity
  displayTotalQuantity()
  displayTotalPrice()
  saveNewDataToCache(item)
}

function deleteDataFromCache(item){
    const key = `${item._id}-${item.color}`
    localStorage.removeItem(key)
}

function saveNewDataToCache(item) {
  const dataToSave = JSON.stringify(item)
  const key = `${item._id}-${item.color}`
  localStorage.setItem(key, dataToSave)
}

function addDeleteToSettings(settings, item){
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteItem (item))


    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}

function deleteItem(item){
  const itemToDelete = cart.findIndex((product) => product.id === item.id && product.color === item.color)
  cart.splice (itemToDelete, 1)
  displayTotalPrice ()
  displayTotalQuantity()
  deleteDataFromCache(item)
  deleteArticleFromPage(item)
}

function deleteArticleFromPage(item){
    const articleToDelete = document.querySelector(
        `article[data-id="${item._id}"][data-color="${item.color}]`
    )
    console.log("article supprimer", articleToDelete)
    articleToDelete.remove()
}

function displayTotalQuantity(){
  const totalQuantity = document.querySelector("#totalQuantity")
  const total = cart.reduce((total, item) => total + item.quantity,0)
  totalQuantity.textContent = total
}

function displayTotalPrice(){
    const totalPrice = document.querySelector("#totalPrice")
    const total = cart.reduce((total, item) => total + item.price * item.quantity,0)
    totalPrice.textContent = total
}
//soucis ici//

function displayArticle(article){
    document.querySelector("#cart__items").appendChild(article)
}

function makeArticle(item){
    const article = document.createElement("article")
    article.classList.add("card__item")
    article.dataset.id = item._id
    article.dataset.color = item.color
    return article
}

function makeImageDiv(item){
    const div = document.createElement ("div")
    div.classList.add("cart__item__img")

    const image = document.createElement('img')
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}

                                    //FORMULAIRE//

function submitForm(e){
    e.preventDefault()
    if (cart.length === 0) alert ("s'il vous plaît veuillez acheter un produit")
    
    const body = makeRequestBody()
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json())
        .then ((data) => console.log(data)) 
        console.log(form.elements.firstName.value)
}

function makeRequestBody(){
    const form = document.querySelector(".cart__order__form")
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value

    
    const body = {
        contact :{
            firstName : firstName,
            lastName :  lastName,
            address : address,
            city : city,
            email : email
        }, 
    products: getIdsFromCache()
    }
    return body
}

function getIdsFromCache(){
    const numberOfProducts = localStorage.length
    const ids = []
    for (let i = 0; i < numberOfProducts; i++){
        const key = localStorage.key(i)
        console.log(key)
        const id = key.split("-")[0]
        ids.push(id)
    }
}