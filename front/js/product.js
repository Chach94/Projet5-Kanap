let params = new URLSearchParams(window.location.search)
let id = params.get("id");

// Appel des données de L'API avec l'ID 
fetch(`http://localhost:3000/api/products/${id}`)
    .then(function (r) {
        if (r.ok) {
            return r.json();
        }
    })
    .then(function (productId) {
        displayProduct(productId)

    })

    .catch(function (err) {
        // erreur 
    })


// Fonction Affichage du détails produits avec création des éléments
function displayProduct(productId) {
    let itemImg = document.querySelector('.item__img');
    let img = document.createElement('img');
    let imgReturn = itemImg.appendChild(img);
    img.src = productId.imageUrl;
    img.alt = productId.altText;

    let title = document.querySelector('#title');
    title.textContent = productId.name;


    let price = document.querySelector('#price');
    price.textContent = productId.price;

    let description = document.querySelector('#description');
    description.textContent = productId.description;

    let colors = document.querySelector('#colors')
    for (let i = 0; i < productId.colors.length; i++) {
        colors.innerHTML += `<option value="${productId.colors[i]}">${productId.colors[i]}</option>
       `
    }

}

// Fonction à l'ecoute du click du boutons ajouter au panier 
function clickToCart() {
    let addToCart = document.getElementById('addToCart')
    addToCart.addEventListener('click', () => {
        let basket = {
            id: id,
            color: colors.value,
            quantity: parseInt(quantity.value),
        }

        saveAndGetBasket(basket)



    })
}

clickToCart();

function basketToCheck() {
    let colors = document.getElementById('colors')
    let quantity = document.getElementById('quantity')

    if (quantity.value <= 0 || quantity.value >= 100) {
        alert('Veuillez choisir une quantité entre 1 et 100')
        return false

    } else if (colors.value === "") {
        alert('Veuillez selectionner votre couleur')
        return false
    }
    return true
}
// function pour sauvegarder et recuperer les donnés dans le localstorage 
function saveAndGetBasket(basket) {
    if (!basketToCheck()) {
        return
    }

    // Gestion du panier si le panier est vide 
    let basketProduct = localStorage.getItem('basket')
    if (basketProduct == null) {
        basketProduct = [];
    } else {
        basketProduct = JSON.parse(basketProduct)
    }

    // incrementation quantité quand on choisis meme couleur et meme id (une seule ligne)
    let found = false;
    basketProduct.forEach((p, index) => {
        if (basket.id === p.id && basket.color === p.color) {
            p.quantity += basket.quantity;
            console.log(typeof basket.quantity);
            found = true;
        }
        if (p.quantity > 100) {
            p.quantity -= basket.quantity
            alert(`La quantité maximal par kanap est de 100 ex`)
            return
        }
    })

    if (!found) {
        basketProduct.push(basket);


    }
    alert('Votre produit est bien ajouté au panier')
    localStorage.setItem('basket', JSON.stringify(basketProduct))

}

