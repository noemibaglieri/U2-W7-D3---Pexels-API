const pexelsPhotos = "https://api.pexels.com/v1/search?query=nature";

const params = new URLSearchParams(window.location.search);
const query = params.get("query");
const cardRow = document.getElementById("card-row");

const getPhotos = () => {
  fetch(pexelsPhotos, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "mu1fQUY1QZbv3NH0om2RZep9QfedSGUtA07z1DQeIkvSIjAInWwqJVZ0",
    },
  })
    .then((response) => {
      if (!response.ok) {
        if (resp.status === 404) {
          throw new Error("Risorsa non trovata");
        } else if (resp.status >= 500) {
          throw new Error("Errore lato server");
        }

        throw new Error("Errore nella fetch");
      }
      return response.json();
    })
    .then((pxlContent) => {
      const photos = pxlContent.photos;

      photos.forEach((photo) => {
        const colDiv = document.createElement("div");
        colDiv.className = "col-md-4";

        const card = document.createElement("div");
        card.className = "card mb-4 shadow-sm";

        const dynamicPhoto = document.createElement("img");
        dynamicPhoto.src = photo.src.original;
        dynamicPhoto.className = "bd-placeholder-img card-img-top";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.innerText = photo.photographer;

        const cardDescription = document.createElement("p");
        cardDescription.className = "card-text";
        cardDescription.innerText = photo.alt;

        const btnFlexDiv = document.createElement("div");
        btnFlexDiv.className = "d-flex justify-content-between align-items-center";

        const btnGroup = document.createElement("div");
        btnGroup.className = "btn-group";

        const viewBtn = document.createElement("button");
        viewBtn.type = "button";
        viewBtn.className = "btn btn-sm btn-outline-secondary";
        viewBtn.innerText = "View";

        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.className = "btn btn-sm btn-outline-secondary";
        editBtn.innerText = "Edit";

        const mutedText = document.createElement("small");
        mutedText.className = "text-muted";
        mutedText.innerText = "9 mins";

        cardRow.appendChild(colDiv);
        colDiv.appendChild(card);
        card.appendChild(dynamicPhoto);
        card.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardDescription);
        cardBody.appendChild(btnFlexDiv);
        btnFlexDiv.appendChild(btnGroup);
        btnGroup.appendChild(viewBtn);
        btnGroup.appendChild(editBtn);
        btnFlexDiv.appendChild(mutedText);
      });
    });
};

window.onload = function () {
  getPhotos();
};
