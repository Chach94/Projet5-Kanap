// je recupère le panier du local storage sur ma page panier 
// création fonction 
let basketProduct = localStorage.getItem('basket')
let totalQuantity = document.getElementById('totalQuantity');
let totalPrice = document.getElementById('totalPrice');
let totalItems = 0;
let totalsPrice = 0;

function getBasket() {
    if (basketProduct == null) {
        basketProduct == []
        let title = document.querySelector('h1');
        title.textContent = "Votre panier est vide";
    } else {
        basketProduct = JSON.parse(basketProduct)

    }
}



async function getFetchApi(basket) {
    const response = await fetch(`http://localhost:3000/api/products/` + basket)
    const product = await response.json();
    return product

}





async function displayProduct() {
    console.log(basketProduct);
    for (let p of basketProduct) {
        console.log(p);
        getFetchApi(p.id).then(productId => {


            console.log(productId);


            let cartItems = document.getElementById('cart__items');
            cartItems.innerHTML += `<article class="cart__item" data-id="${p.id}" data-color="${p.color}" data-quantity="${p.quantity}">
                <div class="cart__item__img">
                  <img src="${productId.imageUrl}" alt="${productId.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${productId.name}</h2>
                    <p>${p.color}</p>
                    <p>${productId.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${p.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`

            calcul(productId, p)
            changeQuantity()
        })

    }

}

getBasket();
displayProduct();

function calcul(productsId, b) {
    let newQuantity = parseInt(b.quantity);
    totalItems += newQuantity;
    totalsPrice += parseInt(productsId.price * b.quantity);
    totalQuantity.textContent = totalItems;
    totalPrice.textContent = totalsPrice;
}


function changeQuantity() {

    let cart = document.querySelectorAll('.cart__item') // Je recupère <article> 
    console.log(cart);
    cart.forEach((cart) => { // pour chaque article : 
        cart.addEventListener('change', (e) => { // j'ecoute l'evenement au changement 
            for (let article of basketProduct) { // je parcours mes produits dans le local storage 

                if (article.id === cart.dataset.id && article.color === cart.dataset.color) { // l'id du local storage est === data-id et meme chose pour couleur 
                    article.quantity = e.target.value  // alors la quantité du localstorage est egale a la valeur de l'evenement 
                    localStorage.setItem('basket', JSON.stringify(basketProduct)) // j'enregistre la nouvelle valeur 

                    cart.dataset.quantity = e.target.value; // je modifie la valeur d'affichage avec la valeur récuperer par l'evenement 

                    location.reload() // rafraichissement page 

                }
            }

        })
    })
}





