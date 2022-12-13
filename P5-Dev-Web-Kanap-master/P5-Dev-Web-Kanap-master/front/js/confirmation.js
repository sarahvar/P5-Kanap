const orderId = getOrderId()
displayOrderId(orderId)
removeAllCache()

// Récupération du "orderId" dans l'URL

function getOrderId(){
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get("orderId")
}


// Insertion de l'orderId sur la page confirmation

function displayOrderId(orderId){
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

//Vider le cacher une fois la commande terminée 

function removeAllCache(){
    const cache = window.localStorage
    cache.clear()
}