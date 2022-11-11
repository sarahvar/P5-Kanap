fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(products) {
        displayProducts(products);
    })
    .catch(function(err) {
        // Retourner si il y a erreur
    });
console.log("test")

