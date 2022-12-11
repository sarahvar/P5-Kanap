// Récupération du "orderId" dans l'URL

let orderId = getOrderId()
displayOrderId(orderId)

function getOrderId(){
    let queryString = window.location.search
    let urlParams = new URLSearchParams(queryString)
    return urlParams.get("orderId")
}


// Insertion de l'orderId sur la page confirmation

function displayOrderId(orderId){
    let orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}
