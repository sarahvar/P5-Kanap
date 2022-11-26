fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => addProducts(data))
    .catch((error) => {
        console.log(error);   
    });
    

 //L'API Fetch récupere les données des produits sur le server 3000


function addProducts(data){

    data.forEach((kanap) => {
    console.log("kanap: ", kanap)

    const _id = kanap._id
    const imageUrl = kanap.imageUrl
    const altTxt = kanap.altTxt
    const name = kanap.name
    const description = kanap.description

    const anchor = makeAnchor(_id)

    const article = document.createElement("article")
    const image = makeImage(imageUrl, altTxt)
    const h3 = makeH3(name)
    const p = makeParagraph(description)

    appendElementToArticle(article,image,h3,p)
    appendArticleToAnchor(anchor, article)
})
}



function appendElementToArticle(article,image,h3,p){
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
}

function makeAnchor(_id){
    const anchor = document.createElement("a")
    anchor.href = "./product.html?_id=" + _id
    return anchor
}

function appendArticleToAnchor(anchor, article){
    const items = document.querySelector("#items")
    if (items != null) {
        items.appendChild(anchor)
        anchor.appendChild(article)
    }
}
function makeImage(imageUrl, altTxt){
    const image =  document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
    }


function makeH3(name){
const h3 = document.createElement("h3")
h3.textContent = name
h3.classList.add("productName")
return h3
}

function makeParagraph(description){
const p = document.createElement("p")
p.textContent = description
p.classList.add("productDescription")
return p
}