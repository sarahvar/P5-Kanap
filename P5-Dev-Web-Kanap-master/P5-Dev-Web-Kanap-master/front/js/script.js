fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => addProducts(data))
        
 //L'API Fetch récupere les données des produits sur le server 3000


function addProducts(donnees){
    const id = donnees[0]._id
    const anchor = makeAnchor(id);
    const article = makeArticle()
    appendChildren(anchor)
}

function makeAnchor(id){
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + id
    return anchor
}

function appendChildren(anchor){
    const items = document.querySelector("#items")
    if (items != null) {
        items.appendChild(anchor)
    }
}
function makeArticle(){
const article = document.createElement("article")
console.log(article)
return arcticle
}

function makeImage(imageUrl, altTxt){
const image =  document.createElement("img")
image.src = imageUrl
image.alt = altTxt
return image
}

function makeH3(){

}

function makeParagraph(){

}