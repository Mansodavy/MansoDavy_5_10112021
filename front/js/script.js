/*
Au chargement de la page appel de la fonction asynchrone fill section
*/
window.onload = fillSection();
const urlproduct = "http://localhost:3000/api/products";
/*
Fonction asynchrone permettant de récupéré les articles dans l'api
*/
async function getArticles() {
    let articlesCatch = await fetch(urlproduct)
    return await articlesCatch.json();
}
/*
Fonction asynchrone qui appel getlistproduct une fois le chargement effectuée 
*/
async function fillSection() {
    setTimeout(() => {
        getListProduct;
      }, 500);
}
/*
Promise avec un timer permettant d'afficher la list des produit 
*/
const getListProduct = new Promise(() => {
    setTimeout(() => {
        let result = getArticles ()
        .then(function (data){
            const articles = data;
            for (let article in articles) {
                let ArticleContainer = document.getElementById("items");
                ArticleContainer.innerHTML += `<a href="./product.html?id=${data[article]._id}">
                <article>
                  <img src="${data[article].imageUrl}" alt="${data[article].altTxt}">
                  <h3 class="productName">${data[article].name}</h3>
                  <p class="productDescription">${data[article].description}</p>
                </article>
              </a><img>`;
            }
        })
        .catch (function(error){
            return error;
        });
    }, 300);
  });