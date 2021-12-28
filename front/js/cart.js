/*
Récupération de tout les item dans le local storage "produit".
*/
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
const positionEmptyCart = document.querySelector("#cart__items");
/*
Fonction permettant de récupérer et afficher les articles du locatstorage sur la page cart .
*/
function getCart() {
  for (let produit in produitLocalStorage) {
    let ArticleContainer = document.querySelector("#cart__items");
    totalPrice =
      produitLocalStorage[produit].prixProduit *
      produitLocalStorage[produit].quantiteProduit;
    ArticleContainer.innerHTML += `
<article class="cart__item" data-id="${produitLocalStorage[produit].idProduit}">
    <div class="cart__item__img">
        <img src="${produitLocalStorage[produit].imgProduit}" alt="${produitLocalStorage[produit].altImgProduit}">
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
        <h2>${produitLocalStorage[produit].nomProduit} - ${produitLocalStorage[produit].couleurProduit}</h2>
        <p>${totalPrice} €</p>
        </div>
        <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitLocalStorage[produit].quantiteProduit}">
        </div>
        <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
        </div>
        </div>
    </div>
    </article>
    `;
  }
}
getCart();
/*
Fonction permetant de Supprimer des articles dans le panier  .
*/
function deleteItem() {
  let deletebutton = document.querySelectorAll(".deleteItem");
  let elementquantitys = document.querySelector(".itemQuantity");
  if (elementquantitys === null) {
    return;
  } else {
    let lengthelements = elementquantitys.length;
    for (var i = 0; i < lengthelements; ++i) {
      totalQuantitys += elementquantitys[i].valueAsNumber;
    }
    totalQuantitys = elementquantitys;
    console.log(totalQuantitys);
    for (let a = 0; a < deletebutton.length; a++) {
      deletebutton[a].addEventListener("click", () => {
        let deleteid = produitLocalStorage[a].idProduit;
        let deletecolor = produitLocalStorage[a].couleurProduit;
        let deletename = produitLocalStorage[a].nomProduit;

        produitLocalStorage = produitLocalStorage.filter(
          (resultat) =>
            resultat.idProduit !== deleteid ||
            resultat.couleurProduit !== deletecolor ||
            resultat.nomProduit !== deletename
        );

        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

        alert("Ce produit a bien été supprimé du panier");
        location.reload();
      });
    }
  }
}
deleteItem();
/*
Fonction permetant de modifier la quantité dans le panier .
*/
function modifyQuantity() {
  let quantityModif = document.getElementsByClassName("itemQuantity");
  for (let k = 0; k < quantityModif.length; k++) {
    quantityModif[k].addEventListener("change", (event) => {
      if (quantityModif[k] = quantityModif[k]) {      
        let quantityModifs = produitLocalStorage[k].quantiteProduit;
        let quantityModifValue = quantityModif[k].valueAsNumber;

  
        const resultFind = produitLocalStorage.filter(
          (resultat) => resultat.quantityModifValue !== quantityModifs

        );
  
        resultFind.quantiteProduit = quantityModifValue;
        produitLocalStorage[k].quantiteProduit = resultFind.quantiteProduit;
  
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        location.reload();
      }
    });
  }}
modifyQuantity();

/*
Fonction permetant de calculer le total du montant en euro et des articles dans le panier .
*/
function total() {
  let elementquantity = document.querySelectorAll(".itemQuantity");
  if (elementquantity === null) {
    return;
  } else {
    let lengthelement = elementquantity.length;
    totalQuantity = 0;
    for (var i = 0; i < lengthelement; ++i) {
      totalQuantity += elementquantity[i].valueAsNumber;
    }
    totalPrice = 0;

    for (var i = 0; i < lengthelement; ++i) {
      totalPrice +=
        elementquantity[i].valueAsNumber * produitLocalStorage[i].prixProduit;
    }

    let productTotalQuantity = document.querySelector(".cart__price");
    productTotalQuantity.innerHTML = `<p>Total (<span id="totalQuantity">${totalQuantity}</span> articles) : <span id="totalPrice">${totalPrice}</span> €</p>`;
  }
}
total();

