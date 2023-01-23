// variable pour recuperer le localstorage 
let basketProduct = localStorage.getItem('basket')

let totalQuantity = document.getElementById('totalQuantity');
let totalPrice = document.getElementById('totalPrice');
let totalItems = 0;
let totalsPrice = 0;

// fonction pour recuperer le localstorage avec condition si le panier est vide 
function getBasket() {
    if (basketProduct == null || basketProduct.length === 0) {
        basketProduct == []
        let title = document.querySelector('h1');
        title.textContent = "Votre panier est vide";
    } else {
        basketProduct = JSON.parse(basketProduct)
        sortId(basketProduct)
    }
}


async function getFetchApi(basket) {
    const response = await fetch(`http://localhost:3000/api/products/` + basket)
    const product = await response.json();
    return product

}


async function displayProduct() {

    for (let p of basketProduct) {

        await getFetchApi(p.id).then(productId => {
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



        })

    }

}

getBasket();
displayProduct();

// trier le panier par ID
function sortId(basket) {
    basket.sort((a, b) => {
        if (a.id < b.id) {
            return 1
        }
        else if (a.id > b.id) {
            return -1
        } else if (a.id = b.id) {
            return 0
        }

    })

}

// Calcul total quantité et calcul total prix 
function calcul(productsId, b) {
    let newQuantity = Number(b.quantity);

    console.log(typeof newQuantity);

    totalItems += newQuantity;
    totalsPrice += productsId.price * b.quantity;

    totalQuantity.textContent = totalItems;
    totalPrice.textContent = totalsPrice;
}


// fonction pour changer la quantité au 'change '

function changeQuantity() {

    let cart = document.querySelectorAll('.cart__item') // Je recupère <article> 

    cart.forEach((cart) => { // pour chaque article : 
        cart.addEventListener('change', (e) => { // j'ecoute l'evenement au changement 
            for (let article of basketProduct) { // je parcours mes produits dans le local storage 

                if (article.id === cart.dataset.id && article.color === cart.dataset.color) { // l'id du local storage est === data-id et meme chose pour couleur 
                    article.quantity = parseInt(e.target.value) // alors la quantité du localstorage est egale a la valeur de l'evenement 

                    if (e.target.value > 100 || e.target.value <= 0) {
                        alert('quantité comprise entre 1 et 100 ex ')
                        return
                    }

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

    deleteItem.forEach((deleteItem) => {
        deleteItem.addEventListener('click', () => {
            let NewBasketProduct = basketProduct.filter((b) => !(b.id === deleteItem.dataset.id && b.color === deleteItem.dataset.color))

            localStorage.setItem('basket', JSON.stringify(NewBasketProduct))

            location.reload()
            alert('Article supprimer')
            getBasket()

        })

    })

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

// function de test de validation du formulaire avec msg d'error 
function firstNameValue() {
    firstName.addEventListener('change', () => {
        if (regexName.test(firstName.value)) {
            firstNameErrorMsg.innerHTML = ''
            return true
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez saisir un prénom valide'
            return false
        }
    })
}
firstNameValue()

function lastNameValue() {
    lastName.addEventListener('change', () => {
        if (regexName.test(lastName.value)) {
            lastNameErrorMsg.innerHTML = ''
            return true
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez saisir un nom valide'
            return false
        }

    })
}
lastNameValue()

function addressValue() {
    address.addEventListener('change', () => {
        if (regexAddress.test(address.value)) {
            addressErrorMsg.innerHTML = ''
            return true
        } else {
            addressErrorMsg.innerHTML = 'Veuillez saisir une adresse valide'
            return false
        }

    })
}
addressValue()
function cityValue() {
    city.addEventListener('change', () => {
        if (regexName.test(city.value)) {
            cityErrorMsg.innerHTML = ''
            return true
        } else {
            cityErrorMsg.innerHTML = 'Veuillez saisir une adresse valide'
            return false
        }

    })
}
cityValue()
function emailValue() {
    email.addEventListener('change', () => {
        if (regexEmail.test(email.value)) {
            emailErrorMsg.innerHTML = ''
            return true
        } else {
            emailErrorMsg.innerHTML = 'Veuillez saisir une adresse valide'
            return false
        }

    })
}
emailValue()

function FormToCheck() {
    if (regexName.test(firstName.value) == false || regexAddress.test(address.value) == false || regexName.test(lastName.value) == false || regexEmail.test(email.value) == false || regexName.test(city.value) == false) {
        alert('Merci de remplir le formulaire correctement')
        return false
    } else if (basketProduct == null || basketProduct == '') {
        alert('Votre panier est vide')
        return false
    }
    return true
}

function sendForm() {
    let order = document.getElementById('order')

    // ecoute de l'evenement au click 
    order.addEventListener('click', (e) => {
        e.preventDefault()

        if (!FormToCheck()) {
            return

        } else {

            let productId = [] // initialisation du tableau 
            for (let product of basketProduct) {// boucle sur le panier pour recuperer les ID 
                productId.push(product.id)

            }
            const orderProduct = { // objet contenant les contact + les id existant du panier 
                contact: {

                    firstName: firstName.value,
                    lastName: lastName.value,
                    address: address.value,
                    city: city.value,
                    email: email.value,
                },
                products: productId,
            }
            console.log(typeof orderProduct);

            fetch('http://localhost:3000/api/products/order', { // requet post transmettre les données 
                method: "POST",
                body: JSON.stringify(orderProduct),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.orderId) {
                        localStorage.clear();
                        location.href = `confirmation.html?order=${data.orderId}`// recupération des info avec le numéro de commande 
                    } else {
                        alert("Une erreur s'est produite, merci de réessayer")
                    }

                })
        }
    })

}
sendForm();

