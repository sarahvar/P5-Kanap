const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const productId = urlParams.get("_id")
console.log({queryString})

fetch(`http://localhost:3000/api/products/`+_id)
	.then((reponse) => {
		if (reponse.ok) return reponse.json();
	})
