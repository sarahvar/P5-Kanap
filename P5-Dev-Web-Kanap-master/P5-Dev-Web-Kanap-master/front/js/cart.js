const numberOfItems = localStorage.length;
console.log(numberOfItems)
const cart = [];

for (let i = 0; i < numberOfItems; i++){
    const item = localStorage.getItem(localStorage.key(i))
    const itemObject = JSON.parse(item)
    cart.push(itemObject)
}
console.log(cart)
