const cart = [];

retrieveItemsFromCache()
console.log(cart)
cart.forEach((item) => displayItem(item))

//altTxt: "Photo d'un canapé bleu, deux places"
//color: "White"
//imageUrl: "http://localhost:3000/images/kanap01.jpeg"
//price: 1849
//quantity: 3
//_id: "107fb5b75607497b96722bda5b504926"

function retrieveItemsFromCache(){
    const numberOfItems = localStorage.length;
for (let i = 0; i < numberOfItems; i++){
    const item = localStorage.getItem(localStorage.key(i))
    const itemObject = JSON.parse(item)
    cart.push(itemObject)
}
}
function displayItem(item){
    const article = makeArticle(item)
    displayArticle(article)
    console.log(article)
    const image = makeImage(item)
}
function displayArticle(article){
    document.querySelector("#cart__items").appendChild
    (article)
}
function makeArticle(item){
    const article = document.createElement("article")
    article.classList.add("card__item")
    article.dataset.id = item._id
    article.dataset.color = item.color
    return article
}

function makeImage(item){
    const image = document.createElement('img')
    image.src = item.imageUrl
    image.alt = item.altTxt
    return image
}
