
let params = new URLSearchParams(window.location.search)
let id = params.get("id");


fetch(`http://localhost:3000/api/products/${id}`)
    .then(function (r) {
        if (r.ok) {
            return r.json();
        }
    })
    .then(function (productId) {


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


    })


    .catch(function (err) {
        // erreur 
    })



let addToCart = document.getElementById('addToCart');


// si la quantité est inferieur à 0 et superieur ou égale à 100 alors alert message 
addToCart.addEventListener('click', () => {
    let colors = document.getElementById('colors')
    let quantity = document.getElementById('quantity')

    if (quantity.value <= 0 || quantity.value >= 100) {
        alert('Veuillez choisir une quantité entre 1 et 100')
        return

    } else if (colors.value === "") {
        alert('Veuillez selectionner votre couleur')
        return
    }


    let basket = {
        id: id,
        color: colors.value,
        quantity: parseInt(quantity.value),
    }
    console.log(basket);

    let basketProduct = localStorage.getItem('basket')

    if (basketProduct == null) {
        basketProduct = [];

    } else {
        basketProduct = JSON.parse(basketProduct)
    }

    let found = false;
    basketProduct.forEach((p, index) => {
        if (basket.id === p.id && basket.color === p.color) {
            p.quantity += basket.quantity;
            console.log(p.quantity);
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
        alert('Votre produit est bien ajouté au panier')


    }
    localStorage.setItem('basket', JSON.stringify(basketProduct))

})