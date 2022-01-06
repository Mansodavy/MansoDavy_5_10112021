/*
Déclaration de la variable article et récupération de l'id dans l'url 
*/
let article = "";
let str = window.location.href;
let url = new URL(str);
let urlsearchparmid = url.searchParams.get("id");
const urlproduct = "http://localhost:3000/api/products/";

const colorArticles = document. querySelector("#colors");
const quantityArticles = document.querySelector("#quantity");
getArticle();
/*
Fonction qui récupére les articles dans l'api 
*/
function getArticle() {
  fetch(urlproduct + urlsearchparmid)
  .then((res) => {
      return res.json();
  })

  .then(async function (API) {
      article = await API;
      console.table(article);
      if (article){
        GrabArticles(article);
      }
  })
  .catch((error) => {
      window.alert("Erreur ! La requete a l'api a eu un probleme");
      document.location.href = "index.html"
  })
}
/*
Fonction qui prend les articles récupérer avec l'api et les place avec l'innerhtml
Et par la suite appel la fonction add cart avec l'article
*/ 
function GrabArticles(article){
  let ArticleImg = document.querySelector(".item__img");
  ArticleImg.innerHTML = `<img src="${article.imageUrl}" alt="${article.altTxt}"><img>`;
  let ArticleName = document.querySelector('.item__content__titlePrice');
  ArticleName.innerHTML = `<h1 id="title">${article.name}</h1>
  <p>Prix : <span id="price">${article.price}</span>€</p>`;
  let ArticleDescription = document.getElementById('description');
  ArticleDescription.innerHTML = `<p>${article.description}</p>`;
  for (let colors of article.colors) {
    let ArticleColors = document.createElement("option");
    document.querySelector("#colors").appendChild(ArticleColors);
    ArticleColors.value = colors;
    ArticleColors.innerHTML = colors;
  }
  addCart(article);
}
/*
Fonction qui permet l'ajout au panier grace a l'evenement click sur le bouton btncart
*/ 
function addCart(article) {
  const BtnCart = document.querySelector("#addToCart");

  BtnCart.addEventListener("click", (event)=>{
/*
Alert empéchant la non séléction d'élément
*/
    if (quantityArticles.value < 1 ){
      window.alert("Erreur ! Veuillez choisir une quantité !");
    }
    else if (colorArticles.selectedIndex < 1){
      window.alert("Erreur ! Veuillez choisir une couleur !");
    }
    else if (quantityArticles.value > 100 ){
      window.alert("Erreur ! Quantité trop importante !");
    }
      if (quantityArticles.value > 0 && quantityArticles.value <=100 && colorArticles.selectedIndex > 0){

        
  let choiceColor = colorArticles.value;
              
  let choiceQuantity = quantityArticles.value;
/*
Paramétrage de chaques informations du produits
*/
  let optionsProduit = {
      idProduit: urlsearchparmid,
      couleurProduit: choiceColor,
      quantiteProduit: Number(choiceQuantity),
      nomProduit: article.name,
      prixProduit: article.price,
      descriptionProduit: article.description,
      imgProduit: article.imageUrl,
      altImgProduit: article.altTxt
  };

  let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
  
/*
Vérification dans le localstorage les élément et les couleurs pour pouvoir faire les adition 
*/
  if (produitLocalStorage) {
    const resultFind = produitLocalStorage.find(
        (resultat) => resultat.idProduit === urlsearchparmid && resultat.couleurProduit === choiceColor);
        if (resultFind) {
            let newQuantite =
            parseInt(optionsProduit.quantiteProduit) + parseInt(resultFind.quantiteProduit);
            resultFind.quantiteProduit = newQuantite;
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            window.location.href ="cart.html";
          } else {
            produitLocalStorage.push(optionsProduit);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            window.location.href ="cart.html";
        }
    } else {
        produitLocalStorage =[];
        produitLocalStorage.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        window.location.href ="cart.html";
    }}
    
    });
    
}