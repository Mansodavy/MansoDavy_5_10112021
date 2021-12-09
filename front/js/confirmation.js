let str = window.location.href;
let url = new URL(str);
let urlsearchparmid = url.searchParams.get("id");

function confirmation(){
    let orderid = document.querySelector(".confirmation");
    orderid.innerHTML = `<p>Commande validée ! <br>Votre numéro de commande est : <span id="orderId">${urlsearchparmid}</span></p>`;
}
confirmation();