const requestProducts = async () => {
    let response = await fetch("http://localhost:3000/api/products");
    if (response.ok){
        return await response.json();
    }
    else (response.error){
        "statut du serveur:", response.status;
    }
}


