// Récupération du "orderId" dans l'URL

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const orderId = urlParams.get("orderId")
console.log(orderId)


