// PARTE 1
// 1. Capturar evento click para el botón "Empezar juego nuevo"
// 2. Hacemos una petición GET al endpoint https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1 utilizando el método fetch de javascript
// 3. Hacer visibles los botones ocultos y mostrar los datos ID Deck y Remaining Cards

// PARTE 2
// 1. Capturar evento click para el botón "Otra carta"
// 2. Hacemos una petición GET al endpoint https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=1 utilizando el método fetch de javascript
// 3. Mostrar la carta

// Estado de la aplicación 
let idDeck; //Declaramos la variable idDeck sin asignar, para luego asociarle el id correspondiente

let buttonStart = document.querySelector("#start");
let buttonDraw = document.querySelector("#draw");
let buttonStop = document.querySelector("#stop");

let idDeckp = document.querySelector("#deck_id");
let remainingCardsp = document.querySelector("#remaining_cards");
let sectionCards = document.querySelector("#cards"); //recuperamos el contenedor donde irán las cards

buttonStart.addEventListener("click", getDeck) //Si pusiéramos paréntesis no estaríamos pasándole como segundo parámentro una función, lo que haría sería invocar la función y devolvernos el valor que en este caso sería undefined

//Las funciones se pueden definir en cualquier parte del documento (recomendable al principio o final) porque javascript lee primero el documento entero y luego ejecuta el código
async function getDeck(){ //el fetch es asíncrono
    const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    const datos = await response.json(); //Esto parsea la respuesta del tipo buffer a un json (Si lo q transporta es un json)
    console.log(datos);
    buttonDraw.classList.remove("d-none");
    buttonStop.classList.remove("d-none");
    idDeckp.textContent = datos.deck_id;
    remainingCardsp.textContent = datos.remaining;
    idDeck = datos.deck_id;
}

buttonDraw.addEventListener("click", getCard);

async function getCard(){
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${idDeck}/draw/?count=1`);
    const datos = await response.json();
    console.log("Datos de la carta", datos);
    const cardUrl = datos.cards[0].image;
    const remainingCards = datos.remaining;
    remainingCardsp.textContent = remainingCards;

    // 1. Crear un elemento html del tipo img
    // 2. Actualizar la propiedad src con la url de la imagen
    // 3. Añadir este objeto al padre con appendChild
    let newCardImg = document.createElement("img");
    newCardImg.src = cardUrl;
    sectionCards.appendChild(newCardImg);
  

}