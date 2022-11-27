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
const image = makeImage(item)
}
function makeImage(item){
    const image = document.createElement('img')
    image.src = item.imageUrl
    image.alt = item.altTxt
    return image
}
