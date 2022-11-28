const cart = [];

retrieveItemsFromCache()
console.log(cart)
cart.forEach((item) => displayItem(item))


//<!--  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                //<div class="cart__item__img">
                  //<img src="../images/product01.jpg" alt="Photographie d'un canapé">
                //</div>
                //<div class="cart__item__content">
                  //<div class="cart__item__content__description">
                    //<h2>Nom du produit</h2>
                    //<p>Vert</p>
                    //<p>42,00 €</p>
                  //</div>
                  //<div class="cart__item__content__settings">
                    //<div class="cart__item__content__settings__quantity">
                      //<p>Qté : </p>
                      //<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    //</div>
                    //<div class="cart__item__content__settings__delete">
                      //<p class="deleteItem">Supprimer</p>
                    //</div>
                  //</div>
                //</div>
              //</article> -->
            //</section>

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
    console.log(article)
    const imageDiv = makeImageDiv(item)
    article.appendChild(imageDiv)
    const cardItemContent = makeCartContent(item)
    article.appendChild(cardItemContent)
    displayArticle(article)
    displayTotalQuantity(item)
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

    const p2 = document.createElement("p")
    p2.textContent = item.price + " €"

    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    return description
}

function makeSettings(item){
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    addQuantityToSettings(settings, item)
    addDeleteToSettings(settings)
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
    quantity.appendChild(input)
    settings.appendChild(quantity)
}
function addDeleteToSettings(settings){
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}

function displayTotalQuantity(item){
    let total = 0
    const totalQuantity = document.querySelector("#totalQuantity")
    cart.forEach(item => {
      const totalUnitPrice =  item.price * item.quantity
      total = total + totalUnitPrice
    })
    console.log(total)
}

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
