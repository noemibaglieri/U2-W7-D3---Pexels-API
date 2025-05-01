const pexelsPhotos = "https://api.pexels.com/v1/search?query=";

const cardRow = document.getElementById("card-row");

const loadImagesBtn = document.getElementById("load-images-btn");
const loadSecondaryBtn = document.getElementById("load-secondary-btn");
const input = document.getElementById("search-input");

const getPhotos = (searchParam) => {
  fetch(pexelsPhotos + searchParam, {
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

      cardRow.innerHTML = "";

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

        const photographerDetails = document.createElement("a");
        photographerDetails.href = "./details.html?photoId=" + photo.id;
        photographerDetails.innerText = photo.photographer;

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

        const hideBtn = document.createElement("button");
        hideBtn.type = "button";
        hideBtn.className = "btn btn-sm btn-outline-secondary";
        hideBtn.innerText = "Hide";

        const mutedText = document.createElement("small");
        mutedText.className = "text-muted";
        mutedText.innerText = photo.id;

        cardRow.appendChild(colDiv);
        colDiv.appendChild(card);
        card.appendChild(dynamicPhoto);
        card.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        cardTitle.appendChild(photographerDetails);
        cardBody.appendChild(cardDescription);
        cardBody.appendChild(btnFlexDiv);
        btnFlexDiv.appendChild(btnGroup);
        btnGroup.appendChild(viewBtn);
        btnGroup.appendChild(hideBtn);
        btnFlexDiv.appendChild(mutedText);

        hideBtn.onclick = function (e) {
          e.target.closest(".col-md-4").remove();
        };
      });
    });
};

loadImagesBtn.onclick = function () {
  getPhotos("kittens");
};

loadSecondaryBtn.onclick = function () {
  getPhotos("pugs");
};

input.onchange = function () {
  getPhotos(input.value);
};

window.onload = function () {
  getPhotos();
};
