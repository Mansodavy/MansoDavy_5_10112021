/*
Récupération de l'id dans l'url
*/
let str = window.location.href;
let url = new URL(str);
let urlSearchParmId = url.searchParams.get("id");
/*
Fonction mettant le numéro de commande grace a l'id,
Récupéré précédemment sur la page dans la partie prévue pour avec une innerHTML
*/
function confirmation(){
    let orderId = document.querySelector(".confirmation");
    orderId.innerHTML = `<p>Commande validée ! <br>Votre numéro de commande est : <span id="orderId">${urlSearchParmId}</span></p>`;
    if (urlSearchParmId === null ){
        window.location.href ="index.html";
        window.alert("Erreur ! Impossible d'acceder a cette page sans passer par le panier");
    }
}
confirmation();

