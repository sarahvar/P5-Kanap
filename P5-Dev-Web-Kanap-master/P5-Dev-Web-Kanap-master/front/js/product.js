const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const productId = urlParams.get("_id")
console.log({productId})