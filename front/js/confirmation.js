// localisation de la page 
let params = new URLSearchParams(window.location.search)
let order = params.get("order");

// injection du numero de commande order dans le DOM 
let orderId = document.getElementById('orderId');
orderId.innerHTML = order;