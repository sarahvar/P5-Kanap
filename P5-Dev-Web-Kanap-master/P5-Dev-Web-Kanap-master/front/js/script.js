fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        const imageUrl = data[0].imageUrl
        console.log("url de l'image", imageUrl)
 //L'API Fetch récupere les données des produits sur le server 3000

    const anchor = document.createElement("a")
    anchor.href = imageUrl
    anchor.text = "Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu."
    const items = document.querySelector("#items")
    if (items != null) {
    items.appendChild(anchor)
    console.log("nous avons bien ajouter le lien")
    }
});




//Si items est different de null on donne l'enfant anchor à items