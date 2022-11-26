const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const _id = urlParams.get("_id")
console.log({queryString})

fetch(`http://localhost:3000/api/products/${_id}`)
	.then((response) => response.json())
    .then(res => console.log(res))
	
