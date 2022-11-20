fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => addProducts(data))
        
 //L'API Fetch récupere les données des produits sur le server 3000


function addProducts(donnees){
    const id = donnees[0]._id
    const imageUrl = donnees[0]._id.imageUrl
    const altTxt = donnees[0].altTxt
    const image = makeImage(imageUrl, altTxt)

    const anchor = makeAnchor(id)
    const article = makeArticle()
    article.appendChild(image)
    appendChildren(anchor, article)
}

function makeAnchor(id){
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + id
    return anchor
}

function appendChildren(anchor, article){
    const items = document.querySelector("#items")
    if (items != null) {
        items.appendChild(anchor)
        items.appendChild(article)
    }
}
function makeArticle(){
const article = document.createElement("article")
const h3 = makeH3()
const p = makeParagraph()
//article.appendChild(image)
//article.appendChild(h3)
//article.appendChild(p)
console.log(article)
return article
}

function makeImage(imageUrl, altTxt){
const image =  document.createElement("img")
image.src = imageUrl
image.alt = altTxt
return image
}

function makeH3(){
const H3 = document.createElement("h3")
return H3
}

function makeParagraph(){
const paragraphe = document.createElement("p")
return paragraphe
}