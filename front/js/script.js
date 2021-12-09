window.onload = fillSection();
const urlproduct = "http://localhost:3000/api/products";

async function getArticles() {
    let articlesCatch = await fetch(urlproduct)
    return await articlesCatch.json();
}
async function fillSection() {
    setTimeout(() => {
        getListProduct;
      }, 500);
}
const getListProduct = new Promise((resolve, reject) => {
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