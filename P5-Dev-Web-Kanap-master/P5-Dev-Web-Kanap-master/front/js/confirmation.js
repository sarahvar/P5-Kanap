let orderId = getOrderId()
displayOrderId(orderId)
removeAllCache()

// Récupération du "orderId" dans l'URL

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

//Vider le cacher une fois la commande terminée 

function removeAllCache(){
    const cache = window.localStorage
    cache.clear()
}