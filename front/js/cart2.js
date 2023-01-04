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
                      <p class="deleteItem" data-id="${p.id}" data-color="${p.color}">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`

            calcul(productId, p)
            changeQuantity()
            deleteArticle()
            sortId()


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
// supprimer un element du panier 
function deleteArticle() {
    let deleteItem = document.querySelectorAll('.deleteItem ') // selection du bouton supprimer 

    deleteItem.forEach((deleteItem) => {// pour chaque bouton supprimer 
        deleteItem.addEventListener('click', () => {
            let NewBasketProduct = basketProduct.filter((b) => !(b.id === deleteItem.dataset.id && b.color === deleteItem.dataset.color))
            localStorage.setItem('basket', JSON.stringify(NewBasketProduct))
            location.reload()
        })
    })
}

function sortId() {
    basketProduct.sort((a, b) => a.quantity > b.quantity)


}


// FORMULAIRE // 

// recupération de tout les éléments du formulaire 
let firstName = document.getElementById('firstName')
let lastName = document.getElementById('lastName')
let address = document.getElementById('address')
let city = document.getElementById('city')
let email = document.getElementById('email')

// recupération message d'erreur 

let firstNameErrorMsg = document.getElementById('firstNameErrorMsg')
let lastNameErrorMsg = document.getElementById('lastNameErrorMsg')
let addressErrorMsg = document.getElementById('addressErrorMsg')
let cityErrorMsg = document.getElementById('cityErrorMsg')
let emailErrorMsg = document.getElementById('emailErrorMsg')

// création de regex 
let regexName = new RegExp("^[^.?!:;,/\\/_-]([. '-]?[a-zA-Zàâäéèêëïîôöùûüç])+[^.?!:;,/\\/_-]$")
let regexAddress = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+")
let regexEmail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$')

function firstNameValue() {
    firstName.addEventListener('change', () => {
        if (regexName.test(firstName.value) == true) {
            firstNameErrorMsg.innerHTML = 'oui'
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez saisir un prénom valide'
        }
    })
}
firstNameValue()

function lastNameValue() {
    lastName.addEventListener('change', () => {
        if (regexName.test(lastName.value) == true) {
            lastNameErrorMsg.innerHTML = 'oui'
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez saisir un nom valide'
        }
    })
}
lastNameValue()

function addressValue() {
    address.addEventListener('change', () => {
        if (regexAddress.test(address.value) == true) {
            addressErrorMsg.innerHTML = 'oui'
        } else {
            addressErrorMsg.innerHTML = 'Veuillez saisir une adresse valide'
        }
    })
}
addressValue()
function cityValue() {
    city.addEventListener('change', () => {
        if (regexName.test(city.value) == true) {
            cityErrorMsg.innerHTML = 'oui'
        } else {
            cityErrorMsg.innerHTML = 'Veuillez saisir une adresse valide'
        }
    })
}
cityValue()
function emailValue() {
    email.addEventListener('change', () => {
        if (regexEmail.test(email.value) == true) {
            emailErrorMsg.innerHTML = 'oui'
        } else {
            emailErrorMsg.innerHTML = 'Veuillez saisir une adresse valide'
        }
    })
}
emailValue()

let order = document.getElementById('order')
function getForm() {

    order.addEventListener('click', (e) => {
        e.preventDefault()



        let arrayProduct = []
        for (let product of basketProduct) {
            arrayProduct.push(product.id)

        }
        let element = {
            form: {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value,
            },
            products: arrayProduct
        }
        sendForm(element)
    })

}
getForm()
async function sendForm(element) {
    await fetch('http://localhost:3000/api/products/order', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: element,

    })

}
