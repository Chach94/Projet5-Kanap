//1. recupère les données l'url avec fetch 
fetch('http://localhost:3000/api/products')
    .then(function (r) {
        if (r.ok) {
            return r.json();
        }
    })
    // reponse avec les donnés de lAPI + boucles avec creation element du DOM 
    .then(function (products) {
        for (let kanap of products) {
            console.log(kanap);
            // je récupère l'id pour la creation des enfants 
            let items = document.getElementById('items');
            // Variable pour la création des éléments du DOM 
            let a = document.createElement("a");
            let article = document.createElement("article")
            let img = document.createElement("img")
            let h3 = document.createElement("h3")
            let p = document.createElement("p")

            // Variable pour associés parent et enfant + création des class
            items.appendChild(a);
            console.log(a);
            a.appendChild(article);
            article.appendChild(img);
            article.appendChild(h3)
            h3.classList.add('productName')
            article.appendChild(p);
            p.classList.add('productDescription')

            // injection des données pour affichage produit 
            a.href = `./product.html?id=${kanap._id}`;
            img.src = kanap.imageUrl;
            img.alt = kanap.altTxt;
            h3.textContent = kanap.name;
            p.textContent = kanap.description;

        }

    })
    .catch(function (err) {
        console.log('erreur')
    })


