document.addEventListener("DOMContentLoaded", function () {
  const categoryId = window.location.href.split("?id=")[1];
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const dynamicContent = document.getElementById("dynamic-content");
      const selectedCard = data.find(
        (card) => card.Id.toString() == categoryId,
      );
      dynamicContent.innerHTML = `
      <section class="project-gallery"  style="margin-top: 96px">
      <div>
        <img src="${getFirstImageURL(selectedCard.imagenes, 0)}" alt="${
        selectedCard.desc_img1
      }" />
      </div>
      <div>
        <img src="${getFirstImageURL(selectedCard.imagenes, 1)}" alt="${
        selectedCard.desc_img2
      }" />
      </div>
    </section>

    <section class="project-details">
      <div class="project-details__info">
        <h1>${selectedCard.titulo}</h1>
        <p>${selectedCard.subtitulo}</p>
        <ul>
          <li><p>Docente: ${selectedCard.nombre_docente}</p></li>
          <li><p>Creado en: ${selectedCard.marca_temporal}</p></li>
          <li><p>Asignatura: ${selectedCard.asignatura}</p></li>
          <li><p>Especialidad: ${selectedCard.especialidad}</p></li>
        </ul>
      </div>
      <div class="project-details__owner">
        <p>${selectedCard.nombre_estudiante}</p>
        <a href="mailto:${selectedCard.correo_estudiante}">${
        selectedCard.correo_estudiante
      }</a>
      </div>
    </section>

    <section class="project-desc">
      <p>
        ${selectedCard.descripcion}
      </p>
    </section>
              `;
    });
});

function getFirstImageURL(images, index) {
  const imageArray = images.split(", ");
  return imageArray[index];
}