/*
Partie Qui vérifie les champs texte grace a l'utilisation des regex
*/

let form = document.querySelector(".cart__order__form");

let validEmail = false;
let validCity = false;
let validAddress = false;
let validLastName = false;
let validFirstName = false;

let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
let addressErrorMsg = document.getElementById("addressErrorMsg");
let cityErrorMsg = document.getElementById("cityErrorMsg");
let emailErrorMsg = document.getElementById("emailErrorMsg");


form.firstName.addEventListener("input", function () {
  let reg = /[a-zA-Z]+/;
  let str = form.firstName.value;
  if(reg.test(str)) {
    validFirstName = true;
  }
})

form.lastName.addEventListener("input", function () {
  let reg = /[a-zA-Z]+/;
  let str = form.lastName.value;
  if(reg.test(str)) {
    validLastName = true;
  }
})

form.address.addEventListener("input", function () {
  let reg = /[0-9]+ ([a-zA-Z]+( [a-zA-Z]+)+)/;
  let str = form.address.value;
  if(reg.test(str)) {
    validAddress = true;
  }
})

form.city.addEventListener("input", function () {
  let reg = /[a-zA-Z]+/;
  let str = form.city.value;
  if(reg.test(str)) {
    validCity = true;
  }
  else {
    validCity = false;
  }
})

form.email.addEventListener("input", function () {
  let reg = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
  let str = form.email.value;
  if(reg.test(str)) {
    validEmail = true;
  }
  else {
    validEmail = false;
    
  }
})
let button_order = document.getElementById("order")
button_order.addEventListener("click", (event) => {
  event.preventDefault();

  if (validAddress === true && validLastName === true && validFirstName === true && validEmail === true  && validCity === true ) {
    postForm();
  }
  if (validEmail === false ) {
    emailErrorMsg.innerHTML = `<p>Le champ email est mal renseigner</p>`;
  }
  else if (validEmail === true) {
    emailErrorMsg.innerHTML = `<p></p>`;
  }
  if (validAddress === false ) {
    addressErrorMsg.innerHTML = `<p>Le champ Address est mal renseigner</p>`;
  }
  else if (validAddress === true) {
    addressErrorMsg.innerHTML = `<p></p>`;
  }
  if (validCity === false ) {
    cityErrorMsg.innerHTML = `<p>Le champ Ville est mal renseigner</p>`;
  }
  else if (validCity === true) {
    cityErrorMsg.innerHTML = `<p></p>`;
  }
  if (validLastName === false ) {
    lastNameErrorMsg.innerHTML = `<p>Le champ Nom est mal renseigner</p>`;
  }
  else if (validLastName === true) {
    lastNameErrorMsg.innerHTML = `<p></p>`;
  }
  if (validFirstName === false ) {
    firstNameErrorMsg.innerHTML = `<p>Le champ Prénom est mal renseigner</p>`;
  }
  else if (validFirstName === true) {
    firstNameErrorMsg.innerHTML = `<p></p>`;
  }
});
/*

Fonction permetant d'envoyer la requete post d'achat du panier avec vérification de complétion des champs de texte
*/
function postForm() {
      let inputName = document.getElementById("firstName");
      let inputLastName = document.getElementById("lastName");
      let inputAdress = document.getElementById("address");
      let inputCity = document.getElementById("city");
      let inputMail = document.getElementById("email");
      let idProducts = [];
      for (let i = 0; i < produitLocalStorage.length; i++) {
        idProducts.push(produitLocalStorage[i].idProduit);
      }
      console.log(idProducts);
  
      const order = {
        contact: {
          firstName: inputName.value,
          lastName: inputLastName.value,
          address: inputAdress.value,
          city: inputCity.value,
          email: inputMail.value,
        },
        products: idProducts,
      };
  
      const options = {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
    
      fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          window.localStorage.clear();
          document.location.href = "confirmation.html?id=" + data.orderId;
        })
        .catch((err) => {
          alert("Problème avec fetch : " + err.message);
        });
    }

/*
Fonction permetant de clear le local storage (utile pour les test)
*/
function clearlocalstorage() {
  window.localStorage.clear();
  location.reload();
}

