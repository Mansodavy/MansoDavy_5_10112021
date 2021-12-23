/*
Récupération de l'id dans l'url
*/
let str = window.location.href;
let url = new URL(str);
let urlsearchparmid = url.searchParams.get("id");
/*
Fonction mettant le numéro de commande grace a l'id récupéré précédemment 
*/
function confirmation(){
    let orderid = document.querySelector(".confirmation");
    orderid.innerHTML = `<p>Commande validée ! <br>Votre numéro de commande est : <span id="orderId">${urlsearchparmid}</span></p>`;
    if (urlsearchparmid === null ){
        window.location.href ="index.html";
        window.alert("Erreur ! Impossible d'acceder a cette page sans passer par le panier");
    }
}
confirmation();

