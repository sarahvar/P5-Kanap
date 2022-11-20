fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => {
        const imageUrl = data[0].imageUrl
 //L'API Fetch récupere les données des produits sur le server 3000

    const anchor = document.createElement("a")
    anchor.href = imageUrl
    anchor.text = "Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu."
    const items = document.querySelector("#items")
    if (items != null) {
    items.appendChild(anchor)
    }


});

function addProducts(product){
    const productList = document.querySelector("#product-list")
    if (productList != null) {
        const productElement = document.querySelector("div")
        productElement.classList.add("product")
        productElement.innerHTML = `
        <div class="product-image">
        <img src="${product.imageUrl}" alt="${product.name}">
        </div>
        <div class="product-name">
        ${product.name}
        </div>
        <div class="product-price">
        ${product.price} €
        </div>
        <div class "product-action">
        <button class="btn btn-primary" data-id="${product.id}">Ajouter au panier<button>
        </div>
        `
        productList.appendChild(productElement)
    }
}


//Si items est different de null on donne l'enfant anchor à items