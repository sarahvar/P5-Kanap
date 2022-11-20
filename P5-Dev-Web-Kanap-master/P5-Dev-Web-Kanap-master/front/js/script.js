fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => console.log(data))
 //L'API Fetch récupere les données des produits sur le server 3000

const anchor = document.createElement("a")
anchor.href = "http://localhost:3000/images/kanap01.jpeg"
anchor.text = "Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu."

const items = document.querySelector("#items")
if (items != null) {
    items.appendChild(anchor)
}
//Si items est different de null on donne l'enfant anchor à items