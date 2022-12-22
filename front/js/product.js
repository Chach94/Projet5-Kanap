
let params = new URLSearchParams(window.location.search)
let id = params.get("id");
console.log(id);

fetch(`http://localhost:3000/api/products/${id}`)
    .then(function (r) {
        if (r.ok) {
            return r.json();
        }
    })
    .then(function (productId) {
        console.log(productId);

        let itemImg = document.querySelector('.item__img');
        let img = document.createElement('img');
        let imgReturn = itemImg.appendChild(img);
        img.src = productId.imageUrl;
        img.alt = productId.altText;

        let title = document.querySelector('#title');
        title.textContent = productId.name;
        console.log(title);

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