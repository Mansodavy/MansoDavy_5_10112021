let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(produitLocalStorage);
const positionEmptyCart = document.querySelector("#cart__items");
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

function form() {
  let form = document.querySelector(".cart__order__form");

  let emailRegex = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let UserRegex = new RegExp("[a-zA-Z]+");
  let AddressRegex = new RegExp("[0-9]+ ([a-zA-Z]+( [a-zA-Z]+)+)");

  form.firstName.addEventListener("change", function () {
    validFirstName(this);
  });

  form.lastName.addEventListener("change", function () {
    validLastName(this);
  });

  form.address.addEventListener("change", function () {
    validAddress(this);
  });

  form.city.addEventListener("change", function () {
    validCity(this);
  });
  form.email.addEventListener("change", function () {
    validEmail(this);
  });

  const validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (UserRegex.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = "";
    } else {
      firstNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (UserRegex.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = "";
    } else {
      lastNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (AddressRegex.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = "";
    } else {
      addressErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (UserRegex.test(inputCity.value)) {
      cityErrorMsg.innerHTML = "";
    } else {
      cityErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegex.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = "";
    } else {
      emailErrorMsg.innerHTML = "Veuillez renseigner votre email.";
    }
  };
}
form();

function postForm() {
  const button_order = document.getElementById("order");

  button_order.addEventListener("click", (event) => {
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
        localStorage.clear();
        localStorage.setItem("orderId", data.orderId);
        document.location.href = "confirmation.html?id=" + data.orderId;
      })
      .catch((err) => {
        alert("Problème avec fetch : " + err.message);
      });
  });
}
postForm();
function clearlocalstorage() {
  window.localStorage.clear();
  location.reload();
}

