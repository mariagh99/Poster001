document.addEventListener("DOMContentLoaded", function () {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const categories = {};

      data.forEach((card) => {
        if (!card.categoria) {
          return;
        }

        if (!card.imagenes) {
           return;
        }

         if (!card.titulo) { //funciona como un filtro aunque no sé si es muy efectivo, filtrar si falta la foto, título o categoría en el json
           return; 
         }

        if (!categories[card.categoria]) {
          categories[card.categoria] = [];
        }
        categories[card.categoria].push(card);
      });

      Object.keys(categories).forEach((categoryId, index) => {
        const targetPage =
          index % 2 === 0 ? "category-two.html" : "category-one.html";
        populateCategory(
          categoryId,
          categories[categoryId].slice(0, 10), //me ha dicho Lourdes que podría filtrarlo por categoría o algo así mejor que solo cortar
          targetPage,
        );
      });
    });
    //para que al pulsar enter en el chatbot se envie el mensaje
    document.getElementById("userInput").addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
          event.preventDefault();
          sendMessage();
      }
  });
  
});

function populateCategory(categoryId, cards, targetPage) {
  const category = document.createElement("section");
  category.classList.add("category-sec");

  console.log(cards[0].categoria);

  category.innerHTML = `
    <div class="title-box">
        <h2>${categoryId}</h2>
    </div>
`;

  document.body.appendChild(category);

  const cardsContainer = document.createElement("div");
  cardsContainer.classList.add("cards");

  cards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    const imageURL = card.imagenes
      ? getFirstImageURL(card.imagenes)
      : "img/poster.png";
    cardElement.innerHTML = `
                <div class="card__img">
                <img src="${imageURL}" alt="${card.desc_img1}" width="200">
                </div>
                <div class="card__title">
                    <p>${card.titulo}</p>
                </div>
        `;

    cardElement.addEventListener("click", function () {
      window.location.href = `${targetPage}?id=${card.Id}`;
    });

    cardsContainer.appendChild(cardElement);
  });

  category.appendChild(cardsContainer);
}

function getFirstImageURL(images) {
  const imageArray = images.split(", ");
  return imageArray[0];
}

document.querySelector(".hamburger-btn").addEventListener("click", function () {
  document.querySelector(".nav-items").classList.toggle("active");
});

var isFirstTime = true;

function toggleProfile() {
  var profile = document.getElementById("profile");

  if (profile.style.display === "none") {
    profile.style.display = "block";
  } else {
    profile.style.display = "none";
  }
}

function sendMessage() {
    var userInput = document.getElementById("userInput").value.toLowerCase();
    var messagesContainer = document.getElementById("messages");
    var chatWindow = document.getElementById("chatWindow");

    if (userInput.trim() !== "") {
        messagesContainer.innerHTML += "<div style='text-align: right;'>Usuario: " + userInput + "</div>";

        // Verificar si el usuario dijo "adiós"
        if (userInput.includes("adiós") || userInput.includes("adios")) { //por si lo ponen sin tilde
            messagesContainer.innerHTML += "<div>Bot: ¡Hasta luego! Mi creadora te manda recuerdos desde Dinamarca.</div>";

            setTimeout(function() {
                chatWindow.style.display = "none";
            }, 1000);

            document.getElementById("userInput").value = "";
            return; // para salir de la función
        }

        // respuestas a preguntas específicas
        var botResponse = "";
        if (userInput.includes("cuál es tu comida favorita")) {
            botResponse = "Me encanta la pizza con piña, aunque sé que es un tema controvertido.";
        } else if (userInput.includes("crees que las personas son buenas por naturaleza")) {
            botResponse = "Creo que sí, pero también pienso que el entorno influye mucho en nuestras acciones.";
        } else if (userInput.includes("qué signo del zodiaco eres")) {
            botResponse = "Soy un bot, así que no tengo signo zodiacal, pero podría ser Acuario, innovador y tecnológico.";
        } else {
            botResponse = "Ahora mismo no te sé decir. \nPuedes hacerme estas preguntas:\n\n ¿cuál es tu comida favorita? \n¿crees que las personas son buenas por naturaleza? \n¿qué signo del zodiaco eres? \n\nDi adiós en cualquier momento si quieres salir del chat";
        }

        messagesContainer.innerHTML += "<div>Bot: " + botResponse + "</div>";
        document.getElementById("userInput").value = "";
    }
}
function toggleChat() {
  var chatWindow = document.getElementById("chatWindow");
  var messagesContainer = document.getElementById("messages");

  if (chatWindow.style.display === "none" || chatWindow.style.display === "") {
      chatWindow.style.display = "block";

      if (isFirstTime) {
          messagesContainer.innerHTML += "<div>Hola Lourdes! Soy tu chat de la ESD, hazme alguna pregunta</div>";
          isFirstTime = false;
      }
  } else {
      chatWindow.style.display = "none";
  }
}
