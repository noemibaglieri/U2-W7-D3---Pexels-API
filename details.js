const params = new URLSearchParams(window.location.search);
const photoId = params.get("photoId");
const photoDetail = "https://api.pexels.com/v1/photos/";

fetch(photoDetail + photoId, {
  headers: {
    "Content-Type": "application/json",
    Authorization: "mu1fQUY1QZbv3NH0om2RZep9QfedSGUtA07z1DQeIkvSIjAInWwqJVZ0",
  },
})
  .then((resp) => resp.json())
  .then((picture) => {
    document.body.style.backgroundColor = picture.avg_color;

    const container = document.getElementById("pexels-content");
    const h1 = document.createElement("h1");
    h1.innerText = picture.photographer;

    const img = document.createElement("img");
    img.src = picture.src.original;
    img.style.width = "600px";
    img.style.maxWidth = "100%";

    const photographerDetails = document.createElement("a");
    photographerDetails.href = picture.photographer_url;
    photographerDetails.innerText = "More about this photographer";

    container.appendChild(h1);
    container.appendChild(img);
    container.appendChild(photographerDetails);
  });
